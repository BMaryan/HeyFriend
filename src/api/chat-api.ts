import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ChatType, MessageType, ParticipantsOfChatType } from "../types/types";
import { db } from "../firebase";

export const chatAPI = {
  // async setAccounts() {
  //   return await onSnapshot(collection(db, "accounts"), (snapshot) => snapshot.docs);
  // },

  async createChat(participants: Array<ParticipantsOfChatType>) {
    const chat = await addDoc(collection(db, "chats"), { participants: [...participants] });

    await updateDoc(doc(db, "chats", chat.id), { participants: [...participants], id: chat.id });

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

  async deleteMessage(message: MessageType) {
    await deleteDoc(doc(db, "messages", message.id));
  },
};
