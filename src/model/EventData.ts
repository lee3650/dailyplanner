class EventData {
    eventTitle : string; 
    eventStart : Date; 
    eventEnd : Date; 

    constructor(title : string, start : Date, end : Date) {
        this.eventTitle = title; 
        this.eventStart = start; 
        this.eventEnd = end; 
    }
}

export default EventData;
