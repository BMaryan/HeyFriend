import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { ParticipantsOfChatType } from "./../types/types";
import { ChatType, MessageType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { StateType } from "./store";
import { db } from "../firebase";

const SET_CHATS = "heyfriend/chatPage/SET_CHATS";
const SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";

const initialState = { chats: [] as Array<ChatType>, messages: [] as Array<MessageType> };

export type InitialStateType = typeof initialState;
type ActionsType = SetChatsActionType | SetMessagesActionType;

const ChatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_CHATS: {
      return { ...state, chats: [...action.chats] };
    }
    case SET_MESSAGES: {
      return { ...state, messages: [...action.messages] };
    }
    default: {
      return state;
    }
  }
};

type SetChatsActionType = { type: typeof SET_CHATS; chats: Array<ChatType> };

export const setChats = (chats: Array<ChatType>): SetChatsActionType => ({ type: SET_CHATS, chats });

type SetMessagesActionType = { type: typeof SET_MESSAGES; messages: Array<MessageType> };

export const setMessages = (messages: Array<MessageType>): SetMessagesActionType => ({ type: SET_MESSAGES, messages });

// thunk
export const setChatsThunk = (): ThunkAction<Promise<object>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "chats"), (snapshot) => dispatch(setChats(snapshot.docs)));

export const setMessagesThunk = (): ThunkAction<Promise<object>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "messages"), (snapshot) => dispatch(setMessages(snapshot.docs)));

export const createChatThunk =
  (participants: ParticipantsOfChatType): ThunkAction<Promise<object>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    let chat = await addDoc(collection(db, "chats"), participants);

    await updateDoc(doc(db, "chats", chat.id), { ...participants, id: chat.id });

    return chat;
  };

export const addMessageThunk =
  (message: MessageType): ThunkAction<Promise<object>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    await addDoc(collection(db, "messages"), message);

export const updateChatThunk =
  (chat: ChatType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    let res = await getDoc(doc(db, "chats", chat.id));

    await updateDoc(doc(db, "chats", chat.id), { ...chat, id: res.id });
  };

export default ChatReducer;
