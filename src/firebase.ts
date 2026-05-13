import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWJF973kkxnFJ0831NohxOsPNX89B5vrk",
  authDomain: "site-flavia.firebaseapp.com",
  projectId: "site-flavia",
  storageBucket: "site-flavia.firebasestorage.app",
  messagingSenderId: "233076445410",
  appId: "1:233076445410:web:bbf12d20a9212dc6774ebb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
