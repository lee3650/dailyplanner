import React from "react";
import { EventData, Time } from "../../model/EventData"
import css from './EventDisplay.module.css'

export class EventDisplayProps {
    constructor(public data : EventData[]) {

    }
}

export const EventDisplay : React.FC<EventDisplayProps> = (props : EventDisplayProps) => {
    let hours = [...Array(24).keys()]; // 0-23 inclusive 

    const data = props.data; 

    return (
        <div>
            <div className={css.container}>
                <h1>today</h1>
                <div>
                    {hours.map(val => <div key={val} className={css.hour}>
                        <div><span>{new Time(val, 0).toString()}</span></div>
                        <div className={css.hourLine}></div>
                    </div>
                    )}
                    {data.map(val =>
                        <div key={val.title + val} className={css.event}>
                            <p>{val.title}</p>
                            <p>{val.timeString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
