import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import serverReducer from "./components/reducers/serverReducer";
import userReducer from './components/reducers/userReducer';

// export const store = createStore(
//     combineReducers({serverReducer, userReducer}, applyMiddleware(thunk)) 
// )




const middlewareEnhancer = applyMiddleware(thunk)
const composedEnhancers = compose(middlewareEnhancer);
export const store = createStore(
    combineReducers({serverReducer, userReducer}),
    composedEnhancers
)
