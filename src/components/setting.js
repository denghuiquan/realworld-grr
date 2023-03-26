import { navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'

export default function Setting () {
  const [isLoading, setIsLoading] = useState(false)
  const authReducer = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
  useInput
  const email = useInput(authReducer.user?.email)
  const password = useInput(authReducer.user?.password)
  const username = useInput(authReducer.user?.username)
  const image = useInput(authReducer.user?.image)
  const bio = useInput(authReducer.user?.bio)

  function handleUpdate (e) {
    e.preventDefault()
    const passwordValue = password.input.value
    const emailValue = email.input.value
    const usernameValue = username.input.value
    const imageValue = image.input.value
    const bioValue = bio.input.value

    setIsLoading(true)

    dispatch({
      type: 'updateProfile',
      payload: {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        image: imageValue,
        bio: bioValue
      }
    })
  }

  if (authReducer.success) {
    if (isLoading) {
      console.log('update Success')
      setIsLoading(false)
      navigate(`/app/profile/${authReducer.user.username}`)
      return null
    }
  }

  function logout () {
    localStorage.removeItem('token')
    dispatch({
      type: 'resetFields',
      payload: {}
    })
    navigate('/login')
  }

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    {...image.input}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    {...username.input}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows={8}
                    placeholder='Short bio about you'
                    {...bio.input}
                  />
                </fieldset>
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
                  onClick={handleUpdate}
                  className='btn btn-lg btn-primary pull-xs-right'
                >
                  {isLoading && <i className='ion-refresh' />}
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button onClick={logout} className='btn btn-outline-danger'>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
