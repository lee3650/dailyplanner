export const GUEST_ID = 0; 

export const BASE_URL = 'http://localhost:8080/'
export const LOGIN_URL = BASE_URL + 'login'
export const CREATE_ACCOUNT_URL = BASE_URL + 'createAccount'
export const readTemplateUrl = (id : number) => BASE_URL + `readTemplate/${id}`

export const READ_TEMPLATES_URL = BASE_URL + 'readTemplates' 

export const WRITE_TEMPLATE_URL = BASE_URL + 'writeTemplate'
export const ADD_EVENT_DATA_URL = BASE_URL + 'addEvent'; 

export const TODAY_ID = -2; 
export const BLANK_ID = -1; 
