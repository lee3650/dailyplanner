import { ComputeOverlapArray } from "./ComputeOverlap";
import { EventData, Time } from "./EventData";
import { test, expect} from '@jest/globals'; 

test('Compute overlap finds overlap', () => {
    const testdata = [ 
        new EventData('a', new Time(0,0), new Time(0, 30)), 
        new EventData('b', new Time(0,10), new Time(0, 40)), 
    ]; 
    const result = ComputeOverlapArray(testdata); 
    expect(result[0]).toBeCloseTo(0); 
    expect(result[1]).toBeCloseTo(1); 
}); 
