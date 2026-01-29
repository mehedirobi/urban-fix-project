import React, { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
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
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const googleProvider = new GoogleAuthProvider();

  const saveUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    const userData = {
      email: firebaseUser.email,
      name: firebaseUser.displayName || "User",
      photoURL: firebaseUser.photoURL || "",
      role: "citizen",
    };

    await axiosSecure.post("/users", userData);
  };

  //  REGISTER 
  const registerUser = async (email, password, name, profileImgFile) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      let photoURL = "";
      if (profileImgFile) {
        const formData = new FormData();
        formData.append("image", profileImgFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        const imgRes = await axios.post(image_API_URL, formData);
        photoURL = imgRes.data.data.url;
      }

      await updateProfile(res.user, {
        displayName: name,
        photoURL,
      });

      await saveUserToDB({
        ...res.user,
        displayName: name,
        photoURL,
      });

      setUser({ ...res.user, displayName: name, photoURL });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",  
        timer: 1500,
        showConfirmButton: false,
      });

      return res.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToDB(res.user);
      setUser({ ...res.user });
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  //GOOGLE LOGIN
  const signInGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await saveUserToDB(res.user);
      setUser({ ...res.user });
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };


 const refreshUser = async () => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  }
};


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { ...currentUser } : null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logout,
        refreshUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
