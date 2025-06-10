// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAh4sPxNrY9z1XgjddclTzDwGWiwPJ-6kE",

  authDomain: "babysupplytracker.firebaseapp.com",

  projectId: "babysupplytracker",

  storageBucket: "babysupplytracker.firebasestorage.app",

  messagingSenderId: "431265839663",

  appId: "1:431265839663:web:02e959a06a0b5dab4ee4da",

  measurementId: "G-81X84NNR53"

};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
const db = getFirestore(app);
export { db };