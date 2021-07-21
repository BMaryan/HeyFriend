import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import LoginReducer from "./login-reducer";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
	form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
