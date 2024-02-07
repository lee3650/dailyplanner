import { EventData, HighlightResult, ParsedEventData, Time } from "./EventData";

const timeRegex = /(\d{1,2}:\d\d)( )*-( )*(\d{1,2}:\d\d)/; 

export const ParseEvent : (val : string) => ParsedEventData = (val : string) => {
    // I think we want to return... let's look at the client. 
    console.log(`parsing event: ${val}`); 

    const match = timeRegex.exec(val); 

    if (!match)
    {
        console.log(`failed to parse event!`); 
        return new ParsedEventData(false, new EventData(val, new Time(0,0), new Time(0,0))); 
    }

    const start = match[1];
    const end = match[4];

    console.log(`found start and end time: ${start}, end: ${end}`); 

    console.log(`no groups found!`); 
    try {
        const hl = ComputeHighlight(val); 
        if (hl.valid)
        {
            const first = val.substring(0, hl.startHl); 
            const last = val.substring(hl.endHl); 

            return new ParsedEventData(true, new EventData(`${first.trim()} ${last.trim()}`, Time.fromString(start), Time.fromString(end))); 
        }
    }
    catch (e : any)
    {
        return new ParsedEventData(false, new EventData(val, new Time(0,0), new Time(0,0))); 
    }

    return new ParsedEventData(false, new EventData(val, new Time(0,0), new Time(0,0))); 
}

export function ComputeHighlight(val : string) : HighlightResult {
    const match = timeRegex.exec(val); 

    if (match) 
    {
        return new HighlightResult(true, match.index, match.index + match[0].length); 
    }

    return new HighlightResult(false, 0, 0); 
}
