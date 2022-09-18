import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AccountType } from "./../types/types";
import { User } from "firebase/auth";
import { db } from "../firebase";

export const accountAPI = {
  // async setAccounts() {
  //   return await onSnapshot(collection(db, "accounts"), (snapshot) => snapshot.docs);
  // },

  async setAccount(user: User) {
    return await getDoc(doc(db, "accounts", user.uid));
  },

  async updateAccount(account: AccountType) {
    console.log(account);

    return await updateDoc(doc(db, "accounts", account.id), { ...account });
  },
};
