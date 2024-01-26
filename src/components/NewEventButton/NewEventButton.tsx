import React from "react";
import ne from './NewEventButton.module.css'

export class NewEventButtonProps {
    constructor(public editing : boolean, public onSubmit : (value : string) => void, public onCancel : () => void, public onClick : () => void)
    {

    }
}

const NewEventButton : React.FC<NewEventButtonProps> = ( props : NewEventButtonProps) => {    
    return (
        <div className={ne.addNew}>
            {props.editing ? 
            (<form onSubmit={e => {
                    e.preventDefault(); 
                    /*@ts-ignore*/
                    props.onSubmit(e.target[0].value)
                }}>
                <input autoFocus type='text' defaultValue='' onBlur={() => props.onCancel()}/> 
            </form>)  
            : (<p onClick={props.onClick}>+ new event</p>)}
        </div>)
}

export default NewEventButton; 


