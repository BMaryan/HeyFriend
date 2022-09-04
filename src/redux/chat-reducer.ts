import { CreateChatType, FirebaseType } from "./../types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { ChatType, MessageType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { chatAPI } from "../api/chat-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_CHATS = "heyfriend/chatPage/SET_CHATS";
const SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";
const SET_SUCCESS = "heyfriend/chatPage/SET_SUCCESS";
const SET_CHATS_LOADING = "heyfriend/chatPage/SET_CHATS_LOADING";
const SET_MESSAGES_LOADING = "heyfriend/chatPage/SET_MESSAGES_LOADING";
const SET_ERROR = "heyfriend/chatPage/SET_ERROR";

const initialState = { chats: [] as Array<FirebaseType<ChatType>>, messages: [] as Array<FirebaseType<MessageType>>, error: null as any | null, chatsLoading: false, messagesLoading: false };

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
    case SET_CHATS_LOADING: {
      return { ...state, chatsLoading: action.loading };
    }
    case SET_MESSAGES_LOADING: {
      return { ...state, messagesLoading: action.loading };
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
  setChatsLoading: (loading: boolean) => ({ type: SET_CHATS_LOADING, loading } as const),
  setMessagesLoading: (loading: boolean) => ({ type: SET_MESSAGES_LOADING, loading } as const),
  setError: (error: any) => ({ type: SET_ERROR, error } as const),
};

// thunk
export const setChatsThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(chatActions.setChatsLoading(true));

  try {
    onSnapshot(collection(db, "chats"), (snapshot: any) => {
      const res = dispatch(chatActions.setChats(snapshot.docs));
      if (res) dispatch(chatActions.setChatsLoading(false));
    });

    dispatch(chatActions.setSuccess());
  } catch (error: any) {
    dispatch(chatActions.setError(error));
    dispatch(chatActions.setChatsLoading(false));
  }
};

export const setMessagesThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(chatActions.setMessagesLoading(true));

  try {
    await onSnapshot(collection(db, "messages"), (snapshot: any) => {
      const res = dispatch(chatActions.setMessages(snapshot.docs));
      if (res) dispatch(chatActions.setMessagesLoading(false));
    });

    await dispatch(chatActions.setSuccess());
  } catch (error: any) {
    dispatch(chatActions.setError(error));
    dispatch(chatActions.setMessagesLoading(false));
  }
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
