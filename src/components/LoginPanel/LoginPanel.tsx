import css from './LoginPanel.module.css'

export const LoginPanel = () => {
    return (
        <div className={css.container}>
            <div className={css.panel}>
                <h3>daily planner</h3>
                <input type="text" placeholder='email'/>
                <input type="text" placeholder='password'/>
                <button>Sign In</button>
                <p>Forgot password?</p>
                <p>Sign in with</p>
                <p>Or continue as guest</p>
            </div>
        </div>
    )
}