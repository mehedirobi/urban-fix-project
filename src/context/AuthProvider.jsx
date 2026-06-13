import React, { useEffect, useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  // ✅ Singleton Google provider (important optimization)
  const googleProvider = useMemo(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return provider;
  }, []);

  /**
   * Save / sync user to backend DB
   */
  const saveUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    const payload = {
      email: firebaseUser.email,
      name: firebaseUser.displayName || "User",
      photoURL: firebaseUser.photoURL || "",
      role: "citizen",
    };

    try {
      await axiosSecure.post("/users", payload);
    } catch (err) {
      console.error("User sync failed:", err);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const registerUser = async (email, password, name, profileImgFile) => {
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let photoURL = "";

      // Upload image if exists
      if (profileImgFile) {
        const formData = new FormData();
        formData.append("image", profileImgFile);

        const imageApi = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        const imgRes = await axios.post(imageApi, formData);
        photoURL = imgRes.data?.data?.url || "";
      }

      // Update Firebase profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });

      const updatedUser = {
        ...result.user,
        displayName: name,
        photoURL,
      };

      setUser(updatedUser);
      await saveUserToDB(updatedUser);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      return updatedUser;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================
  const signInUser = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await saveUserToDB(result.user);
      return result.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const signInGoogle = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      await saveUserToDB(result.user);
      return result.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);

      Swal.fire({
        icon: "success",
        title: "Logged out",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REFRESH USER
  // =========================
  const refreshUser = async () => {
    if (!auth.currentUser) return;

    await auth.currentUser.reload();

    const refreshed = auth.currentUser;

    setUser({
      ...refreshed,
    });
  };

  // =========================
  // AUTH STATE LISTENER (SOURCE OF TRUTH)
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = useMemo(
    () => ({
      user,
      loading,
      registerUser,
      signInUser,
      signInGoogle,
      logout,
      refreshUser,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;