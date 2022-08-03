import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ChatType, CreateChatType, MessageType } from "../types/types";
import { db } from "../firebase";

export const chatAPI = {
  // async setAccounts() {
  //   return await onSnapshot(collection(db, "accounts"), (snapshot) => snapshot.docs);
  // },

  async createChat(data: CreateChatType) {
    const chat = await addDoc(collection(db, "chats"), data);

    await updateDoc(doc(db, "chats", chat.id), { ...data, id: chat.id });

    return chat;
  },

  async addMessage(message: MessageType) {
    const res = await addDoc(collection(db, "messages"), message);

    await updateDoc(doc(db, "messages", res.id), { ...message, id: res.id });
  },

  async updateChat(chat: ChatType) {
    await updateDoc(doc(db, "chats", chat.id), { ...chat });
  },

  async updateMessage(message: MessageType) {
    await updateDoc(doc(db, "messages", message.id), { ...message });
  },

  async deleteChat(chat: ChatType) {
    await deleteDoc(doc(db, "chats", chat.id));
  },

  async deleteMessage(message: MessageType) {
    await deleteDoc(doc(db, "messages", message.id));
  },
};
