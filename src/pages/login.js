import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import authReducer from '../store/reducers/auth.reducer'
import queryString from 'query-string'

export default function Login ({ location }) {
  const [isLoading, setIsLoading] = useState(false)
  const { type, redirect } = queryString.parse(location.search)

  const dispatch = useDispatch()
  const authReducer = useSelector(state => state.authReducer)
  const email = useInput('')
  const password = useInput('')
  const username = useInput('')

  if (authReducer.success) {
    if (isLoading) {
      setIsLoading(false)
      redirect ? navigate(redirect) : navigate('/')
      return null
    }
  }

  function ErrorTips ({ errors }) {
    if (errors) {
      return (
        <ul className='error-messages'>
          {errors.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    }
    return null
  }

  function handleSubmit (e) {
    e.preventDefault()
    const passwordValue = password.input.value
    const emailValue = email.input.value
    const usernameValue = username.input.value

    setIsLoading(true)
    // todo: validate these value

    switch (type) {
      case 'signup':
        dispatch({
          type: 'register',
          payload: {
            user: {
              username: usernameValue,
              email: emailValue,
              password: passwordValue
            }
          }
        })
        break

      default:
        dispatch({
          type: 'login',
          payload: { user: { email: emailValue, password: passwordValue } }
        })
        break
    }
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>
              {type !== 'signup' ? 'Sign in' : 'Sign up'}
            </h1>
            {type === 'signup' && (
              <p className='text-xs-center'>
                <Link to='/login?type=signin'>Have an account?</Link>
              </p>
            )}
            <ErrorTips errors={authReducer.errors} />
            <form onSubmit={handleSubmit}>
              {type === 'signup' && (
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    {...username.input}
                  />
                </fieldset>
              )}
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                  {...email.input}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  {...password.input}
                />
              </fieldset>
              <button
                disabled={isLoading}
                className='btn btn-lg btn-primary pull-xs-right'
              >
                {isLoading && <i className='ion-refresh' />}
                {type !== 'signup' ? 'Sign in' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
