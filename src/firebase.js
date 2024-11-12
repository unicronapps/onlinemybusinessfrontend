import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWCiMBtizuIrrdLCV0gU3_zC5MIHiw1nE",
  authDomain: "business-online-ff5f7.firebaseapp.com",
  projectId: "business-online-ff5f7",
  storageBucket: "business-online-ff5f7.firebasestorage.app",
  messagingSenderId: "1081205389475",
  appId: "1:1081205389475:web:8bf66a2a6b36ab1d37e716",
  measurementId: "G-4YPK8TWWRJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
