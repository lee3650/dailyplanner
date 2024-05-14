import css from './LoginPanel.module.css'

export const LoginPanel = () => {
    return (
        <div className={css.container}>
            <div className={css.panel}>
                <div className={css.logo}>
                <b>禅</b>
                </div>
                <h1>daily planner</h1>
                <input type="email" placeholder='email'/>
                <br/>
                <input type="password" placeholder='password'/>
                <br/>
                <button><b>Sign In</b></button>
                <p><b>Forgot password?</b></p>
                <label>Sign in with</label>
                <img src='https://banner2.cleanpng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg' alt='google logo'></img>
                <p><b>Or continue as guest</b></p>
            </div>
        </div>
    )
}