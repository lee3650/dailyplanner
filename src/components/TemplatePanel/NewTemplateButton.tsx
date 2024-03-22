import { FC } from 'react';
import { useState } from 'react'
import css from './TemplatePanel.module.css'

export class NewTemplateButtonProps {
    constructor(public addNewTemplate : (name : string) => void) {

    }
}

export const NewTemplateButton : FC<NewTemplateButtonProps> = (props : NewTemplateButtonProps) => {
    const [ editing, setEditing ] = useState(false); 
    const [ value, setValue ] = useState(''); 
    
    const onClick = () => {
        if (editing)
        {
            return; 
        }

        setEditing(true); 
    }

    /* @ts-ignore */
    const onChange = (e) => {
        setValue(e.target.value); 
    }

    /* @ts-ignore */
    const keyDown = (e) => {
        console.log('key down'); 
        if (e.key === 'Enter' && editing) 
        {
            submit(); 
            return; 
        }

        if (e.key === 'Escape' && editing)
        {
            cancel(); 
        }
    }

    const submit = () => {
        props.addNewTemplate(value);
        setValue('');
        setEditing(false);
    }

    const cancel = () => {
        setValue(''); 
        setEditing(false); 
    }

    return (<div className={css.newTemplateButton} onClick={onClick}>
        {!editing ? (<span>+ new template</span>) : (<div>
            <input
            className={css.newTemplateInput}
            onKeyUp={keyDown}
            onChange={onChange}
            value={value}
            autoFocus={true}
            ></input>
            <br/>
            <button className={css.submitButton} onClick={submit}>Submit</button>
            <button className={css.cancelButton} onClick={cancel}>Cancel</button>
            </div>)}
    </div>)
}

