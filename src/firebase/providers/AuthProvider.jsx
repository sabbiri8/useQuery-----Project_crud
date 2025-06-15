import React, { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.init";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Curently Logied in", currentUser);
        setUser(currentUser);
      }
    });

    return () => unSubscribe();
  }, []);

  //   onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log("Curently Logied in", currentUser);
  //       setUser(currentUser);
  //     } else {
  //       console.log("No user login");
  //       setUser(null);
  //     }
  //   });
  const authInfo = {
    name: "sabbir ali",
    user,
    createUser,
    loginUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
