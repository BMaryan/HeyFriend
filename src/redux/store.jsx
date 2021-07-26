import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./auth-reducer";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
	form: formReducer,
	auth: AuthReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
