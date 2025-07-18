// firebase-config.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- IMPORTANTE

const firebaseConfig = {
  apiKey: "AIzaSyCzs0SvFT-NicRgYNxnFls-0OpeZ1peskY",
  authDomain: "ecopoint-d9cb1.firebaseapp.com",
  projectId: "ecopoint-d9cb1",
  storageBucket: "ecopoint-d9cb1.appspot.com",
  messagingSenderId: "1006622740604",
  appId: "1:1006622740604:web:09e6203859dcf4a981f9f9",
  measurementId: "G-RCPVLXJRTG"
};

// Inicializamos la app solo si no hay una existente
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // <-- IMPORTANTE

export { auth, provider, db }; // <-- EXPORTAMOS db
