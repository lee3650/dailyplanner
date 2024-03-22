import { useState } from 'react'
import { FC } from 'react'
import css from './TemplatePanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit, faCopy, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export class TemplateButtonProps {
    constructor(public label : string, public index : number, public clicked : (index : number) => void,
     public selectedIndex : number, public onLoad : (index : number) => void, 
     public onEdit : (index : number) => void, public onDelete : (index : number) => void,
     public onDuplicate : (index : number) => void, public editing : boolean, public onRename : (index : number) => void, 
     public onCancelRename : (index : number) => void, public onSubmitRename : (index : number, name : string) => void) {

    }
}

export const TemplateButton : FC<TemplateButtonProps> = (prop : TemplateButtonProps) => {    
    const [currentName, setCurrentName] = useState(prop.label); 

    const onclick = (e : any) => {
        e.stopPropagation(); 
        prop.clicked(prop.index); 
    }    

    const menuClicked = (e : any) => {
        e.stopPropagation(); 
    }

    const onChange = (e : any) => {
        setCurrentName(e.target.value);
    }

    const onKeyDownContainer = (e : any) => {
        console.log('key down container!'); 
        if (e.key == 'Escape')
        {
            prop.onCancelRename(prop.index); 
        }
    }

    const onKeyDownInInput = (e : any) => {
        e.stopPropagation(); 

        if (e.key == 'Enter')
        {
            if (currentName.length > 0)
            {
                prop.onSubmitRename(prop.index, currentName); 
            } 
            else 
            {
                // todo - show error 
                // it'd be nice to make it shake...? 
            }
        }
        if (e.key == 'Escape')
        {
            // cancel
            prop.onCancelRename(prop.index); 
        }
    }

    return (<div className={`${css.button} ${prop.selectedIndex == prop.index ? css.buttonActive : ''}`} onClick={onclick} tabIndex={9} onKeyDown={onKeyDownContainer}>
        {prop.editing ? <input defaultValue={prop.label} autoFocus onKeyDown={onKeyDownInInput} className={`${currentName.length > 0 ? css.whiteBorder : css.redBorder}`} onChange={onChange}></input> : (<span># {prop.label}</span>)}

        <div className={`${css.leftClickMenu} ${prop.selectedIndex == prop.index && !prop.editing ? css.menuActive : ''}`} onClick={menuClicked}>
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
            <p onClick={() => prop.onRename(prop.index)}>
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
