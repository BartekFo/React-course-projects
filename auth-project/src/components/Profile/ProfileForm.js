import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './ProfileForm.module.css'
import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const history = useHistory()
  const [passwordInput, setPasswordInput] = useState('')
  const authCtx = useContext(AuthContext)

  const inputHandler = (event) => {
    setPasswordInput(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    // add validation

    fetch(FIREBASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: passwordInput,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!

      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" onChange={inputHandler} value={passwordInput}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
