import { EventData } from "./EventData";

export const ComputeOverlapArray = (data : EventData[]) : number[] => {
    const result : number[] = new Array(data.length).fill(0); 

    // algorithm: sort into 'z-index' by looking at overlap from end time. 
    // greedily take all elements that don't overlap by end time
    // remove from the list, those get z-index of 0. 
    // continue, the next ones get z-index of 1, etc, until we're done. 
    // we also need to somehow find *which* elements overlap so we can normalize
    // since I want to return a 'left' percentage value. 
    // or we can just run that as a post-processor 

    const DoesOverlap = (index : number, element : EventData, data : any) : boolean => {
        // assume sorted by increasing start time 
        // we have to check all elements for overlap
        // we only have to check one previous element? 

        for (let i = 0; i < index; i++)
        {
            if (data[i].item.start.getMinutes() <= element.start.getMinutes() && data[i].item.end.getMinutes() > element.start.getMinutes()) {
                return true;
            }
        }

        return false; 
    }

    const mapped = data.map((val, index) => {
        return {
            item: val, 
            index: index,
        }
    }); 

    const sorted = mapped.sort((a, b) => a.item.start.getMinutes() - b.item.start.getMinutes()); 

    const copy = [...sorted]

    let z = 0; 

    while (sorted.length > 0)
    {
        let round = []; 
        for (let i = 0; i < sorted.length; i++) 
        {
            if (!DoesOverlap(i, sorted[i].item, sorted))
            {
                round.push(i); 
            }
        }

        // we've collected all the non-overlapping items. 
        for (let i = round.length - 1; i >= 0; i--)
        {
            result[sorted[round[i]].index] = z; 
            sorted.splice(round[i], 1); 
        }

        z += 1; 
    }

    copy.forEach(val => {
        result[val.index] = Math.min((result[val.index]) * 33, 80); 
    }); 

    return result; 
}
