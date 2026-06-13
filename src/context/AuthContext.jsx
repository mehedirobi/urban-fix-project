import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
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
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auth state listener (single source of truth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Register
  const registerUser = async (email, password, name, photoURL) => {
    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(auth, email, password);

      if (name || photoURL) {
        await updateProfile(result.user, {
          displayName: name || "",
          photoURL: photoURL || "",
        });
      }

      toast.success("Account created successfully");
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const signInUser = async (email, password) => {
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);

      toast.success("Logged in successfully");
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      toast.success("Google login successful");
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });

      // Force refresh from Firebase (avoid manual mutation bugs)
      setUser({ ...auth.currentUser });

      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      setLoading(true);

      await signOut(auth);
      setUser(null);

      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // memoized context value (performance improvement)
  const value = useMemo(
    () => ({
      user,
      loading,
      registerUser,
      signInUser,
      signInWithGoogle,
      updateUserProfile,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toaster position="top-right" />
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;