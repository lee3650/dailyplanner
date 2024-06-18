export const GUEST_ID = -1; 
export const UNINIT_ID = -100; 

export const BASE_URL = 'https://daily-planners.com/'
export const LOGIN_URL = BASE_URL + 'login'
export const CREATE_ACCOUNT_URL = BASE_URL + 'createAccount'
export const readTemplateUrl = (id : number) => BASE_URL + `readTemplate/${id}`

export const READ_TEMPLATES_URL = BASE_URL + 'readTemplates' 
export const ADD_TEMPLATE_URL = BASE_URL + 'addTemplate'
export const deleteTemplateUrl = (id : number) => BASE_URL + `deleteTemplate/${id}`
export const loadIntoTodayUrl = (templateId : number) => BASE_URL + `loadIntoToday/${templateId}`
export const deleteEventUrl = (id : number) => BASE_URL + `deleteEvent/${id}`;

export const renameTemplateUrl = (id : number) => BASE_URL + `renameTemplate/${id}`
export const duplicateTemplateUrl = (id : number) => BASE_URL + `duplicateTemplate/${id}`
export const ADD_EVENT_DATA_URL = BASE_URL + 'addEvent'; 
export const UPDATE_EVENT_DATA_URL = BASE_URL + 'updateEvent'; 

export const TODAY_ID = -1; 
