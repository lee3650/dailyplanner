const getTimeString = (start: Time, end: Time) => {
    return `${start.toString()} - ${end.toString()}`;
}

export class EventData {
    constructor(public title: string, public start: Time, public end: Time, public id: number) {
    }

    toString(): string {
        return `${this.start.toStandardString()}-${this.end.toStandardString()} ${this.title}`;
    }

    timeString(): string {
        return getTimeString(this.start, this.end);
    }

    toRequestBody() {
        return {
            id: this.id,
            startTime: this.start.getMinutes(),
            endTime: this.end.getMinutes(),
            name: this.title
        }
    }
}

export class ParsedEventData {
    constructor (public success : boolean, public data : EventData, public error : string) 
    {

    }
}

export class HighlightResult {
    constructor (public valid : boolean, public startHl : number, public endHl : number, public error : string) {

    }
}

const timeRegex = /(\d{1,2}):(\d{1,2})/; 

export class Time {
    // huh, I guess this gets automatically populated for a 'data object' type class 
    constructor(public hours : number, public minutes : number) 
    {

    }

    leq(other : Time) : boolean 
    {
        return this.getMinutes() <= other.getMinutes(); 
    }

    static now() {
        const cur = new Date(); 
        return new Time(cur.getHours(), cur.getMinutes());
    }

    getMinutes() {
        return this.hours * 60 + this.minutes; 
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

    static fromInt(val : number) : Time 
    {
        return new Time(Math.floor(val / 60), Math.round(val) % 60); 
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

    static validTimeString(val : string) : boolean 
    {
        const match = timeRegex.exec(val); 
        if (!match)
        {
            throw new TypeError(`Invalid value input: ${val}`); 
        }

        const hours = Number.parseInt(match[1]); 
        const minutes = Number.parseInt(match[2]); 

        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59; 
    }
}
