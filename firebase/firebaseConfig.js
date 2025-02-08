// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config (replace with your actual values from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBvwpelEmmLRnib9csA2uMmHVQMf4v0R3U",
  authDomain: "lifes-too-short.firebaseapp.com",
  projectId: "lifes-too-short",
  storageBucket: "lifes-too-short.appspot.com",
  messagingSenderId: "235277476472",
  appId: "1:235277476472:web:66f06e5724699fc685038d",
  measurementId: "G-C83119GS9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
