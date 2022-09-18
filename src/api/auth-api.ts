import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { AccountType, SignType } from "../types/types";
import { auth, db, fb } from "../firebase";

export const authAPI = {
  async signUp(credentials: SignType) {
    const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    await setDoc(doc(db, "accounts", user.uid), {
      id: user.uid,
      name: credentials.name,
      surname: credentials.surname,
      email: user.email,
      password: credentials.password,
      isOnline: true,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: fb.Timestamp.now(),
      },
    });
  },

  async signIn(credentials: SignType) {
    const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

    await updateDoc(doc(db, "accounts", user.uid), { isOnline: true });
  },

  async signOut(account: AccountType) {
    try {
      await updateDoc(doc(db, "accounts", account.id), { ...account, isOnline: false });
      await signOut(auth);
    } catch (error) {
      await signOut(auth);
    }
  },
};
