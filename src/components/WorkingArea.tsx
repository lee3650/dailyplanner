import wa from './WorkingArea.module.css'
import EventListing from './EventListing/EventListing';
import { EventListingProps } from './EventListing/EventListing';
import {EventData, Time, ParsedEventData } from '../model/EventData';
import React, { useState } from 'react';
import { ParseEvent } from '../model/Parser';
import NewEventButton, {NewEventButtonProps} from './NewEventButton/NewEventButton';

export class WorkingAreaProp {
    constructor(public data : EventData[], public addData : (val : EventData) => void, public updateData : (index : number, val : EventData) => void, public deleteData : (index : number) => void){

    }
}

const WorkingArea : React.FC<WorkingAreaProp> = ({ data, addData, updateData, deleteData }) => {
    const sorted = data.sort((a, b) => (60 * (a.start.hours - b.start.hours)) + (a.start.minutes - b.start.minutes))    

    const [editIndex, setEditIndex] = useState(-1); 
    const [addingNew, setAddingNew] = useState(false); 

    const OnFinishEdit = (val : string, index : number) => {
        // probably want to call set data here? 
        updateData(index, ParseEvent(val).data);
        console.log('finished edit!')
        setEditIndex(-1) // hm, which one gets called first? 
    }

    const OnSubmitNewEvent = (val : string) => {
        console.log(`adding new event: ${val}`)
        setAddingNew(false); 

        const parsed = ParseEvent(val); 
        if (parsed.success)
        {
            addData(new EventData(parsed.data.title, parsed.data.start, parsed.data.end));
        }
    }

    const OnCancelNewEvent = () => {
        setAddingNew(false); 
    }

    const OnClickNewEvent = () => {
        setEditIndex(-1); 
        setAddingNew(true); 
    }

    const OnStartEdit = (val : number) => {
        setEditIndex(val); 
        setAddingNew(false); 
    }

    // TODO - this doesn't really work, it doesn't have focus at the right time 
    /*@ts-ignore*/
    const onKeyDown = e => {
        // console.log(`got key event: ${e.key}`); 
        if (e.key === 'a')
        {
            if (!addingNew && editIndex === -1)
            {
                setAddingNew(true); 
            }
        }
    }

    const getCurDateString = () => {
        const today = new Date(); 
        return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    }

    return (<div className={wa.container} 
            tabIndex={-1}
            onKeyDown={onKeyDown}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>{getCurDateString()}</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>{sorted.length} events</h3>
            <div className={wa.verticalPadding}></div>
            <div className={wa.eventContainer}>
                {sorted.map((val, index) => (<EventListing key={computeKey(val, index)} {...new EventListingProps(val, index, editIndex == index, OnStartEdit, OnFinishEdit) }/>))}
                <NewEventButton {...new NewEventButtonProps(addingNew, OnSubmitNewEvent, OnCancelNewEvent, OnClickNewEvent)}></NewEventButton>
            </div>
        </div>
    </div>);
}

const computeKey = (val : EventData, index : number) : string => {
    return val.toString() + index; 
}

export default WorkingArea 
