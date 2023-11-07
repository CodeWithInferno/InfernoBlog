// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb4ZyR-Lp5BKUEJXYDRkGnNb-IhbGxCDM",
  authDomain: "blog-4b5d6.firebaseapp.com",
  projectId: "blog-4b5d6",
  storageBucket: "blog-4b5d6.appspot.com",
  messagingSenderId: "726532057927",
  appId: "1:726532057927:web:6bb1635ee50e047e22fa62",
  measurementId: "G-PF7PJ6DKT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);