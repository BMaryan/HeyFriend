import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatType, MessageType } from "../types/types";

let SET_CHATS = "heyfriend/chatPage/SET_CHATS";
let SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";

let initialState = { chats: [] as Array<ChatType>, messages: [] as Array<MessageType> };

export type InitialStateType = typeof initialState;

const ChatReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_CHATS: {
      return { ...state, chats: action.chats };
    }
    case SET_MESSAGES: {
      return { ...state, messages: action.messages };
    }
    default: {
      return state;
    }
  }
};

type SetChatsActionType = { type: typeof SET_CHATS; chats: Array<ChatType> };

export const setChats = (chats: Array<ChatType>): SetChatsActionType => ({ type: SET_CHATS, chats });

type SetMessagesActionType = { type: typeof SET_CHATS; messages: Array<MessageType> };

export const setMessages = (messages: Array<MessageType>): SetMessagesActionType => ({ type: SET_MESSAGES, messages });

// thunk
export const setChatsThunk = () => async (dispatch: any) => await onSnapshot(collection(db, "chats"), (snapshot: any) => dispatch(setChats(snapshot.docs)));

export const setMessagesThunk = () => async (dispatch: any) => await onSnapshot(collection(db, "messages"), (snapshot: any) => dispatch(setMessages(snapshot.docs)));

export const createChatThunk = (chat: ChatType) => async (dispatch: any) => {
  let promise = await addDoc(collection(db, "chats"), chat);

  await updateDoc(doc(db, "chats", promise.id), { ...chat, id: promise.id });

  return promise;
};

export const addMessageThunk = (message: MessageType) => async (dispatch: any) => await addDoc(collection(db, "messages"), message);

export default ChatReducer;
