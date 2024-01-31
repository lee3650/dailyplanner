import React, { useRef, useState } from "react"
import ei from './EventInput.module.css'; 

export class EventInputProps {
    constructor(public value : string, public setVal : (val : string) => void, public onSubmit : (val : string) => void) {

    }
}

export const EventInput : React.FC<EventInputProps> = (props : EventInputProps) => {
    function onchange(val : string) {
        // recompute highlight 

        console.log(`received change: ${val}`); 

        props.setVal(val) 
    }

    const value = props.value; 

    const [startHl, setStartHl] = useState(2); 
    const [endHl, setEndHl] = useState(4); 
    
    return (
        (<div className={ei.input_container}>
            <div 
            contentEditable={true}
            onInput={e => onchange(e.currentTarget.textContent ?? "")} 
            autoFocus
            tabIndex={1}
            >
            </div>
            <div className={ei.highlight_container}>
                {props.value}
            </div>
        </div>
        )
    );
}
