import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
