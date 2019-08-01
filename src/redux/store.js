import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {initData} from './Reducer/apiRequestReducer'
import { changePicker } from './Reducer/userBehaviorReducer'

const rootReducer = combineReducers({initData, changePicker})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))