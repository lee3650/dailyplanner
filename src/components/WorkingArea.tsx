import wa from './WorkingArea.module.css'
import EventListing from './EventListing/EventListing';

const WorkingArea = () => {
    return (<div className={wa.container}>
        <div className={wa.padding}/>
        <div className={wa.body}>
            <h3 className={wa.date}>2024/1/10</h3>
            <h1 className={wa.title}>template name</h1>
            <h3 className={wa.eventCount}>5 events</h3>
            <div className={wa.verticalPadding}></div>
            <EventListing/>
            <EventListing/>
            <EventListing/>
            <EventListing/>
        </div>
    </div>); 
}


export default WorkingArea 
