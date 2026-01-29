import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  const registerUser = async (email, password, name, photo) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL: photo });
    setUser({ ...res.user });
    toast.success("Registered");
    return res.user;
  };

  const signInUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    toast.success("Logged in");
    return res.user;
  };

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    setUser(res.user);
    toast.success("Google login success");
    return res.user;
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });

    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL,
    });
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        signInUser,
        signInWithGoogle,
        updateUserProfile,
        logOut,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
