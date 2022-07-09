import { AccountType } from "./../types/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const accountAPI = {
  // async setAccounts() {
  //   return await onSnapshot(collection(db, "accounts"), (snapshot) => snapshot.docs);
  // },

  async setAccount(user: any) {
    return await getDoc(doc(db, "accounts", user.uid));
  },

  async updateAccount(account: AccountType) {
    return await setDoc(doc(db, "accounts", account.id), account);
  },
};
