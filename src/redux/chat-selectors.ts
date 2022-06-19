import { StateType } from "./store";

export const getChatsSelector = (state: StateType) => state.chatPage.chats;

export const getMessagesSelector = (state: StateType) => state.chatPage.messages;
