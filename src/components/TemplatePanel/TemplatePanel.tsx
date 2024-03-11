import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useState } from 'react'
import css from './TemplatePanel.module.css'
import { faCalendar, faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { TemplateButton, TemplateButtonProps } from './TemplateButton'
import { NewTemplateButton, NewTemplateButtonProps } from './NewTemplateButton'
import { Template } from '../../model/Template'

export class TemplatePanelProps {
    constructor(public data : Template[], public loadIntoToday : (template : Template) => void, public addTemplate : (toAdd : Template) => void) {

    }
}

export const TemplatePanel : FC<TemplatePanelProps> = (props : TemplatePanelProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1); 

    const onClicked = (index : number) => {
        if (index == selectedIndex)
        {
            setSelectedIndex(-1); 
        }
        else 
        {
            setSelectedIndex(index); 
        }
    }

    const clickOff = () => {
        setSelectedIndex(-1); 
    }

    /*@ts-ignore*/
    const onKeyDown = e => {
        console.log(`got key event: ${e.key}`); 
        if (e.key === 'Escape')
        {
            clickOff(); 
        }
    }

    const templates = props.data; 

    const onLoad = (index : number) => {
        console.log('clicked on load!'); 
        clickOff(); 
        props.loadIntoToday(templates[index]); 
    }

    function getNextId() {
        return props.data.reduce((acc, current) => acc.id > current.id ? acc : current, new Template([], 'blank', 0)).id + 1; 
    }

    const addNewTemplate = (name : string) => {
        const next = new Template([], name, getNextId()); 
        // this function should also load that template 
        props.addTemplate(next); 
        // TODO 
        props.loadIntoToday(next); 
    }

    return (
        <div className={css.container} onClick={clickOff}>
            <FontAwesomeIcon icon={faCircleLeft} className={css.back}></FontAwesomeIcon>
            <p className={css.login}>login</p>
            <h2 className={css.todayButton}><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> today</h2>
            <h1>templates</h1>
            <div className={css.buttonContainer}>
                {templates.map((val, index) => 
                    <TemplateButton key={`${val.name}${index}`} {...new TemplateButtonProps(val.name, index, onClicked, selectedIndex, onLoad)}/>
                )}
                <NewTemplateButton {...new NewTemplateButtonProps(addNewTemplate)}/>
            </div>
        </div>
    )
}
