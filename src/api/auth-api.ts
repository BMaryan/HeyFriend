import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getOnlineInSessionStorage } from "./../core/methods/methods";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AccountType, SignType } from "../types/types";

export const authAPI = {
  async signUp(credentials: SignType) {
    const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    await setDoc(doc(db, "accounts", user.uid), { id: user.uid, name: credentials.name, surname: credentials.surname, email: user.email, password: credentials.password, metadata: { ...user.metadata }, isOnline: getOnlineInSessionStorage() });
  },

  async signIn(credentials: SignType) {
    const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

    await updateDoc(doc(db, "accounts", user.uid), { isOnline: getOnlineInSessionStorage() });
  },

  async signOut(account: AccountType) {
    try {
      await updateDoc(doc(db, "accounts", account.id), { ...account, isOnline: null });
      await signOut(auth);
    } catch (error) {
      await signOut(auth);
    }
  },
};
