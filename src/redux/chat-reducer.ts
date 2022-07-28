import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { FirebaseType, ParticipantsOfChatType } from "./../types/types";
import { ChatType, MessageType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { chatAPI } from "../api/chat-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_CHATS = "heyfriend/chatPage/SET_CHATS";
const SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";

const initialState = { chats: [] as Array<FirebaseType<ChatType>>, messages: [] as Array<FirebaseType<MessageType>> };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof chatActions>;

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

// actions
export const chatActions = {
  setChats: (chats: Array<FirebaseType<ChatType>>) => ({ type: SET_CHATS, chats } as const),
  setMessages: (messages: Array<FirebaseType<MessageType>>) => ({ type: SET_MESSAGES, messages } as const),
};

// thunk
export const setChatsThunk = (): ThunkAction<Promise<DocumentData<ChatType>>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "chats"), (snapshot) => dispatch(chatActions.setChats(snapshot.docs)));

export const setMessagesThunk = (): ThunkAction<Promise<DocumentData<MessageType>>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "messages"), (snapshot) => dispatch(chatActions.setMessages(snapshot.docs)));

export const createChatThunk =
  (participants: Array<ParticipantsOfChatType>): ThunkAction<Promise<any>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.createChat(participants);

export const addMessageThunk =
  (message: MessageType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.addMessage(message);

export const updateChatThunk =
  (chat: ChatType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.updateChat(chat);

export const updateMessageThunk =
  (message: MessageType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.updateMessage(message);

export const deleteMessageThunk =
  (message: MessageType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.deleteMessage(message);

export default ChatReducer;
