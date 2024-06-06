import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useState } from 'react'
import css from './TemplatePanel.module.css'
import { faCalendar, faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { TemplateButton, TemplateButtonProps } from './TemplateButton'
import { NewTemplateButton, NewTemplateButtonProps } from './NewTemplateButton'
import { Template } from '../../model/Template'
import { ConfirmationPanel, ConfirmationProps } from '../ConfirmationPanel/ConfirmationPanel'

export class TemplatePanelProps {
    constructor(public data : Template[], public loadIntoToday : (template : Template) => void, public addTemplate : (toAdd : string) => void, 
    public deleteTemplate : (index : number) => void, public editTemplate : (index : number) => void, public viewToday : () => void, 
    public todayBlank : boolean, public onDuplicate : (index : number) => void, 
    public renameTemplate : (index : number, val : string) => void) {

    }
}

export const TemplatePanel : FC<TemplatePanelProps> = (props : TemplatePanelProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1); 
    const [toDeleteIdx, setToDeleteIdx] = useState(-1); 
    const [toLoadIdx, setToLoadIdx] = useState(-1); 
    const [toRenameIdx, setToRenameIdx] = useState(-1); 
    const [editNameIdx, setEditNameIdx] = useState(-1); 

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

        if (props.todayBlank) 
        {
            props.loadIntoToday(templates[index]); 
        }
        else {
            setToLoadIdx(index); 
        }
    }

    const onConfirmLoad = () => {
        props.loadIntoToday(templates[toLoadIdx]); 
        setToLoadIdx(-1); 
    }

    const cancelLoad = () => {
        setToLoadIdx(-1);     
    }

    const addNewTemplate = (name : string) => {
        // this function should also load that template 
        props.addTemplate(name); 
    }

    const onEdit = (val : number) => {
        clickOff(); 
        props.editTemplate(val); 
    }

    const onDelete = (val : number) => {
        setToDeleteIdx(val); 
        clickOff();
    }

    const cancelDelete = () => {
        setToDeleteIdx(-1); 
    }

    const doDelete = () => {
        clickOff(); 
        props.deleteTemplate(toDeleteIdx); 
        setToDeleteIdx(-1); 
    }

    const onDuplicate = (val : number) => {
        clickOff(); 
        props.onDuplicate(val); 
    }

    const onRename = (val : number) => {
        setEditNameIdx(val); 
    }

    const onSubmitRename = (index : number, val : string) => {
        clickOff(); 
        setEditNameIdx(-1); 

        // todo... set new name of template..
        props.renameTemplate(index, val); 
    }

    const onCancelRename = (index : number) => {
        setEditNameIdx(-1); 
        clickOff(); 
    }

    const onClickToday = () => {
        props.viewToday(); 
    }

    return (
        <div className={css.panel}>
            {toLoadIdx >= 0 ? <ConfirmationPanel {...new ConfirmationProps(`Loading the template "${templates[toLoadIdx].name}"
             will overwrite the contents of "today", are you sure you want to do this?`, "Overwrite", cancelLoad, onConfirmLoad)}/> : <></>}
            {toDeleteIdx >= 0 ? <ConfirmationPanel {...new ConfirmationProps(`Are you sure you want to delete the template "${templates[toDeleteIdx].name}"?`, "Delete", cancelDelete, doDelete)}/> : <></>}
            <div className={css.container} onClick={clickOff}>
                <FontAwesomeIcon icon={faCircleLeft} className={css.back}></FontAwesomeIcon>
                <p className={css.login}>login</p>
                <h2 onClick={onClickToday} className={css.todayButton}><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> today</h2>
                <h1>templates</h1>
                <div className={css.buttonContainer}>
                    {templates.map((val, index) =>
                        <TemplateButton key={`${val.name}${index}`} {...new TemplateButtonProps(val.name, index, onClicked, selectedIndex, onLoad,
                             onEdit, onDelete, onDuplicate, index == editNameIdx, onRename, onCancelRename, onSubmitRename)} />
                    )}
                    <NewTemplateButton {...new NewTemplateButtonProps(addNewTemplate)} />
                </div>
            </div>
        </div>
    )
}
