import el from './EventListing.module.css'; 
import EventData from '../../model/EventData';
import React from 'react';

const getTimeString = (start : Date, end : Date) => {
    return `${start.toTimeString()} - ${end.toTimeString()}`; 
}

const EventListing : React.FC<EventData> = (props : EventData) => {
    return (<div className={el.container}>
        <p className={el.eventTitle}>{props.eventTitle}</p>
        <p className={el.eventTime}>{getTimeString(props.eventStart, props.eventEnd)}</p>
        <div className={el.line}></div>
    </div>)
}

export default EventListing; 
