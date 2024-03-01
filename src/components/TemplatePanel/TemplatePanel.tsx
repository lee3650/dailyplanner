import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './TemplatePanel.module.css'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { TemplateButton, TemplateLabel } from './TemplateButton'
import { NewTemplateButton } from './NewTemplateButton'

export const TemplatePanel = () => {
    return (
        <div className={css.container}>
            <FontAwesomeIcon icon={faCircleLeft} className={css.back}></FontAwesomeIcon>
            <p className={css.login}>login</p>
            <h1>templates</h1>
            <div className={css.buttonContainer}>
                <TemplateButton {...new TemplateLabel('blank')}/>
                <TemplateButton {...new TemplateLabel('example')}/>
                <TemplateButton {...new TemplateLabel('abcdefg')}/>
                <TemplateButton {...new TemplateLabel('example')}/>
                <NewTemplateButton/>
            </div>
        </div>
    )
}
