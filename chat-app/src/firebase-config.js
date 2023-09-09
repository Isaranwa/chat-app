// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA12lUrDGsudEnFCzShet8srEbMEK99bQE",
  authDomain: "message-app-a107c.firebaseapp.com",
  projectId: "message-app-a107c",
  storageBucket: "message-app-a107c.appspot.com",
  messagingSenderId: "592416811567",
  appId: "1:592416811567:web:a3396eae74de8c39f974da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);