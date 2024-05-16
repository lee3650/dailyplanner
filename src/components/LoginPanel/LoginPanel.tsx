import { FC, useState } from 'react'
import css from './LoginPanel.module.css'
import { GUEST_ID } from '../constants';

export class LoginPanelProps {
    constructor(public setUserId : (val : number) => void) {

    }
}

export const LoginPanel : FC<LoginPanelProps> = (props : LoginPanelProps) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    return (
        <div className={css.container}>
            <div className={css.panel}>
                <div className={css.logo}>
                <b>禅</b>
                </div>
                <h1>daily planner</h1>
                <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
                {/* TODO lol */}
                <button onClick={() => props.setUserId(email.length)}><b>Sign In</b></button>
                <button onClick={() => props.setUserId(email.length)}><b>Create account</b></button>
                <p><b>Forgot password?</b></p>
                <label>Sign in with</label>
                <img src='https://banner2.cleanpng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg' alt='google logo'></img>
                <p onClick={() => props.setUserId(GUEST_ID)}><b>Or continue as guest</b></p>
            </div>
        </div>
    )
}
