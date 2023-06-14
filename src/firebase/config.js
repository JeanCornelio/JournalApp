// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB086_KRXkxYcfaXIu8vZNr38bCTntsd1A",
  authDomain: "journal-app-c2639.firebaseapp.com",
  projectId: "journal-app-c2639",
  storageBucket: "journal-app-c2639.appspot.com",
  messagingSenderId: "924822381277",
  appId: "1:924822381277:web:35715e1eb2f3d04bf5b134"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const firebaseDB = getFirestore( FirebaseApp );
