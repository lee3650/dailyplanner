import { Account } from "../model/Account";
import { EventData, Time } from "../model/EventData";
import { Template } from "../model/Template";
import { ADD_EVENT_DATA_URL, ADD_TEMPLATE_URL, READ_TEMPLATES_URL, TODAY_ID, LOGIN_URL, UPDATE_EVENT_DATA_URL, deleteEventUrl, deleteTemplateUrl, duplicateTemplateUrl, loadIntoTodayUrl, readTemplateUrl, renameTemplateUrl } from "./constants";
import axios from "axios";

export function serverAddEventData(account : Account, templateId : number, data : EventData) : Promise<Template>
{
    return axios.post(ADD_EVENT_DATA_URL, {
        templateId: templateId, 
        eventData: data.toRequestBody()
    }, getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverLoadIntoToday(account : Account, toLoadId : number) : Promise<Template>
{
    return axios.post(loadIntoTodayUrl(toLoadId), {
        templateId: toLoadId, 
    }, getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverDeleteEvent(account : Account, eventId : number) : Promise<Template>
{
    return axios.delete(deleteEventUrl(eventId), getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverUpdateEventData(account : Account, templateId : number, data : EventData) : Promise<Template>
{
    return axios.post(UPDATE_EVENT_DATA_URL, {
        templateId: templateId, 
        eventData: data.toRequestBody()
    }, getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverAddTemplate(account : Account, templateName : string) : Promise<Template> {
    return axios.post(ADD_TEMPLATE_URL, {
        name: templateName
    }, getHeaders(account))
    .then(response => parseTemplate(response.data))
}

export function serverDeleteTemplate(account : Account, templateId : number) : Promise<Template[]>
{
    return axios.delete(deleteTemplateUrl(templateId), getHeaders(account))
    .then(response => {console.log(`got response from server delete template: ${JSON.stringify(response)}`); return parseTemplates(response.data)})
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
    if (data == null || data == undefined || typeof data.forEach != 'function')
    {
        console.warn(`got data ${JSON.stringify(data)} in parse templates request which was invalid!`)
        return []
    }

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

export async function serverLogin(email : string, password : string) : Promise<any>
{
        const data = {
            email: email, 
            passwordHash: password
        }

        return axios.post(LOGIN_URL, data, {
            headers: {
                Accept: "application/json", 
            }
        })
}

export async function serverDuplicateTemplate(account : Account, templateId : number) : Promise<Template[]>
{
    const data = await axios.post(duplicateTemplateUrl(templateId), {},
        getHeaders(account)
    )
    return parseTemplates(data.data)
}

export async function serverRenameTemplate(account : Account, id : number, newName : string) : Promise<Template>
{
    const data = await axios.post(renameTemplateUrl(id), {
        newName: newName
    },
        getHeaders(account)
    )
    return parseTemplate(data.data)
}

function getHeaders(account : Account)
{
    return {
        headers: {
            auth: `${account.id}:${account.passwordHash}`
        }
    }
}

export function parseTemplate(data: any): Template {
    const d: EventData[] = []
    data.events.forEach(e => d.push(new EventData(e.name, Time.fromInt(e.startTime), Time.fromInt(e.endTime), e.id)));
    const template = new Template(d, data.name, data.id);
    return template
}
