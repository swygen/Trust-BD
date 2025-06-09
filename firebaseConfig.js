// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCwiUR6oJRjTBFa2ajTdb-5Owc_I6Dw2S0",
  authDomain: "fir-bot-bd5e8.firebaseapp.com",
  databaseURL: "https://fir-bot-bd5e8-default-rtdb.firebaseio.com",
  projectId: "fir-bot-bd5e8",
  storageBucket: "fir-bot-bd5e8.firebasestorage.app",
  messagingSenderId: "501448994050",
  appId: "1:501448994050:web:fb1c102dcaeb23bf93261b",
  measurementId: "G-3ERPTBHN6N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
