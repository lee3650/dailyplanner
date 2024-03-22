import { EventData } from "./EventData";

export class Template {
    constructor(public data : EventData[], 
        public name : string, public id : number) {

    } 

    public duplicate(id : number) : Template {
        return new Template([...this.data], this.name.trim() + ' (copy)', id); 
    }
}
