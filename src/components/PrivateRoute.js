import React from 'react'
import { navigate } from 'gatsby'
import useLogin from '../hooks/useLogin'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { status } = useLogin()
  if (status.requesting) return null
  if (status.done) return <Component location={location} {...rest} />

  navigate(`/login?redirect=${location.pathname}`)
  return null
}

export default PrivateRoute
