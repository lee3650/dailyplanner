import { EventData, HighlightResult, ParsedEventData, Time } from "./EventData";

export const ParseEvent : (val : string) => ParsedEventData = (val : string) => {
    // I think we want to return... let's look at the client. 
    return new ParsedEventData(true, new EventData(val, new Time(0,0), new Time(0,0))); 
}

const timeRegex = /(\d\d:\d\d)( )*-( )*(\d\d:\d\d)/; 

export function ComputeHighlight(val : string) : HighlightResult {
    const match = timeRegex.exec(val); 

    if (match) 
    {
        return new HighlightResult(true, match.index, match.index + match[0].length); 
    }

    return new HighlightResult(false, 0, 0); 
}
