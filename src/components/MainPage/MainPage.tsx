import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";
import { LoginPanel, LoginPanelProps } from "../LoginPanel/LoginPanel";
import { TODAY_ID, BLANK_ID, GUEST_ID } from "../constants";
import { serverAddTemplate, serverAddEventData, serverDeleteTemplate, serverUpdateEventData, loadTemplates, writeTemplate, fetchTemplate, parseTemplates } from "../api";
import { Account } from "../../model/Account";

const blankTemplate = new Template([], 'blank', BLANK_ID); 

export function MainPage() {

    const [userId, setUserId] = useState(GUEST_ID); 
    const [userPassword, setUserPassword] = useState(''); 
    const [userEmail, setUserEmail] = useState(''); 
    const [todayMode, setTodayMode] = useState(true); 
    const [template, setTemplate] = useState(blankTemplate);  
    // todo - this needs to sync w/ the server 
    const [templates, setTemplates] = useState([] as Template[]); 

    const addData = (val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        // const next = new Template([...template.data, val], template.name, template.id); 
        const next = serverAddEventData(new Account(userId, userPassword), template.id, val)
        setTemplate(next); 
    }

    const addTemplate = (name : string) => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        // const next = [...templates, val]; 
        const val = serverAddTemplate(new Account(userId, userPassword), name, [])
        setTemplate(val); 
        setTodayMode(false);
        setTemplates(loadTemplates(new Account(userId, userPassword)));
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
        const next = serverUpdateEventData(new Account(userId, userPassword), template.id, val)
        setTemplate(next);
    }

    // TODO - I think we need to write the current today... to the server? 
    const loadIntoToday = (template : Template) => {
        const next : [boolean, Template] = fetchTemplate(new Account(userId, userPassword), template.id); 
        if (next[0]) 
        {
            const nexttmp = next[1]; 
            const newToday = new Template(nexttmp.data, 'today', TODAY_ID); 
            writeTemplate(new Account(userId, userPassword), newToday); 
            setTemplate(newToday);
            setTodayMode(true); 
        }
        else {
            throw new Error("Failed to load into today template with id " + template.id); 
        }
        // todo - error handling? 
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
        const next = fetchTemplate(new Account(userId, userPassword), templates[index].id); 
        if (next[0])
        {
            setTemplate(next[1]); 
            setTodayMode(false); 
        }
    }

    const magicLoadToday = () => {
        // todo - not really sure how this will work 
        return fetchTemplate(new Account(userId, userPassword), TODAY_ID)[1]; 
    }

    const viewToday = () => {
        loadIntoToday(magicLoadToday()); 
    }

    const deleteTemplate = (id : number) => {
        setTemplates(serverDeleteTemplate(new Account(userId, userPassword), id)); 
        viewToday(); 
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

    function onLogin(userId : number, email : string, password : string, templates : any) 
    {
        console.log(`received templates, logging in: ${JSON.stringify(templates)}`)
        setUserId(userId); 
        setUserEmail(email); 
        setUserPassword(password); 
        const parsedTemplates = parseTemplates(templates); 
        setTemplates(parsedTemplates); 
    }

  return (
    <div>
        {userId != -100 ? (<></>) : (<LoginPanel {...new LoginPanelProps(onLogin)}/>)}
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(templates, loadIntoToday, addTemplate, deleteTemplate, editTemplate, viewToday,
                    magicLoadToday().data.length == 0, duplicateTemplate, renameTemplate)} />
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
