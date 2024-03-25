import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";
import { LoginPanel } from "../LoginPanel/LoginPanel";

const weekdayData = [
    new EventData("breakfast", new Time(7, 30), new Time(8,0)), 
    new EventData("work", new Time(8, 30), new Time(17,0)), 
    new EventData("workout", new Time(17,30), new Time(18,45)), 
    new EventData("snack / shower", new Time(18,45), new Time(19,15)), 
    new EventData("gamedev / project", new Time(19,15), new Time(20,15)), 
    new EventData("dinner", new Time(20,15), new Time(21,0)), 
];

const TODAY_ID = -2; 
const BLANK_ID = -1; 

let tmpData : Record<number, Template> = {
    0: new Template(weekdayData, 'weekday', 0), 
    1: new Template([], 'saturday', 1), 
    2: new Template([], 'sunday', 2), 
    3: new Template([], 'holiday', 3), 
}; 

function loadTemplates() : Template[] {
    return Object.values(tmpData); 
}

function writeTemplates(templates : Template[]) {
    const dict : Record<number, Template> = {}
    templates.forEach(v => dict[v.id] = v); 
    tmpData = dict;     
}

let todayTemplate = new Template([], 'today', TODAY_ID); 
const blankTemplate = new Template([], 'blank', BLANK_ID); 

function fetchTemplate(template_id : number) : [boolean, Template] {
    if (template_id == TODAY_ID)    
    {
        return [true, todayTemplate]
    }

    if (tmpData.hasOwnProperty(template_id))
    {
        return [true, tmpData[template_id]]; 
    }

    return [false, new Template([], '', -1000)]; 
}

function writeTemplate(template : Template) {
    if (template.id == TODAY_ID) 
    {
        todayTemplate = template; 
    }
    else 
    {
        tmpData[template.id] = template; 
    }
}


export function MainPage() {
    /*
    Todo: 

    No more modes / separation between today and template. 
    Only store template_id as state. Fetch and set entire contents of data
    On each update. 

    */

    const [todayMode, setTodayMode] = useState(true); 
    const [template, setTemplate] = useState(blankTemplate);  
    // todo - this needs to sync w/ the server 
    const [templates, setTemplates] = useState(loadTemplates()); 

    const addData = (val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        const next = new Template([...template.data, val], template.name, template.id); 
        setTemplate(next); 
        writeTemplate(next);
    }

    const addTemplate = (val : Template) => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        const next = [...templates, val]; 
        setTemplates(next); 
        setTemplate(val); 
        setTodayMode(false);
        writeTemplates(next);
    }

    const duplicateTemplate = (index : number) =>
    {
        const next = templates[index].duplicate(getNextId()); 
        addTemplate(next); 
    }

    const updateData = (index : number, val : EventData) : void => {
        // *technically* we should perform a fetch here to make sure that it hasn't updated while the page is open 
        const newar = template.data.slice();
        newar[index] = val;
        const next = new Template(newar, template.name, template.id);
        setTemplate(next);
        writeTemplate(next); 
    }

    // TODO - I think we need to write the current today... to the server? 
    const loadIntoToday = (template : Template) => {
        const next : [boolean, Template] = fetchTemplate(template.id); 
        if (next[0]) 
        {
            const nexttmp = next[1]; 
            const newToday = new Template(nexttmp.data, 'today', TODAY_ID); 
            writeTemplate(newToday); 
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
        writeTemplate(next);  
    }

    const editTemplate = (index : number) => {
        const next = fetchTemplate(templates[index].id); 
        if (next[0])
        {
            setTemplate(next[1]); 
            setTodayMode(false); 
        }
    }

    const magicLoadToday = () => {
        // todo - not really sure how this will work 
        return fetchTemplate(TODAY_ID)[1]; 
    }

    const viewToday = () => {
        loadIntoToday(magicLoadToday()); 
    }

    const deleteTemplate = (index : number) => {
        const newTemplates = templates.slice() 
        newTemplates.splice(index, 1); 
        setTemplates(newTemplates); 
        writeTemplates(newTemplates); 
        viewToday(); 
    }

    const renameTemplate = (index : number, newName : string) => {
        const id = templates[index].id; 
        const next = new Template(templates[index].data, newName, id); 
        writeTemplate(next);  
        setTemplates(loadTemplates()); 
        if (template.id == id)
        {
            setTemplate(next); 
        }
    }

    function getNextId() {
        // TODO lol - get this from the server probably
        return templates.reduce((acc, current) => acc.id > current.id ? acc : current, new Template([], 'blank', 0)).id + 1; 
    }

  return (
    <div>
        <LoginPanel/>
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(templates, loadIntoToday, addTemplate, deleteTemplate, editTemplate, viewToday,
                    magicLoadToday().data.length == 0, duplicateTemplate, getNextId, renameTemplate)} />
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
