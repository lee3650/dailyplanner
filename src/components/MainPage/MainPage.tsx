import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";
import { LoginPanel, LoginPanelProps } from "../LoginPanel/LoginPanel";
import { TODAY_ID, BLANK_ID, GUEST_ID, UNINIT_ID } from "../constants";
import { serverAddTemplate, serverAddEventData, serverDeleteTemplate, serverUpdateEventData, loadTemplates, writeTemplate, fetchTemplate, parseTemplates } from "../api";
import { Account } from "../../model/Account";

const blankTemplate = new Template([], 'blank', BLANK_ID); 

export function MainPage() {

    const [userId, setUserId] = useState(UNINIT_ID); 
    const [userPassword, setUserPassword] = useState(''); 
    const [userEmail, setUserEmail] = useState(''); 
    const [todayMode, setTodayMode] = useState(true); 
    const [template, setTemplate] = useState(blankTemplate);  
    // todo - this needs to sync w/ the server 
    const [templates, setTemplates] = useState([] as Template[]); 
    const [todayTemplate, setTodayTemplate] = useState(new Template([], 'today', TODAY_ID))

    const addData = (val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        // const next = new Template([...template.data, val], template.name, template.id); 
        serverAddEventData(new Account(userId, userPassword), template.id, val)
        .then(result => setTemplate(result)); 
    }

    const addTemplate = (name : string) => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        // const next = [...templates, val]; 
        console.log(`adding template with name ${name}!`)
        serverAddTemplate(new Account(userId, userPassword), name)
        .then(result => {
            setTemplate(result); 
            setTodayMode(false);
            loadTemplates(new Account(userId, userPassword))
            .then(val => setTemplates(val)); 
        })
    }

    const duplicateTemplate = (index : number) =>
    {
        // TODO // 
        /*
        const next = templates[index].duplicate(getNextId()); 
        addTemplate(next); 
        */
    }

    const updateData = (index : number, val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        serverUpdateEventData(new Account(userId, userPassword), template.id, val)
        .then(next => setTemplate(next)); 
    }

    // TODO - I think we need to write the current today... to the server? 
    const loadIntoToday = (template : Template) => {
        fetchTemplate(new Account(userId, userPassword), template.id)
        .then(value => {
            const newToday = new Template(value.data, 'today', TODAY_ID); 
            writeTemplate(new Account(userId, userPassword), newToday); 
            setTemplate(newToday);
            setTodayMode(true); 
        })
        .catch(reason => {
            throw new Error("Failed to load into today template with id " + template.id); 
        })
    }

    const deleteData = (index : number) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        const newar = template.data.slice();
        newar.splice(index, 1);
        const next = new Template(newar, template.name, template.id); 
        setTemplate(next); 
        writeTemplate(new Account(userId, userPassword), next); 
    }

    const editTemplate = (index : number) => {
        fetchTemplate(new Account(userId, userPassword), templates[index].id)
        .then(template => {
            setTemplate(template); 
            setTodayMode(false); 
        })
    }

    const viewToday = () => {
        fetchTemplate(new Account(userId, userPassword), TODAY_ID)
        .then(template => loadIntoToday(template))
    }

    const deleteTemplate = (id : number) => {
        console.log(`deleting index with id ${id}!`)
        serverDeleteTemplate(new Account(userId, userPassword), id)
        .then(result => setTemplates(result)); 
        // .then(() => viewToday()) 
    }

    const renameTemplate = (index : number, newName : string) => {
        const id = templates[index].id; 
        const next = new Template(templates[index].data, newName, id); 
        writeTemplate(new Account(userId, userPassword), next);  
        templates[index] = next;
        setTemplates(templates.slice())
        if (template.id == id)
        {
            setTemplate(next); 
        }
    }

    function onLogin(userId : number, email : string, password : string, templates : any, todayTemplate : Template) 
    {
        console.log(`received templates, logging in: ${JSON.stringify(templates)}`)
        setUserId(userId); 
        setUserEmail(email); 
        setUserPassword(password); 
        const parsedTemplates = parseTemplates(templates); 
        setTemplates(parsedTemplates); 
        setTodayTemplate(todayTemplate) 
    }

  return (
    <div>
        {userId == UNINIT_ID ? (<LoginPanel {...new LoginPanelProps(onLogin)}/>) : (<></>) }
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(templates, loadIntoToday, addTemplate, deleteTemplate, editTemplate, viewToday,
                    todayTemplate.data.length == 0, duplicateTemplate, renameTemplate)} />
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <WorkingArea data={template.data} addData={addData} updateData={updateData} deleteData={deleteData} templateName={template.name} todayMode={todayMode}>
                </WorkingArea>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <EventDisplay {...new EventDisplayProps(template.data)}></EventDisplay>
            </div>
        </div>
    </div>
    )
}
