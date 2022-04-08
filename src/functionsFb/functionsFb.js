import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const authFb = {
  async signUp(credentials) {
    return await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  },

  async signIn(credentials) {
    return await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  },

  async signOut() {
    return await signOut(auth);
  },
};
