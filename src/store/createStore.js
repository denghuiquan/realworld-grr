import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'

import rootReducer from './reducers/root.reducer'
import rootSga from './sagas/root.saga'

export default () => {
  const sagaMiddleWare = createSagaMiddleWare()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare))
  sagaMiddleWare.run(rootSga)
  return store
}
