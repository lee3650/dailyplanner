import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";

const weekdayData = [
    new EventData("breakfast", new Time(7, 30), new Time(8,0)), 
    new EventData("work", new Time(8, 30), new Time(17,0)), 
    new EventData("workout", new Time(17,30), new Time(18,45)), 
    new EventData("snack / shower", new Time(18,45), new Time(19,15)), 
    new EventData("gamedev / project", new Time(19,15), new Time(20,15)), 
    new EventData("dinner", new Time(20,15), new Time(21,0)), 
];

const tmpData = [
    new Template(weekdayData, 'weekday', 0), 
    new Template([], 'saturday', 1), 
    new Template([], 'sunday', 2), 
    new Template([], 'holiday', 3), 
]; 

const TODAY_ID = -2; 
const BLANK_ID = -1; 

const blankTemplate = new Template([], 'blank', BLANK_ID); 
const todayTemplate = new Template([], 'today', TODAY_ID); 

export function MainPage() {
    /*
    Todo: 

    No more modes / separation between today and template. 
    Only store template_id as state. Fetch and set entire contents of data
    On each update. 

    */

    const [ todayMode, setTodayMode ] = useState(true); 
    const [data, setData] = useState<EventData[]>([]);
    const [today, setToday] = useState(todayTemplate)
    const [template, setTemplate] = useState(blankTemplate);  
    const [templates, setTemplates] = useState(tmpData); 

    // this is add an event to either the 'today' view or the current template 
    const addData = (val : EventData) : void => {
        setData([...data, val]);
        template.data = data; 
    }

    const addTemplate = (val : Template) => {
        setTemplates([...templates, val]); 
        setData(val.data); 
        setTemplate(val); 
        setTodayMode(false); 
    }

    const updateData = (index : number, val : EventData) : void => {
        const newar = data.slice();
        newar[index] = val;
        setData(newar); 
        template.data = data; 
    }

    const loadIntoToday = (template : Template) => {
        setData(template.data); 
        setTemplate(template);
        setToday(new Template(template.data, 'today', TODAY_ID)); 
        setTodayMode(true); 
    }

    const deleteData = (index : number) : void => {
        const newar = data.slice();
        newar.splice(index, 1);
        setData(newar);
    }

    const editTemplate = (index : number) => {
        const next = templates[index]; 

        setTemplate(next); 
        setTodayMode(false); 
        setData(next.data); 
    }

    const viewToday = () => {
        loadIntoToday(today); 
    }

    const deleteTemplate = (index : number) => {

    }

  return (
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(templates, loadIntoToday, addTemplate, deleteTemplate, editTemplate, viewToday)}/>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <WorkingArea data={data} addData={addData} updateData={updateData} deleteData={deleteData} templateName={template.name} todayMode={todayMode}>
                </WorkingArea>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <EventDisplay {...new EventDisplayProps(data)}></EventDisplay>
            </div>
        </div>
    )
}
