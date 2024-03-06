import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import css from './TemplatePanel.module.css'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { TemplateButton, TemplateButtonProps } from './TemplateButton'
import { NewTemplateButton } from './NewTemplateButton'

export const TemplatePanel = () => {
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

    return (
        <div className={css.container} onClick={clickOff}>
            <FontAwesomeIcon icon={faCircleLeft} className={css.back}></FontAwesomeIcon>
            <p className={css.login}>login</p>
            <h1>templates</h1>
            <div className={css.buttonContainer}>
                <TemplateButton {...new TemplateButtonProps('blank', 0, onClicked, selectedIndex)}/>
                <TemplateButton {...new TemplateButtonProps('example', 1, onClicked, selectedIndex)}/>
                <TemplateButton {...new TemplateButtonProps('abcdefg', 2, onClicked, selectedIndex)}/>
                <TemplateButton {...new TemplateButtonProps('example', 3, onClicked, selectedIndex)}/>
                <NewTemplateButton/>
            </div>
        </div>
    )
}
