import el from './EventListing.module.css'; 

const EventListing = () => {
    return (<div>
        <p className={el.eventTitle}>Event title</p>
        <p className={el.eventTime}>10:15 AM - 10:30 AM</p>
    </div>)
}

export default EventListing; 
