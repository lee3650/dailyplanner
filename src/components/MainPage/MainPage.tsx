import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";
import { LoginPanel, LoginPanelProps } from "../LoginPanel/LoginPanel";
import { TODAY_ID, UNINIT_ID } from "../constants";
import { serverAddTemplate, serverAddEventData, serverDeleteTemplate, serverUpdateEventData, loadTemplates, fetchTemplate, parseTemplates, serverLoadIntoToday, serverRenameTemplate, serverDeleteEvent, serverDuplicateTemplate } from "../api";
import { Account } from "../../model/Account";

const blankTemplate = new Template([], 'blank', -10); 

export function MainPage() {

    const [userId, setUserId] = useState(UNINIT_ID); 
    const [userPassword, setUserPassword] = useState(''); 
    /* @ts-ignore */
    const [userEmail, setUserEmail] = useState(''); 
    const [todayMode, setTodayMode] = useState(true); 
    const [template, setTemplate] = useState(blankTemplate);  
    // todo - this needs to sync w/ the server 
    const [templates, setTemplates] = useState([] as Template[]); 
    const [todayCount, setTodayCount] = useState(0); 

    const addData = (val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        // const next = new Template([...template.data, val], template.name, template.id); 
        serverAddEventData(new Account(userId, userPassword), template.id, val)
        .then(result => {
            setTemplate(result)
            if (todayMode) {
                setTodayCount(result.data.length)
            }
        })
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
       const toDuplicate = templates[index].id; 
       serverDuplicateTemplate(new Account(userId, userPassword), toDuplicate)
       .then(response => setTemplates(response));
    }

    const updateData = (index : number, val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        val.id = template.data[index].id; 
        serverUpdateEventData(new Account(userId, userPassword), template.id, val)
        .then(next => setTemplate(next)); 
    }

    const loadIntoToday = (template : Template) => {
        serverLoadIntoToday(new Account(userId, userPassword), template.id)
        .then(value => {
            const newToday = new Template(value.data, 'today', TODAY_ID); 
            setTemplate(newToday);
            setTodayCount(newToday.data.length)
            setTodayMode(true); 
        })
        .catch(reason => {
            throw new Error(`Failed to load template into today id=${template.id}, reason=${JSON.stringify(reason)}`); 
        })
    }

    const deleteData = (index : number) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        const id = template.data[index].id; 
        serverDeleteEvent(new Account(userId, userPassword), id)
        .then(result => {
            if (result.id !== template.id && template.id !== TODAY_ID)
            {
                throw new Error("Modified the wrong template when deleting event!"); 
            }
            setTemplate(result);
            if (todayMode || id == TODAY_ID)
            {
                setTodayCount(result.data.length); 
            }
        }); 
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
        .then(result => setTemplates(result))
        .then(() => viewToday()); 
    }

    const renameTemplate = (index : number, newName : string) => {
        const id = templates[index].id; 
        serverRenameTemplate(new Account(userId, userPassword), id, newName)
            .then(result => {
                templates[index] = result;
                setTemplates(templates.slice())
                if (template.id == id) {
                    setTemplate(result);
                }
            }
        );
    }

    function onLogin(userId: number, email: string, password: string, templates: any, todayTemplate: Template) 
    {
        console.log(`received templates, logging in: ${JSON.stringify(templates)}`)
        setUserId(userId); 
        setUserEmail(email); 
        setUserPassword(password); 
        const parsedTemplates = parseTemplates(templates); 
        setTemplates(parsedTemplates); 
        setTodayCount(todayTemplate.data.length); 
        setTemplate(todayTemplate); 
        setTodayMode(true); 
    }

  return (
    <div>
        {userId == UNINIT_ID ? (<LoginPanel {...new LoginPanelProps(onLogin)}/>) : (<></>) }
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(templates, loadIntoToday, addTemplate, deleteTemplate, editTemplate, viewToday,
                    todayCount == 0, duplicateTemplate, renameTemplate)} />
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
