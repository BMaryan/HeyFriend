import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAJYd2qcs59w1g7gD5CNVa9BmDlMbMNo8",
  authDomain: "hey-friend-9ece1.firebaseapp.com",
  projectId: "hey-friend-9ece1",
  storageBucket: "hey-friend-9ece1.appspot.com",
  messagingSenderId: "873920076147",
  appId: "1:873920076147:web:dbebe916e5147b53da0d06",
  measurementId: "G-KWP1W1BBBX",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
