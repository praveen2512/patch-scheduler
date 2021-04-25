import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import serverReducer from "./components/reducers/serverReducer";
import authReducer from './components/reducers/authReducer';

// export const store = createStore(
//     combineReducers({serverReducer, authReducer}, applyMiddleware(thunk)) 
// )

const middlewareEnhancer = applyMiddleware(thunk)
const composedEnhancers = compose(middlewareEnhancer)

export const store = createStore(
    combineReducers({serverReducer, authReducer}),
    composedEnhancers
)
