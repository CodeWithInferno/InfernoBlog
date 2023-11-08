import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut as signOutUser } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, [auth]); // Include 'auth' as a dependency

  const signIn = () => {
    // Implement sign-in logic if needed
  };

  const signOut = async () => {
    try {
      await signOutUser(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    currentUser,
    signIn, // Implement your sign-in logic here
    signOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
