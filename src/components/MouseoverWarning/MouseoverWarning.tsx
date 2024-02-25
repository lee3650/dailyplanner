import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import css from './MouseoverWarning.module.css' 
import { FC } from "react"

export class MouseoverProps {
    constructor (public message : string) {

    } 
}

export const MouseoverWarning : FC<MouseoverProps> = ({message}) => {
    return (<div className={css.container}>
        <span className={css.icon}><FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
        <div className={css.panel}>
            { message }
        </div>
        </span>
    </div>)
}
