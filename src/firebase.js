// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCINXBlvXXEy7FYerIqV1ioef79RhXSyjo",
  authDomain: "nfl-schedule-a03ae.firebaseapp.com",
  projectId: "nfl-schedule-a03ae",
  storageBucket: "nfl-schedule-a03ae.appspot.com",
  messagingSenderId: "564273662614",
  appId: "1:564273662614:web:1be9f75d6a4853c3a490b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
