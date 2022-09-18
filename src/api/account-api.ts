import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AccountType } from "./../types/types";
import { User } from "firebase/auth";
import { db } from "../firebase";

export const accountAPI = {
  // set
  async setAccount(user: User) {
    return await getDoc(doc(db, "accounts", user.uid));
  },

  // update
  async updateAccount(account: AccountType) {
    return await updateDoc(doc(db, "accounts", account.id), { ...account });
  },
};
