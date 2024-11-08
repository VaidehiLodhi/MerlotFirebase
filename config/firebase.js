import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDaWFqkPMSq25MIzrMDxriVLulgEEIDZfI",
  authDomain: "merlot-5f3ca.firebaseapp.com",
  projectId: "merlot-5f3ca",
  storageBucket: "merlot-5f3ca.firebasestorage.app",
  messagingSenderId: "1086837766966",
  appId: "1:1086837766966:web:a2f982aabc792e95cdd197",
  measurementId: "G-ZEXKM0MBL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;