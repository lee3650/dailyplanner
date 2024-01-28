import React, { useRef, useState } from "react"
import ei from './EventInput.module.css'; 

export class EventInputProps {
    constructor(public value : string, public setVal : (val : string) => void) {

    }
}

export const EventInput : React.FC<EventInputProps> = (props : EventInputProps) => {

    // lol, todo
    /*@ts-ignore*/ 
    const syncScroll = (e) => {
    /*@ts-ignore*/
        ref.current.scrollTop = e.target.scrollTop;
    /*@ts-ignore*/
        ref.current.scrollLeft = e.target.scrollLeft;
    };

    const ref = useRef(null); 

    function onchange(val : string) {
        // recompute highlight 
    }

    const value = props.value; 

    const [startHl, setStartHl] = useState(0); 
    const [endHl, setEndHl] = useState(0); 
    
    return (
        (<div className={ei.input_container}>
            <form onSubmit={e => {
                e.preventDefault();
                /*@ts-ignore*/
                props.onSubmit(e.target[0].value)
            }}>
                <input value={value} onScroll={syncScroll} autoFocus type='text' defaultValue='' onChange={e => onchange(e.target.value)} />
            </form>
            <div ref={ref} className={ei.input_renderer}>
                {/* todo - only if valid! */}
                <span>{value.slice(0, startHl)}</span>
                <span className={ei.highlighted}>{value.slice(startHl, endHl)}</span>
                <span>{value.slice(endHl)}</span>
            </div>
        </div>

        )
    );
}
