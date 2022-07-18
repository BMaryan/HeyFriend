import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ChatType, MessageType, ParticipantsOfChatType } from "../types/types";
import { db } from "../firebase";

export const chatAPI = {
  // async setAccounts() {
  //   return await onSnapshot(collection(db, "accounts"), (snapshot) => snapshot.docs);
  // },

  async createChat(participants: ParticipantsOfChatType) {
    const chat = await addDoc(collection(db, "chats"), participants);

    await updateDoc(doc(db, "chats", chat.id), { ...participants, id: chat.id });

    return chat;
  },

  async addMessage(message: MessageType) {
    await addDoc(collection(db, "messages"), message);
  },

  async updateChat(chat: ChatType) {
    const res = await getDoc(doc(db, "chats", chat.id));

    await updateDoc(doc(db, "chats", chat.id), { ...chat, id: res.id });
  },

  async deleteMessage(message: MessageType) {
    await deleteDoc(doc(db, "messages", message.id));
  },
};
