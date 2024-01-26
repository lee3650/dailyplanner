import el from './EventListing.module.css'; 
import {EventData, Time } from '../../model/EventData';
import React from 'react';

const getTimeString = (start : Time, end : Time) => {
    return `${start.toString()} - ${end.toString()}`; 
}

export class EventListingProps {
    constructor (public eventData : EventData, public onEdit : (input : string, index : number) => void,
     public index : number, public editing : boolean, public onClick : (index : number) => void, public onFinishEdit : (index : number) => void) {

    }
}

const getCombinedString = (props : EventListingProps) => {
    return `${props.eventData.title} ${getTimeString(props.eventData.start, props.eventData.end)}`; 
}

const EventListing : React.FC<EventListingProps> = (props : EventListingProps) => {
    const data = props.eventData; 

    const clicked = () => props.onClick(props.index)

    return (<div className={el.container} onClick={() => {if (!props.editing) { clicked()}}}>
        {
        props.editing ? (<form onSubmit={e => {e.preventDefault(); props.onFinishEdit(props.index)}}>
                <input autoFocus type = 'text' defaultValue = {getCombinedString(props)} onChange={e => props.onEdit(e.target.value, props.index)} onBlur={() => props.onFinishEdit(props.index)}/> 
                </form>) : 
        (<><p className={el.eventTitle}>{data.title}</p>
        <p className={el.eventTime}>{getTimeString(data.start, data.end)}</p></>)
        }
        <div className={el.line}></div>
    </div>)
}

export default EventListing; 
