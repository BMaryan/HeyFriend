import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import ProfileReducer from "./profile-reducer";

let reducers = combineReducers({
	profilePage: ProfileReducer,
	form: formReducer,
	auth: AuthReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
