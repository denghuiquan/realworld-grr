import { takeEvery, put } from 'redux-saga/effects'
import { login, getCurrentUser, updateUser } from '../../endpoints'

function* login_async ({ payload }) {
  try {
    const { data } = yield login(payload)
    localStorage.setItem('token', data.user.token)
    yield put({ type: 'loginSuccess', payload: data.user })
  } catch (ex) {
    const messages = []
    const errors = ex.response.data.errors
    for (let attr in errors) {
      for (let i = 0; i < errors[attr].length; i++) {
        messages.push(`${attr} ${errors[attr][i]}`)
      }
    }
    yield put({ type: 'loginFailed', payload: messages })
  }
}

function* register ({ payload }) {
  try {
    const { data } = yield axios.post('/users', payload)
    localStorage.setItem('token', data.user.token)
    yield put({ type: 'registerSuccess', payload: data.user })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'registerFailed', payload: message })
  }
}

function* loadUser ({ payload }) {
  try {
    const { data } = yield getCurrentUser(payload)
    // localStorage.setItem('token', data.user.token)
    yield put({ type: 'loadUserSuccess', payload: data.user })
  } catch (ex) {
    // const messages = []
    // const errors = ex.response.data.errors
    // for (let attr in errors) {
    //   for (let i = 0; i < errors[attr].length; i++) {
    //     messages.push(`${attr} ${errors[attr][i]}`)
    //   }
    // }
    const message = ex.response.data.message
    yield put({ type: 'loadUserFailed', payload: message })
  }
}

function* updateProfile ({ payload }) {
  try {
    const { data } = yield updateUser(payload)
    localStorage.setItem('token', data.user.token)
    yield put({ type: 'updateSuccess', payload: data.user })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'updateFailed', payload: message })
  }
}

export default function* authSaga () {
  yield takeEvery('login', login_async)
  yield takeEvery('register', register)
  yield takeEvery('loadUser', loadUser)
  yield takeEvery('updateProfile', updateProfile)
}
