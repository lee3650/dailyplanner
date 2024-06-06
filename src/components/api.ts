import { Account } from "../model/Account";
import { EventData, Time } from "../model/EventData";
import { Template } from "../model/Template";
import { TODAY_ID, readTemplateUrl } from "./constants";
import axios from "axios";

export function serverAddEventData(account : Account, templateId : number, data : EventData) : Template
{

}

export function serverUpdateEventData(account : Account, templateId : number, data : EventData) : Template
{

}


export function serverAddTemplate(account : Account, templateName : string, data : EventData[]) : Template {

}

export function serverDeleteTemplate(account : Account, templateId : number) :  Template[]
{

}

export function loadTemplates(account : Account) : Template[] {
    // return Object.values(tmpData); 
}

export function fetchTemplate(account : Account, template_id : number) : [boolean, Template] {
    /*
    if (template_id == TODAY_ID)    
    {
        return [true, todayTemplate]
    }

    if (tmpData.hasOwnProperty(template_id))
    {
        return [true, tmpData[template_id]]; 
    }

    return [false, new Template([], '', -1000)]; 
    */

   /*
        const data = {
            email: email, 
            passwordHash: password
        }

        axios.post(LOGIN_URL, data, {
            headers: {
                Accept: "application/json", 
            }
        })
        .then(response => loginSucceeded(response.data))
        .catch(reason => {console.log(JSON.stringify(reason)); setError(reason.message + (reason.response ? (": " + reason.response.data) : ""))});  

   */
   
    const data = await axios.get(readTemplateUrl(template_id), {
        headers: {
            userId: account.id, 
            password: account.passwordHash, 
        }
    })

    return [true, parseTemplate(data)]
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

export function parseTemplate(data : any) : Template 
{
    const d : EventData[] = []
    data.events.forEach(e => d.push(new EventData(e.name, Time.fromInt(e.startTime), Time.fromInt(e.endTime), e.id))); 
    const template = new Template(d, data.name, data.id); 
    return template
}

export function writeTemplate(account : Account, template : Template) {
    if (template.id == TODAY_ID) 
    {
        todayTemplate = template; 
    }
    else 
    {
        tmpData[template.id] = template; 
    }
}
