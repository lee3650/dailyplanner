import wa from './WorkingArea.module.css'
import EventListing from './EventListing/EventListing';
import { EventListingProps } from './EventListing/EventListing';
import {EventData } from '../model/EventData';
import React, { useState } from 'react';

export class WorkingAreaProp {
    constructor(public data : EventData[]){

    }
}

const WorkingArea : React.FC<WorkingAreaProp> = ({ data }) => {
    const sorted = data.sort((a, b) => (60 * (a.start.hours - b.start.hours)) + (a.start.minutes - b.start.minutes))    

    const [editIndex, setEditIndex] = useState(-1); 

    const OnEdit = (val : string, index : number) => {

    }

    return (<div className={wa.container}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>2024/1/10</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>5 events</h3>
            <div className={wa.verticalPadding}></div>
            <div className={wa.eventContainer}>
                {sorted.map((val, index) => (<EventListing key={index} {...new EventListingProps(val, OnEdit, index, editIndex == index, setEditIndex) }/>))}
                <div className={wa.addNew}>
                    <p>+ new event</p>
                </div>
            </div>
        </div>
    </div>);
}

export default WorkingArea 
