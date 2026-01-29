import React, { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const UserProfile = () => {
  const { user, refreshUser } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    photoURL: "",
    isPremium: false,
    isBlocked: false,
  });

  const API_BASE = "https://urban-fix-server.vercel.app";

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/users/${encodeURIComponent(user.email.toLowerCase())}`)
      .then((res) => {
        const data = res.data;
        setUserInfo({
          name: data.name || "",
          email: data.email || "",
          photoURL: data.photoURL || "",
          isPremium: data.isPremium || false,
          isBlocked: data.isBlocked || false,
        });
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load profile", "error");
      })
      .finally(() => setLoading(false));
  }, [user]);

  // UPDATE PROFILE
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_BASE}/users/${encodeURIComponent(user.email.toLowerCase())}`,
        {
          name: userInfo.name,
          photoURL: userInfo.photoURL,
        }
      );

      if (!auth.currentUser) {
        throw new Error("User not authenticated");
      }

      await updateProfile(auth.currentUser, {
        displayName: userInfo.name,
        photoURL: userInfo.photoURL,
      });

      await refreshUser();

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Profile update failed",
        text: err.message,
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl text-center font-bold mb-8 text-primary">My Profile</h2>

      {userInfo.isBlocked && (
        <p className="text-red-500 font-semibold mb-4 text-center">
          Your account is blocked. Please contact authority.
        </p>
      )}

      <form
        onSubmit={handleUpdateProfile}
        className="space-y-4 bg-base-100 p-6 shadow-xl rounded-lg"
      >
        <div className="flex items-center gap-4">
          <img
            src={userInfo.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="text"
            value={userInfo.photoURL}
            onChange={(e) =>
              setUserInfo({ ...userInfo, photoURL: e.target.value })
            }
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
        </div>

        <input
          type="text"
          value={userInfo.name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, name: e.target.value })
          }
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          value={userInfo.email}
          disabled
          className="input input-bordered w-full bg-gray-200"
        />

        <div className="flex justify-between text-sm text-gray-700">
          <p>
            <strong>Status:</strong>{" "}
            {userInfo.isPremium ? "Premium User" : "Free User"}
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
