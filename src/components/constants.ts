export const GUEST_ID = -1; 
export const UNINIT_ID = -100; 

export const BASE_URL = 'http://localhost:8080/'
export const LOGIN_URL = BASE_URL + 'login'
export const CREATE_ACCOUNT_URL = BASE_URL + 'createAccount'
export const readTemplateUrl = (id : number) => BASE_URL + `readTemplate/${id}`

export const READ_TEMPLATES_URL = BASE_URL + 'readTemplates' 
export const ADD_TEMPLATE_URL = BASE_URL + 'addTemplate'
export const deleteTemplateUrl = (id : number) => BASE_URL + `deleteTemplate/${id}`

export const WRITE_TEMPLATE_URL = BASE_URL + 'writeTemplate'
export const ADD_EVENT_DATA_URL = BASE_URL + 'addEvent'; 
export const UPDATE_EVENT_DATA_URL = BASE_URL + 'updateEvent'; 

export const TODAY_ID = -2; 
export const BLANK_ID = -1; 
