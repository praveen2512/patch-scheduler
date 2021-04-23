import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import serverReducer from "./components/reducers/serverReducer";
import userReducer from './components/reducers/userReducer';

export const store = createStore(
    combineReducers({serverReducer, userReducer}, applyMiddleware(thunk)) 
)