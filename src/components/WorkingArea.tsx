import wa from './WorkingArea.module.css'
import EventListing from './EventListing/EventListing';
import EventData from '../model/EventData';

const test_data = [
    new EventData("test event", new Date(2000, 1, 1, 13, 10), new Date(2000, 1, 1, 13, 30)), 
    new EventData("test event 2", new Date(2000, 1, 2, 14, 10), new Date(2000, 1, 1, 14, 20)), 
    new EventData("test event 3", new Date(2000, 1, 1, 14, 20), new Date(2000, 1, 1, 15, 20)), 
]; 

const WorkingArea = () => {
    return (<div className={wa.container}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>2024/1/10</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>5 events</h3>
            <div className={wa.verticalPadding}></div>
            <div className={wa.eventContainer}>
                {test_data.map((val, index) => (<EventListing key={index} {...val}/>))}
                <div className={wa.addNew}>
                    <p>+ new event</p>
                </div>
            </div>
        </div>
    </div>);
}

export default WorkingArea 
