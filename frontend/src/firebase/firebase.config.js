// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey : import.meta.env.VITE_APIKEY,
  authDomain: "book-buy-4d656.firebaseapp.com",
  projectId: "book-buy-4d656",
  storageBucket: "book-buy-4d656.firebasestorage.app",
  messagingSenderId: "1031178621653",
  appId: "1:1031178621653:web:be2cc38aebc7cd8d6d485c",
  measurementId: "G-8V9F3GMEFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
export {auth}