import { all } from 'redux-saga/effects'
import articleSaga from './article.saga'
import authSaga from './auth.saga'

export default function* rootSga () {
  yield all([authSaga(), articleSaga()])
}
