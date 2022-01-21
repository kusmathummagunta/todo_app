// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBAWfnaBqSoNkbEmDP8K2KYa-rIqF3RUgo",
  authDomain: "todoapp-cb48a.firebaseapp.com",
  projectId: "todoapp-cb48a",
  storageBucket: "todoapp-cb48a.appspot.com",
  messagingSenderId: "469982920660",
  appId: "1:469982920660:web:a414b5169e03fdb3eb6041",
  measurementId: "G-4VXFH0919V",
});

const db = firebaseApp.firestore();

export default db;
