import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const authFb = {
  async signUp(credentials) {
    console.log(credentials);

    return await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  },

  //   async signIn(email, password) {
  //     return await createUserWithEmailAndPassword(auth, email, password);
  //   },
};
