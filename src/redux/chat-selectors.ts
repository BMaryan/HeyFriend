import { StateType } from "./store";

export const getChatsSelector = (state: StateType) => state.chatPage.chats;

export const getMessagesSelector = (state: StateType) => state.chatPage.messages;

export const setLoadingSelector = (state: StateType) => state.chatPage.loading;

export const setErrorSelector = (state: StateType) => state.chatPage.error;
