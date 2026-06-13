import React, { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app";

const UserProfile = () => {
  const { user, refreshUser } = UseAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    photoURL: "",
    isPremium: false,
    isBlocked: false,
  });

  /**
   * Load user profile
   */
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);

        const email = user.email.toLowerCase();

        const res = await axios.get(
          `${API_BASE}/users/${encodeURIComponent(email)}`,
          { signal: controller.signal }
        );

        const data = res.data || {};

        setUserInfo({
          name: data.name || "",
          email: data.email || "",
          photoURL: data.photoURL || "",
          isPremium: Boolean(data.isPremium),
          isBlocked: Boolean(data.isBlocked),
        });
      } catch (err) {
        if (err.name === "CanceledError") return;

        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Failed to load profile",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [user?.email]);

  /**
   * Handle profile update
   */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      Swal.fire("Error", "User not authenticated", "error");
      return;
    }

    try {
      setSaving(true);

      const email = user.email.toLowerCase();

      // 1. Update backend
      await axios.put(
        `${API_BASE}/users/${encodeURIComponent(email)}`,
        {
          name: userInfo.name,
          photoURL: userInfo.photoURL,
        }
      );

      // 2. Update Firebase auth profile
      await updateProfile(auth.currentUser, {
        displayName: userInfo.name,
        photoURL: userInfo.photoURL,
      });

      // 3. Refresh auth context
      await refreshUser();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err?.message || "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl text-center font-bold mb-8 text-primary">
        My Profile
      </h2>

      {userInfo.isBlocked && (
        <p className="text-red-500 font-semibold mb-4 text-center">
          Your account is blocked. Contact support.
        </p>
      )}

      <form
        onSubmit={handleUpdateProfile}
        className="space-y-4 bg-base-100 p-6 shadow-xl rounded-lg"
      >
        {/* Avatar + Photo URL */}
        <div className="flex items-center gap-4">
          <img
            src={
              userInfo.photoURL ||
              "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <input
            type="text"
            value={userInfo.photoURL}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                photoURL: e.target.value,
              }))
            }
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
        </div>

        {/* Name */}
        <input
          type="text"
          value={userInfo.name}
          onChange={(e) =>
            setUserInfo((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        {/* Email */}
        <input
          type="email"
          value={userInfo.email}
          disabled
          className="input input-bordered w-full bg-gray-200"
        />

        {/* Status */}
        <div className="flex justify-between text-sm text-gray-700">
          <p>
            <strong>Status:</strong>{" "}
            {userInfo.isPremium
              ? "Premium User"
              : "Free User"}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;