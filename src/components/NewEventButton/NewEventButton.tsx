import React, { useRef, useState } from "react";
import ne from './NewEventButton.module.css'
import { ComputeHighlight } from "../../model/Parser";
import { EventInput, EventInputProps } from "../EventInput/EventInput";

export class NewEventButtonProps {
    constructor(public editing : boolean, public onSubmit : (value : string) => void,
     public onCancel : () => void, public onClick : () => void, public onChange : (valid : boolean) => void)
    {

    }
}

const NewEventButton : React.FC<NewEventButtonProps> = ( props : NewEventButtonProps) => {    
    const [value, setValue] = useState(''); 

    const onchange = (val : string) => {
        const parsed = ComputeHighlight(val); 

        if (parsed.valid)
        {

        }

        setValue(val); 

        props.onChange(parsed.valid); 
    } 

    return (
        <div className={ne.addNew}>
            {props.editing ? 
            (<EventInput {...new EventInputProps(value, onchange, props.onSubmit)}></EventInput>)
            : (<p onClick={() => { setValue(''); props.onClick(); }}>+ new event</p>)}
        </div>)
}

export default NewEventButton; 


