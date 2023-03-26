import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import articleReducer from './article.reducer'

export default combineReducers({ authReducer, articleReducer })
