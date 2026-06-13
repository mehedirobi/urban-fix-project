import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = UseAuth();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const photoFile = watch("photo");

  /**
   * Image preview handler with cleanup
   */
  useEffect(() => {
    if (!photoFile?.[0]) return;

    const file = photoFile[0];
    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photoFile]);

  /**
   * Submit handler
   */
  const handleRegistration = async (data) => {
    try {
      setLoading(true);

      Swal.fire({
        title: "Creating account...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const profileImg = data.photo?.[0] || null;

      const user = await registerUser(
        data.email,
        data.password,
        data.name,
        profileImg
      );

      Swal.fire({
        icon: "success",
        title: "Account created",
        text: `Welcome, ${
          user?.displayName || user?.email || "User"
        }`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: err?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    Swal.fire({
      icon: "info",
      title: "Demo Login",
      text: "This feature is for testing only",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-gray-800 shadow-xl p-8 rounded-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-base-content dark:text-gray-100">
          Create Account
        </h1>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-300" />
            )}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message}
            </p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors.email.message}
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("photo")}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}

          <button
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Demo */}
        <button
          onClick={handleDemoLogin}
          className="btn btn-outline btn-primary w-full mt-3 text-sm"
        >
          Demo Login
        </button>

        {/* Login redirect */}
        <p className="text-center mt-4 text-base-content dark:text-gray-200">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Social login */}
        <p className="text-center my-4 font-semibold text-gray-500 dark:text-gray-300">
          OR
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;