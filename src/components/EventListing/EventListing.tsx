import el from './EventListing.module.css'; 
import {EventData, Time } from '../../model/EventData';
import React, {useState} from 'react';
import { EventInput, EventInputProps } from '../EventInput/EventInput';

export class EventListingProps {
    constructor (public eventData : EventData, public index : number, public editing : boolean,
         public onClick : (index : number) => void, public onFinishEdit : (value : string, index : number) => void) {

    }
}

const EventListing : React.FC<EventListingProps> = (props : EventListingProps) => {
    const data = props.eventData; 

    const [ text, setText ] = useState(data.toString()); 
    const [ oldVal, setOldVal ] = useState(data.toString()); 

    const onFinishEdit = (val : string) => {
        props.onFinishEdit(val, props.index); 
    }

    const onCancelEdit = () => {
        props.onFinishEdit(oldVal, props.index); 
    }

    const clicked = () => { 
        setOldVal(data.toString()); 
        props.onClick(props.index); 
    }

    return (<div className={el.container} onClick={() => {if (!props.editing) { clicked()}}}>
        {
        props.editing ? (<EventInput {...new EventInputProps(text, setText, onFinishEdit, onCancelEdit, oldVal)}></EventInput>) : 
        (<><p className={el.eventTitle}>{data.title}</p>
        <p className={el.eventTime}>{data.timeString()}</p></>)
        }
        <div className={el.line}></div>
    </div>)
}

export default EventListing; 
