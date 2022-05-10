import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import ProfileReducer from "./profile-reducer";
import ChatReducer from "./chat-reducer";
import PostPage from "./post-reducer";

let reducers = combineReducers({
  profilePage: ProfileReducer,
  chatPage: ChatReducer,
  postPage: PostPage,
  form: formReducer,
  auth: AuthReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
