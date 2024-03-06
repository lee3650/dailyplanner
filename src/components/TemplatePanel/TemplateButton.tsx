import React from 'react'
import { FC } from 'react'
import css, { spaceRight } from './TemplatePanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit, faCopy, faCalendar } from '@fortawesome/free-regular-svg-icons'

export class TemplateButtonProps {
    constructor(public label : string, public index : number, public clicked : (index : number) => void, public selectedIndex : number) {

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
            <p>
            <FontAwesomeIcon icon={faCalendar} className={spaceRight}></FontAwesomeIcon>
            Load into today
            </p>
            <p>
            <FontAwesomeIcon icon={faCopy} className={spaceRight}></FontAwesomeIcon>
            Duplicate
            </p>
            <p>
            <FontAwesomeIcon icon={faEdit} className={spaceRight}></FontAwesomeIcon>
            Edit
            </p>
            <div/>
            <p className={css.deleteTemplateBtn}>
            <FontAwesomeIcon icon={faTrashCan} className={spaceRight}></FontAwesomeIcon>
            Delete
            </p>
        </div>
    </div>)
}
