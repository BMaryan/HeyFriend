import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import AccountReducer from "./account-reducer";
import AuthReducer from "./auth-reducer";
import ChatReducer from "./chat-reducer";
import PostPage from "./post-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  accountPage: AccountReducer,
  chatPage: ChatReducer,
  postPage: PostPage,
  form: formReducer,
  auth: AuthReducer,
});

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export default store;
