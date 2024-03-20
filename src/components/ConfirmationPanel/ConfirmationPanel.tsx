import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './ConfirmationPanel.module.css'
import { FC } from "react"
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';

export class ConfirmationProps {
    constructor (public text : string, public confirmText : string, public onCancel : () => void, public onConfirm : () => void) {

    }
}

export const ConfirmationPanel : FC<ConfirmationProps> = (props : ConfirmationProps) => {
    return (
        <div className={css.parent}>
            <div className={css.panel}>
                <div className={css.closeBtn} onClick={props.onCancel}>
                    <span className={`${css.line} ${css.left}`}/>
                    <span className={`${css.line} ${css.right}`}/>
                </div>
                <FontAwesomeIcon icon={faCircleInfo} className={css.icon}></FontAwesomeIcon>
                <p className={css.message}>{props.text}</p>
                <br/>
                <br/>
                <span className={`${css.btn} ${css.confirm}`} onClick={props.onConfirm}>{props.confirmText}</span>
                <span className={css.btn} onClick={props.onCancel}>Cancel</span>
            </div>
        </div>
    ); 
}
