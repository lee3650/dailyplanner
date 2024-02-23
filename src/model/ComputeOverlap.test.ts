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
    expect(result[1]).toBeCloseTo(33); 
}); 

test('Compute overlap works for non-overlapping events', () => {
    const testdata = [ 
        new EventData('a', new Time(0,0), new Time(0, 30)), 
        new EventData('b', new Time(0,30), new Time(0, 40)), 
        new EventData('b', new Time(0,40), new Time(0, 50)), 
    ]; 
    const result = ComputeOverlapArray(testdata); 
    expect(result[0]).toBeCloseTo(0); 
    expect(result[1]).toBeCloseTo(0); 
    expect(result[2]).toBeCloseTo(0); 
})

test('Compute overlap works for equal events', () => {
    const testdata = [ 
        new EventData('a', new Time(0,0), new Time(0, 30)), 
        new EventData('b', new Time(0,0), new Time(0, 30)), 
    ]; 
    const result = ComputeOverlapArray(testdata); 
    expect(result[0]).toBeCloseTo(0); 
    expect(result[1]).toBeCloseTo(33); 
})

/* 
So, really we want it to 'drop down' if possible,
but that's probably not possible so let's ignore that for now
*/
test('Compute overlap works for multiple overlapping events', () => {
    const testdata = [ 
        new EventData('a', new Time(0,0), new Time(0, 30)), 
        new EventData('b', new Time(0,10), new Time(0, 40)), 
        new EventData('c', new Time(0,20), new Time(0, 50)), 
        new EventData('d', new Time(0,50), new Time(1, 10)), 
    ]; 
    const result = ComputeOverlapArray(testdata); 
    expect(result[0]).toBeCloseTo(0); 
    expect(result[1]).toBeCloseTo(33); 
    expect(result[2]).toBeCloseTo(66); 
    expect(result[3]).toBeCloseTo(0); 
})

test('Compute overlap works for surrounded events', () => {
    const testdata = [ 
        new EventData('a', new Time(0,0), new Time(2, 30)), 
        new EventData('b', new Time(0,10), new Time(0, 40)), 
        new EventData('c', new Time(0,20), new Time(0, 50)), 
        new EventData('d', new Time(0,50), new Time(1, 10)), 
    ]; 
    const result = ComputeOverlapArray(testdata); 
    console.log(`computed result: ${result}`); 
    expect(result[0]).toBeCloseTo(0); 
    expect(result[1]).toBeCloseTo(33); 
    expect(result[2]).toBeCloseTo(66); 
    expect(result[3]).toBeCloseTo(33); 
})
