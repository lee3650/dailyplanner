import { FC, useState } from 'react'
import css from './LoginPanel.module.css'
import { GUEST_ID, LOGIN_URL } from '../constants';
import axios from 'axios';

export class LoginPanelProps {
    constructor(public setCredentials : (username : string, password : string) => void) {

    }
}

export const LoginPanel : FC<LoginPanelProps> = (props : LoginPanelProps) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    const requestLogin = () => {
        const data = {
            email: email, 
            passwordHash: password
        }

        axios.post(LOGIN_URL, data, {
            headers: {
                Accept: "application/json", 
            }
        })
        .then(response => console.log(JSON.stringify(response.data)))
        .catch(reason => {console.log(JSON.stringify(reason)); setError(reason.message + ": " + reason.response.data)});  
    }

    const requestCreateAccount = () => {

    }

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
                <button onClick={requestLogin}><b>Sign In</b></button>
                <button onClick={requestCreateAccount}><b>Create account</b></button>
                {error == '' ? <></> : <small>{error}</small>}
                <p><b>Forgot password?</b></p>
                <label>Sign in with</label>
                <img src='https://banner2.cleanpng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg' alt='google logo'></img>
                <p onClick={() => props.setCredentials("", "")}><b>Or continue as guest</b></p>
            </div>
        </div>
    )
}
