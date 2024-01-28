export class EventData {
    constructor(public title : string, public start : Time, public end : Time) {
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
}
