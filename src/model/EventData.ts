const getTimeString = (start : Time, end : Time) => {
    return `${start.toString()} - ${end.toString()}`; 
}

export class EventData {
    constructor(public title : string, public start : Time, public end : Time) {
    }

    toString() : string {
        return `${this.start.toStandardString()}-${this.end.toStandardString()} ${this.title}`; 
    }

    timeString() : string {
        return getTimeString(this.start, this.end); 
    }
}

export class ParsedEventData {
    constructor (public success : boolean, public data : EventData) 
    {

    }
}

export class HighlightResult {
    constructor (public valid : boolean, public startHl : number, public endHl : number) {

    }
}

const timeRegex = /(\d{1,2}):(\d{1,2})/; 

export class Time {
    // huh, I guess this gets automatically populated for a 'data object' type class 
    constructor(public hours : number, public minutes : number) 
    {

    }

    toString() {
        const mins = this.minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 });
        let meridian = 'AM'; 
        if (this.hours >= 12) 
        {
            meridian = 'PM'; 
        }

        let hourStr = this.hours % 12 + ''; 

        if (this.hours == 0)
        {
            hourStr = '12'; 
        }
        if (this.hours == 12)
        {
            hourStr = '12'; 
        }

        return `${hourStr}:${mins} ${meridian}`; 
    }

    toStandardString() {
        const mins = this.minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 });
        return `${this.hours}:${mins}`;
    }

    static fromString(val : string) : Time
    {
        const match = timeRegex.exec(val); 
        if (!match)
        {
            throw new TypeError(`Invalid value input: ${val}`); 
        }

        const hours = Number.parseInt(match[1]); 
        const minutes = Number.parseInt(match[2]); 

        return new Time(hours, minutes); 
    }
}
