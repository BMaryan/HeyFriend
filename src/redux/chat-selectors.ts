import { StateType } from "./store";

export const getChatsSelector = (state: StateType) => state.chatPage.chats;

export const getMessagesSelector = (state: StateType) => state.chatPage.messages;

export const setChatsLoadingSelector = (state: StateType) => state.chatPage.chatsLoading;

export const setMessagesLoadingSelector = (state: StateType) => state.chatPage.messagesLoading;

export const setErrorSelector = (state: StateType) => state.chatPage.error;
