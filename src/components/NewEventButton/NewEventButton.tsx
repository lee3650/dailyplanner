import React, { useState } from "react";
import ne from './NewEventButton.module.css'
import { EventInput, EventInputProps } from "../EventInput/EventInput";

export class NewEventButtonProps {
    constructor(public editing : boolean, public onSubmit : (value : string) => void,
     public onCancel : () => void, public onClick : () => void)
    {

    }
}

const NewEventButton : React.FC<NewEventButtonProps> = ( props : NewEventButtonProps) => {    
    const [value, setValue] = useState(''); 

    const onchange = (val : string) => {
        setValue(val); 
    } 

    return (
        <div className={ne.addNew} onClick={() => { if (!props.editing) { setValue(''); props.onClick(); }}}>
            {props.editing ? 
            (<EventInput {...new EventInputProps(value, onchange, props.onSubmit, props.onCancel, '', false, () => {})}></EventInput>)
            : (<p>+ new event</p>)}
        </div>)
}

export default NewEventButton; 


