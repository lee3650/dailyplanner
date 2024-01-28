import { EventData, HighlightResult, ParsedEventData, Time } from "./EventData";

export const ParseEvent : (val : string) => ParsedEventData = (val : string) => {
    // I think we want to return... let's look at the client. 
    return new ParsedEventData(true, new EventData("", new Time(0,0), new Time(0,0))); 
}

export function ComputeHighlight(val : string) : HighlightResult {
    return new HighlightResult(true, 1, 4); 
}
