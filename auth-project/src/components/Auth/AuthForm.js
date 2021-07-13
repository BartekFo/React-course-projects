import { useReducer, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import classes from './AuthForm.module.css'
import AuthContext from '../../store/auth-context'

const singUpUrl = FIREBASE_URL1
const loginUrl = FIREBASE_URL2

const initialState = {
  isLogin: true,
  isLoading: false,
  emailInput: '',
  passwordInput: '',
  isErrorSet: false,
  errorMessage: ''
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_LOGIN':
      return {
        ...state,
        isLogin: !state.isLogin,
      }
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'ADD_EMAIL':
      return {
        ...state,
        emailInput: action.payload,
      }
    case 'ADD_PASSWORD':
      return {
        ...state,
        passwordInput: action.payload,
      }
    case 'SET_IS_ERROR_SET':
      return {
        ...state,
        isErrorSet: action.payload
      }
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload
      }
    default: {
      return state
    }
  }
}

const AuthForm = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(formReducer, initialState)

  const { isLogin, emailInput, passwordInput, isErrorSet, errorMessage, isLoading } = state

  const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    dispatch({ type: 'SET_IS_LOGIN' })
  }

  const loginInputHandler = (event) => {
    dispatch({ type: 'ADD_EMAIL', payload: event.target.value })
  }

  const passwordInputHandler = (event) => {
    dispatch({ type: 'ADD_PASSWORD', payload: event.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    // optional: Add validation

    dispatch({ type: 'SET_IS_LOADING', payload: true })
    let url
    if (isLogin) {
      url = loginUrl
    } else {
      url = singUpUrl
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({ type: 'SET_IS_LOADING', payload: false })
    if (response.ok) {
      dispatch({ type: 'SET_IS_ERROR_SET', payload: false })
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' })
      const data = await response.json()
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime)
      history.replace('/')
    } else {
      const data = await response.json()
      let errorMessage = 'Authentication failed!'
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message
        // show an error modal
        dispatch({ type: 'SET_IS_ERROR_SET', payload: true })
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage })
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" onChange={loginInputHandler} value={emailInput} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" onChange={passwordInputHandler} value={passwordInput} required/>
        </div>
        {isErrorSet && <div className={classes.actions}><p className={classes.error}>{errorMessage}</p></div>}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
