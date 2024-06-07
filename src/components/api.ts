import { Account } from "../model/Account";
import { EventData, Time } from "../model/EventData";
import { Template } from "../model/Template";
import { ADD_EVENT_DATA_URL, READ_TEMPLATES_URL, TODAY_ID, WRITE_TEMPLATE_URL, readTemplateUrl } from "./constants";
import axios from "axios";

export function serverAddEventData(account : Account, templateId : number, data : EventData) : Promise<Template>
{
    return axios.post(ADD_EVENT_DATA_URL, {
        templateId: templateId, 
        eventData: data.toRequestBody()
    }, getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverUpdateEventData(account : Account, templateId : number, data : EventData) : Promise<Template>
{

}

export function serverAddTemplate(account : Account, templateName : string, data : EventData[]) : Promise<Template> {

}

export function serverDeleteTemplate(account : Account, templateId : number) : Promise<Template[]>
{

}

export function loadTemplates(account : Account) : Promise<Template[]> {
    return axios.get(READ_TEMPLATES_URL, getHeaders(account))
    .then(response => parseTemplates(response.data))
}

export function fetchTemplate(account : Account, template_id : number) : Promise<Template> { 
    return axios.get(readTemplateUrl(template_id), getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function parseTemplates(data : any) : Template[]
{
    console.log(`parsing templates!`)
    const result : Template[] = []

    /* @ts-ignore */
    data.forEach(t => {
        console.log(`parsing item: ${JSON.stringify(t)}`); 
        result.push(parseTemplate(t)); 
    });

    console.log(`parsed templates: ${JSON.stringify(result)}`)

    return result; 
}

export async function writeTemplate(account: Account, template: Template): Promise<Template> {
    const data = await axios.post((WRITE_TEMPLATE_URL), {
        id: template.id,
        owner: account.id,
        name: template.name,
        events: template.data,
    },
        getHeaders(account)
    )
    return parseTemplate(data.data)
}

function getHeaders(account : Account)
{
    return {
        headers: {
            userId: account.id,
            password: account.passwordHash,
        }
    }
}

export function parseTemplate(data: any): Template {
    const d: EventData[] = []
    data.events.forEach(e => d.push(new EventData(e.name, Time.fromInt(e.startTime), Time.fromInt(e.endTime), e.id)));
    const template = new Template(d, data.name, data.id);
    return template
}
