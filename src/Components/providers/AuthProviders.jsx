// AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

// Create context for authentication
export const AuthContext = createContext(null);
const auth = getAuth(app);

// Authentication Provider Component
const AuthProvider = ({ children }) => {
  // State variables for user, loading state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign out user
  const logOut = () => {
    return signOut(auth);
  };

  // Effect hook to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // Authentication information object
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  // Provide authentication context to children components
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
