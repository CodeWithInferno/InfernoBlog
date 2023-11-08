// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Initialize Firebase using your configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb4ZyR-Lp5BKUEJXYDRkGnNb-IhbGxCDM",
  authDomain: "blog-4b5d6.firebaseapp.com",
  projectId: "blog-4b5d6",
  storageBucket: "blog-4b5d6.appspot.com",
  messagingSenderId: "726532057927",
  appId: "1:726532057927:web:6bb1635ee50e047e22fa62",
  measurementId: "G-PF7PJ6DKT0" // Remove this line if you are not using Firebase Analytics
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get references to the Firebase Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);

export const signUpUser = async (email, password, firstName, lastName) => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
    // Get the user ID
    const userId = userCredential.user.uid;

    // Store user data in Firestore
    await setDoc(doc(firestore, "users", userId), {
      firstName,
      lastName,
      email,
    });

    return true; // Registration successful
  } catch (error) {
    console.error('Error signing up:', error);
    return false; // Registration failed
  }
};
