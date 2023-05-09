import {combineReducers} from 'redux'
import { contactReducer } from './contactReducer'
import {editReducer} from './editReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
    contactReducer,editReducer,authReducer
})