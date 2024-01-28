import wa from './WorkingArea.module.css'
import EventListing from './EventListing/EventListing';
import { EventListingProps } from './EventListing/EventListing';
import {EventData, Time, ParsedEventData } from '../model/EventData';
import React, { useState } from 'react';
import { ParseEvent } from '../model/Parser';
import NewEventButton, {NewEventButtonProps} from './NewEventButton/NewEventButton';

export class WorkingAreaProp {
    constructor(public data : EventData[]){

    }
}

const WorkingArea : React.FC<WorkingAreaProp> = ({ data }) => {
    const sorted = data.sort((a, b) => (60 * (a.start.hours - b.start.hours)) + (a.start.minutes - b.start.minutes))    

    const [editIndex, setEditIndex] = useState(-1); 
    const [addingNew, setAddingNew] = useState(false); 

    const OnEdit = (val : string, index : number) => {
        console.log(`editing val ${val} with index ${index}`)

        // so, I guess *if* the data is valid, then we write it to the array, otherwise 
        // we don't do that. Okay... let's just say, um, we always write it for now 
        data[index].title = val; 
    }

    const OnFinishEdit = (index : number) => {
        console.log('finished edit!')
        setEditIndex(-1) // hm, which one gets called first? 
    }

    const OnSubmitNewEvent = (val : string) => {
        setAddingNew(false); 
        // so, we can try this but it's not very react-ive 
        const parsed = ParseEvent(val); 
        if (parsed.success)
        {
            data.push(new EventData(parsed.data.title, parsed.data.start, parsed.data.end)); 
        }
    }

    const OnChangeNewEvent = (valid : boolean) => {
        // todo - enable / disable the buttons! 
        // honestly, we could have a single 'handle event input' component that does this for both 
    }

    const OnCancelNewEvent = () => {
        setAddingNew(false); 
    }

    const OnClickNewEvent = () => {
        setAddingNew(true); 
    }

    return (<div className={wa.container}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>2024/1/10</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>5 events</h3>
            <div className={wa.verticalPadding}></div>
            <div className={wa.eventContainer}>
                {sorted.map((val, index) => (<EventListing key={index} {...new EventListingProps(val, OnEdit, index, editIndex == index, setEditIndex, OnFinishEdit) }/>))}
                <NewEventButton {...new NewEventButtonProps(addingNew, OnSubmitNewEvent, OnCancelNewEvent, OnClickNewEvent, OnChangeNewEvent)}></NewEventButton>
            </div>
        </div>
    </div>);
}

export default WorkingArea 
