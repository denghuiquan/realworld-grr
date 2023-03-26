import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'

export default function Header () {
  const authReducer = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token && token !== '') {
      dispatch({
        type: 'loadUser',
        payload: token
      })
    }
  }, [])

  if (authReducer.message) {
    console.log(`获取用户失败：${authReducer.message}`)
  }

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand' href='index.html'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            {/* Add "active" class when you're on that page" */}
            <Link to='/' className='nav-link active'>
              Home
            </Link>
          </li>
          {authReducer.success ? <AuthNavLinks /> : <WithoutAuthNavLinks />}
          {authReducer.user && <UserNavLink user={authReducer.user} />}
        </ul>
      </div>
    </nav>
  )
}

function UserNavLink ({ user }) {
  return (
    <li className='nav-item'>
      <Link
        className='nav-link ng-binding'
        ui-sref-active='active'
        to={`/app/profile/${user.username}`}
      >
        <img className='user-pic' src={user.image} />
        {user.username}
      </Link>
    </li>
  )
}

function AuthNavLinks () {
  return (
    <>
      <li className='nav-item'>
        <Link to={`/app/article/create`} className='nav-link'>
          {' '}
          <i className='ion-compose' />
          &nbsp;New Article{' '}
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/app/setting' className='nav-link'>
          {' '}
          <i className='ion-gear-a' />
          &nbsp;Settings{' '}
        </Link>
      </li>
    </>
  )
}

function WithoutAuthNavLinks (props) {
  return (
    <>
      <li className='nav-item'>
        <Link to='/login?type=signin' className='nav-link'>
          Sign in
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login?type=signup' className='nav-link'>
          Sign up
        </Link>
      </li>
    </>
  )
}
