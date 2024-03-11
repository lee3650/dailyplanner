import React, {useState, useEffect} from "react";
import { EventData, Time } from "../../model/EventData"
import css from './EventDisplay.module.css'
import { EventLine, EventLineProps } from "./EventLine";
import { ComputeOverlapArray } from "../../model/ComputeOverlap";

export class EventDisplayProps {
    constructor(public data : EventData[]) {

    }
}

const PIXELS_PER_HOUR = 75; 

const INLINE_HEIGHT_THRESH = 40; 

const MIN_HEIGHT = 24; 

export const EventDisplay : React.FC<EventDisplayProps> = (props : EventDisplayProps) => {
    let hours = [...Array(24).keys()]; // 0-23 inclusive 

    const computeTop = (start : Time) : number => {
        const minutes = start.getMinutes(); 
        return (minutes / 60) * PIXELS_PER_HOUR + 1;
    }

    const computeHeight = (start : Time, end : Time) : number => {
        const delta = end.getMinutes() - start.getMinutes(); 
        return Math.max((delta / 60) * PIXELS_PER_HOUR - 1, MIN_HEIGHT); 
    }

    const data = props.data; 

    // todo - this is really inefficient 
    const leftArr = ComputeOverlapArray(data); 

    return (
        <div>
            <div className={css.container}>
                <h1>calendar</h1>
                <div style={{position: 'relative', }}>
                    {hours.map(val => <div key={val} className={css.hour}>
                        <div><span>{new Time(val, 0).toString()}</span></div>
                        <div className={css.hourLine}></div>
                    </div>
                    )}
                    {data.map((val, idx) =>
                        <div key={val.title + val} className={css.event}
                        style={{
                            top: `${computeTop(val.start)}px`, 
                            height: `${computeHeight(val.start, val.end)}px`,
                            left: `${leftArr[idx]}%`,
                            width: `${100 - leftArr[idx]}%`, 
                        }}
                        >
                            <div className={css.eventDecor}></div>
                            <div className={css.eventContent}>
                                {computeHeight(val.start, val.end) < INLINE_HEIGHT_THRESH ?
                                    (<>
                                        <span>{val.title} <span className={css.eventTimeText}>({val.timeString()})</span></span>
                                    </>)
                                    : (<>
                                        <p>{val.title}</p>
                                        <p className={css.eventTimeText}>{val.timeString()}</p>
                                    </>
                                    )}
                            </div>
                        </div>
                    )}

                    <EventLine {... new EventLineProps(computeTop)}/>
                <div>
                </div>
                </div>
            </div>
        </div>
    );
}
