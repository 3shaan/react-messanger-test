// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnSmyPBExVA8e6B6DjQoH3k7vFqE_0xCA",
  authDomain: "react-messanger-5cce0.firebaseapp.com",
  projectId: "react-messanger-5cce0",
  databaseURL: "https://react-messanger-5cce0.firebaseio.com",
  storageBucket: "react-messanger-5cce0.appspot.com",
  messagingSenderId: "960651637245",
  appId: "1:960651637245:web:ee0543e7336422e9c22994",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage();
export { auth , db, storage};