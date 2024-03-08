import { EventData } from "../../model/EventData";
import { Template } from "../../model/Template";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';
import { useState } from "react";
import { TemplatePanel, TemplatePanelProps } from "../TemplatePanel/TemplatePanel";

const test_data = [
    new EventData("wraparound event", new Time(11, 10), new Time(12, 30)), 
    new EventData("overlap event", new Time(11, 25), new Time(12, 50)), 
    new EventData("another overlap", new Time(12, 25), new Time(13, 0)), 
    new EventData("test event 2", new Time(13, 30), new Time(14, 0)), 
    new EventData("test event 3", new Time(15, 20), new Time(15, 40)), 
    new EventData("test event", new Time(13, 10), new Time(13, 30)), 
    new EventData("midnight event", new Time(0, 10), new Time(1, 30)), 
]; 

const weekdayData = [
    new EventData("breakfast", new Time(7, 30), new Time(8,0)), 
    new EventData("work", new Time(8, 30), new Time(17,0)), 
    new EventData("workout", new Time(17,30), new Time(18,45)), 
    new EventData("snack / shower", new Time(18,45), new Time(19,15)), 
    new EventData("gamedev / project", new Time(19,15), new Time(20,15)), 
    new EventData("dinner", new Time(20,15), new Time(21,0)), 
];

const tmpData = [
    new Template(weekdayData, 'weekday'), 
    new Template([], 'saturday'), 
    new Template([], 'sunday'), 
    new Template([], 'holiday'), 
]; 

const blankTemplate = new Template([], 'blank'); 

export function MainPage() {

    const [data, setData] = useState(test_data);
    const [template, setTemplate] = useState(blankTemplate);  

    const addData = (val : EventData) : void => {
        setData([...data, val]);
    }

    const updateData = (index : number, val : EventData) : void => {
        const newar = data.slice();
        newar[index] = val;
        setData(newar); 
    }

    const loadIntoToday = (template : Template) => {
        setData(template.data); 
        setTemplate(template);
    }

    const deleteData = (index : number) : void => {
        const newar = data.slice();
        newar.splice(index, 1);
        setData(newar);
    }

  return (
        <div className={css.container}>
            <div className={css.narrow_menu}>
                <TemplatePanel {...new TemplatePanelProps(tmpData, loadIntoToday)}/>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <WorkingArea data={data} addData={addData} updateData={updateData} deleteData={deleteData} templateName={template.name}>
                </WorkingArea>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <EventDisplay {...new EventDisplayProps(data)}></EventDisplay>
            </div>
        </div>
    )
}
