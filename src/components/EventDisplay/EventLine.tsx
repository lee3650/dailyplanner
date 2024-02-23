import css from './EventDisplay.module.css'
import { Time } from "../../model/EventData";
import React, {useState, useEffect} from "react";

export class EventLineProps {
    constructor (public computeTop : (start : Time) => number ) {

    }
}

export const EventLine : React.FC<EventLineProps> = ( props : EventLineProps) => {
    const [lineTop, setLineTop] = useState(props.computeTop(Time.now())); 

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setLineTop(props.computeTop(Time.now()));
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [lineTop]);

    return (
        <div className={css.lineContainer} style={{
            top: `${lineTop}px`,
        }}>
            <div className={css.lineBall}></div>
            <div className={css.line}></div>
        </div>
    ); 
}
