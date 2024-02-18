import { EventData } from "../../model/EventData";
import WorkingArea from "../WorkingArea";
import { EventDisplay, EventDisplayProps } from "../EventDisplay/EventDisplay";
import { Time } from "../../model/EventData";
import css from './MainPage.module.css';

const test_data = [
    new EventData("wraparound event", new Time(11, 10), new Time(12, 30)), 
    new EventData("overlap event", new Time(11, 25), new Time(12, 50)), 
    new EventData("another overlap", new Time(12, 25), new Time(13, 0)), 
    new EventData("test event 2", new Time(13, 30), new Time(14, 0)), 
    new EventData("test event 3", new Time(15, 20), new Time(15, 40)), 
    new EventData("test event", new Time(13, 10), new Time(13, 30)), 
    new EventData("midnight event", new Time(0, 10), new Time(1, 30)), 
]; 

export function MainPage() {
  return (
        <div className={css.container}>
            <div className={css.menu}>
                <WorkingArea data={test_data}>
                </WorkingArea>
            </div>
            <div className={css.hline}></div>
            <div className={css.menu}>
                <EventDisplay {...new EventDisplayProps(test_data)}></EventDisplay>
            </div>
        </div>
    )
}
