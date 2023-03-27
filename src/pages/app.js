import React from 'react'
import { Router } from '@reach/router'
import Profile from '../components/profile'
import Setting from '../components/setting'
import CreateOrEditArticle from '../components/createOrEditArticle'
import PrivateRoute from '../components/PrivateRoute'
import NotFound from './404'

export default function App () {
  return (
    <Router basepath='/app'>
      <Profile path='/profile/:username' />
      <PrivateRoute path='/setting' component={Setting} />
      <PrivateRoute path='/article/create' component={CreateOrEditArticle} />
      <PrivateRoute path='/article/edit' component={CreateOrEditArticle} />
    </Router>
  )
}
