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

    const OnFinishEdit = (val : string, index : number) => {
        data[index] = ParseEvent(val).data; 
        console.log('finished edit!')
        setEditIndex(-1) // hm, which one gets called first? 
    }

    const OnSubmitNewEvent = (val : string) => {
        console.log(`adding new event: ${val}`)
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

    return (<div className={wa.container} 
            tabIndex={-1}
            onKeyDown={onKeyDown}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>2024/1/10</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>5 events</h3>
            <div className={wa.verticalPadding}></div>
            <div className={wa.eventContainer}>
                {sorted.map((val, index) => (<EventListing key={index} {...new EventListingProps(val, index, editIndex == index, setEditIndex, OnFinishEdit) }/>))}
                <NewEventButton {...new NewEventButtonProps(addingNew, OnSubmitNewEvent, OnCancelNewEvent, OnClickNewEvent, OnChangeNewEvent)}></NewEventButton>
            </div>
        </div>
    </div>);
}

export default WorkingArea 
