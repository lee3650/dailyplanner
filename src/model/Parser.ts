import { EventData, HighlightResult, ParsedEventData, Time } from "./EventData";

const timeRegex = /(\d{1,2}:\d\d)( )*-( )*(\d{1,2}:\d\d)/; 

export const ParseEvent : (val : string) => ParsedEventData = (val : string) => {
    // I think we want to return... let's look at the client. 
    console.log(`parsing event: ${val}`); 

    const match = timeRegex.exec(val); 

    if (!match)
    {
        console.log(`failed to parse event!`); 
        return new ParsedEventData(false, new EventData(val, new Time(0,0), new Time(0,0), -1), "Missing time range! Add start and end time HH:MM-HH:MM"); 
    }

    const start = match[1];
    const end = match[4];

    console.log(`found start and end time: ${start}, end: ${end}`);

    try {
        let startHl, endHl = 0;

        startHl = match.index;
        endHl = match.index + match[0].length;

        const first = val.substring(0, startHl);
        const last = val.substring(endHl);

        if (!Time.validTimeString(start) || !Time.validTimeString(end)) {
            return new ParsedEventData(false, new EventData("", new Time(0, 0), new Time(0, 0), -1), "Start or end time was not valid!");
        }

        const startTime = Time.fromString(start);
        const endTime = Time.fromString(end);

        if (endTime.leq(startTime)) {
            return new ParsedEventData(false, new EventData("", new Time(0, 0), new Time(0, 0), -1), "Start time must be before end time!");
        }

        return new ParsedEventData(true, new EventData(`${first.trim()} ${last.trim()}`, startTime, endTime, -1), "");
    }
    catch (e: any) {
        return new ParsedEventData(false, new EventData(val, new Time(0, 0), new Time(0, 0), -1), "Failed to parse start and end time!");
    }
}

export function ComputeHighlight(val : string) : HighlightResult {
    const match = timeRegex.exec(val); 

    if (match) 
    {
        const parsed = ParseEvent(val); 

        if (parsed.success)
        {
            return new HighlightResult(true, match.index, match.index + match[0].length, ""); 
        }

        return new HighlightResult(false, 0, 0, parsed.error); 
    }

    return new HighlightResult(false, 0, 0, "Missing start and end time! Format: HH:MM - HH:MM (military time)"); 
}
