import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

type SignType = {
  name?: string;
  surname?: string;
  email: string;
  password: string;
};

export const authAPI = {
  async signUp(credentials: SignType) {
    const user = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    await setDoc(doc(db, "accounts", user.user.uid), { id: user.user.uid, name: credentials.name, surname: credentials.surname, email: user.user.email, password: credentials.password });
  },

  async signIn(credentials: SignType) {
    return await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  },

  async signOut() {
    return await signOut(auth);
  },
};
