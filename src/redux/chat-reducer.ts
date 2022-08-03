import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { CreateChatType, FirebaseType, ParticipantsOfChatType } from "./../types/types";
import { ChatType, MessageType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { chatAPI } from "../api/chat-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_CHATS = "heyfriend/chatPage/SET_CHATS";
const SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";
const SET_SUCCESS = "heyfriend/chatPage/SET_SUCCESS";
const SET_LOADING = "heyfriend/chatPage/SET_LOADING";
const SET_ERROR = "heyfriend/chatPage/SET_ERROR";

const initialState = { chats: [] as Array<FirebaseType<ChatType>>, messages: [] as Array<FirebaseType<MessageType>>, error: null as any | null, loading: false };

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
    case SET_SUCCESS: {
      return { ...state, error: null };
    }
    case SET_LOADING: {
      return { ...state, loading: action.loading };
    }
    case SET_ERROR: {
      return { ...state, error: action.error?.message };
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
  setSuccess: () => ({ type: SET_SUCCESS } as const),
  setLoading: (loading: boolean) => ({ type: SET_LOADING, loading } as const),
  setError: (error: any) => ({ type: SET_ERROR, error } as const),
};

// thunk
export const setChatsThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(chatActions.setLoading(true));

  try {
    await onSnapshot(collection(db, "chats"), (snapshot) => dispatch(chatActions.setChats(snapshot.docs)));
    dispatch(chatActions.setSuccess());
  } catch (error: any) {
    dispatch(chatActions.setError(error));
  }

  dispatch(chatActions.setLoading(false));
};

export const setMessagesThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(chatActions.setLoading(true));

  try {
    await onSnapshot(collection(db, "messages"), (snapshot) => dispatch(chatActions.setMessages(snapshot.docs)));
    dispatch(chatActions.setSuccess());
  } catch (error: any) {
    dispatch(chatActions.setError(error));
  }

  dispatch(chatActions.setLoading(false));
};

export const createChatThunk =
  (data: CreateChatType): ThunkAction<Promise<any>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.createChat(data);

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

export const deleteChatThunk =
  (chat: ChatType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.deleteChat(chat);

export const deleteMessageThunk =
  (message: MessageType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    chatAPI.deleteMessage(message);

export default ChatReducer;
