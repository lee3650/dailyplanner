import React, { useRef, useEffect } from "react"
import ei from './EventInput.module.css'; 
import { ComputeHighlight } from "../../model/Parser";
import { HighlightResult } from "../../model/EventData";

export class EventInputProps {
    constructor(public value : string, public setVal : (val : string) => void, public onSubmit : (val : string) => void, public onCancel : () => void) {

    }
}

const MAX_LENGTH = 64; 

export const EventInput : React.FC<EventInputProps> = (props : EventInputProps) => {
    function onchange(val : string) {
        // recompute highlight 

        val = val.replace('\n', '')
        val = val.substring(0, MAX_LENGTH)

        props.setVal(val) 
    }

    const hl : HighlightResult = ComputeHighlight(props.value)

    const contentEditableRef = useRef(null);

    const InsertKey = (val : string) : boolean => {
        if (val === 'Backspace')
        {
            return false; 
        }
        if (val == 'ArrowLeft' || val === 'ArrowRight')
        {
            return false; 
        }

        return true; 
    }

    const onSubmitClicked = () => {
        if (hl.valid)
        {
            props.onSubmit(props.value); 
        }
    }

    /*@ts-ignore*/
    const onkeydown = e => {
        if (e.key == 'Enter')
        {
            e.preventDefault(); 
            // todo - try call submit 
            props.onSubmit(props.value); 
        }
        if (e.key == 'Escape')
        {
            props.onCancel(); 
        }
        if (props.value.length >= MAX_LENGTH && InsertKey(e.key))
        {
            e.preventDefault(); 
        }
    }

    useEffect(() => {
        if (contentEditableRef.current) {
            /*@ts-ignore*/
            contentEditableRef.current.focus();
        }
    }, []); // run once and give focus 
    
    return (
        (<div className={ei.input_container}>
            <div 
            ref={contentEditableRef}
            contentEditable={true}
            onInput={e => onchange(e.currentTarget.textContent ?? "")} 
            autoFocus={true}
            tabIndex={1}
            defaultValue={props.value}
            onKeyDown={onkeydown}
            className={ei.input}
            >
            </div>
            <div className={ei.highlight_container}>
                <span>{props.value.substring(0, hl.startHl)}</span>
                <span className={ei.highlight}>{props.value.substring(hl.startHl, hl.endHl)}</span>
                <span>{props.value.substring(hl.endHl)}</span>
            </div>
            <button className={`${ei.button} ${ei.submit}`} disabled={!hl.valid} onClick={onSubmitClicked}>Submit</button>
            <button className={ei.button} onClick={props.onCancel}>Cancel</button>
        </div>
        )
    );
}
