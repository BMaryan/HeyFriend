import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

let SET_CHATS = "heyfriend/chatPage/SET_CHATS";
let SET_MESSAGES = "heyfriend/chatPage/SET_MESSAGES";
let CREATE_CHAT = "heyfriend/chatPage/CREATE_CHAT";
let ADD_MESSAGE = "heyfriend/chatPage/ADD_MESSAGE";

let initialState = {
  chats: [],
  messages: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS: {
      return {
        ...state,
        chats: action.chats,
      };
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }
    case CREATE_CHAT: {
      let newChat = action.chat;

      return {
        ...state,
        chats: state?.chats?.length > 0 ? [...state.chats, { ...newChat }] : [{ ...newChat }],
      };
    }
    case ADD_MESSAGE: {
      let newMessage = { ...action.message };

      return {
        ...state,
        messages: state?.messages?.length > 0 ? [...state.messages, { ...newMessage }] : [{ ...newMessage }],
      };
    }
    default: {
      return state;
    }
  }
};

export const setChats = (chats) => ({ type: SET_CHATS, chats });

export const setMessages = (messages) => ({ type: SET_MESSAGES, messages });

export const createChat = (chat) => ({ type: CREATE_CHAT, chat });

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });

// thunk
export const setChatsThunk = () => async (dispatch) => await onSnapshot(collection(db, "chats"), (snapshot) => dispatch(setChats(snapshot.docs)));

export const setMessagesThunk = () => async (dispatch) => await onSnapshot(collection(db, "messages"), (snapshot) => dispatch(setMessages(snapshot.docs)));

export const createChatThunk = (chat) => async (dispatch) => {
  let promise = await addDoc(collection(db, "chats"), chat);

  await updateDoc(doc(db, "chats", promise.id), { ...chat, id: promise.id });

  // dispatch(createChat({ ...chat, id: promise.id }));

  return promise;
};

export const addMessageThunk = (message) => async (dispatch) => {
  await addDoc(collection(db, "messages"), message);

  // dispatch(addMessage(message));
};

export default ChatReducer;
