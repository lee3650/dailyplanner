import React from 'react'
import { FC } from 'react'
import css from './TemplatePanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export class TemplateLabel {
    constructor(public label : string) {

    }
}

export const TemplateButton : FC<TemplateLabel> = (prop : TemplateLabel) => {
    return (<div className={css.button}>
        # {prop.label}
        <FontAwesomeIcon icon={faTrashCan} className={css.deleteTemplateBtn}></FontAwesomeIcon>
    </div>)
}
