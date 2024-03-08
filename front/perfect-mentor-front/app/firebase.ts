// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCDW6-b4MDStRHOA7V6r-2C5n8mWuQPhs",
  authDomain: "chat-app-firebase-caec7-f5917.firebaseapp.com",
  projectId: "chat-app-firebase-caec7",
  storageBucket: "chat-app-firebase-caec7.appspot.com",
  messagingSenderId: "305721715937",
  appId: "1:305721715937:web:13e55517189527427fdba0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
