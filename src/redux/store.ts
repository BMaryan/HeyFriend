import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import ProfileReducer from "./profile-reducer";
import AuthReducer from "./auth-reducer";
import ChatReducer from "./chat-reducer";
import PostPage from "./post-reducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  profilePage: ProfileReducer,
  chatPage: ChatReducer,
  postPage: PostPage,
  form: formReducer,
  auth: AuthReducer,
});

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
