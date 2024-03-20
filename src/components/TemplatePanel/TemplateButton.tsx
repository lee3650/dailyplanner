import React from 'react'
import { FC } from 'react'
import css from './TemplatePanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit, faCopy, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faLetterboxd } from '@fortawesome/free-brands-svg-icons'
import { faChalkboard, faPen } from '@fortawesome/free-solid-svg-icons'

export class TemplateButtonProps {
    constructor(public label : string, public index : number, public clicked : (index : number) => void,
     public selectedIndex : number, public onLoad : (index : number) => void, 
     public onEdit : (index : number) => void, public onDelete : (index : number) => void,
     public onDuplicate : (index : number) => void) {

    }
}

export const TemplateButton : FC<TemplateButtonProps> = (prop : TemplateButtonProps) => {    
    const onclick = (e : any) => {
        e.stopPropagation(); 
        prop.clicked(prop.index); 
    }    

    const menuClicked = (e : any) => {
        e.stopPropagation(); 
    }

    return (<div className={`${css.button} ${prop.selectedIndex == prop.index ? css.buttonActive : ''}`} onClick={onclick}>
        # {prop.label}

        <div className={`${css.leftClickMenu} ${prop.selectedIndex == prop.index ? css.menuActive : ''}`} onClick={menuClicked}>
            <p onClick={() => prop.onLoad(prop.index)}>
            <FontAwesomeIcon icon={faCalendar} className={css.spaceRight}></FontAwesomeIcon>
            Load into today
            </p>
            <p onClick={() => prop.onDuplicate(prop.index)}>
            <FontAwesomeIcon icon={faCopy} className={css.spaceRight}></FontAwesomeIcon>
            Duplicate
            </p>
            <p onClick={() => prop.onEdit(prop.index)}>
            <FontAwesomeIcon icon={faEdit} className={css.spaceRight}></FontAwesomeIcon>
            Edit
            </p>
            <p>
            <FontAwesomeIcon icon={faPen} className={css.spaceRight}></FontAwesomeIcon>
            Rename
            </p>
            <div/>
            <p className={css.deleteTemplateBtn} onClick={() => prop.onDelete(prop.index)}>
            <FontAwesomeIcon icon={faTrashCan} className={css.spaceRight}></FontAwesomeIcon>
            Delete
            </p>
        </div>
    </div>)
}
