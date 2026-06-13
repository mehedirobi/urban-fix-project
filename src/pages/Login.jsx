import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UseAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /**
   * Login handler
   */
  const handleLogin = useCallback(
    async (data) => {
      if (loading) return;

      try {
        setLoading(true);

        await signInUser(data.email, data.password);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/dashboard");
      } catch (err) {
        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err?.message || "Please try again",
        });
      } finally {
        setLoading(false);
      }
    },
    [signInUser, navigate, loading]
  );

  /**
   * Demo login (UI only)
   */
  const handleDemoLogin = useCallback(() => {
    Swal.fire({
      icon: "info",
      title: "Demo Mode",
      text: "This is a UI-only demo login",
      timer: 1500,
      showConfirmButton: false,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-gray-800 shadow-xl p-8 rounded-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-base-content dark:text-gray-100">
          Welcome Back
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            disabled={loading}
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

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            disabled={loading}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Demo */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-outline btn-primary w-full"
            disabled={loading}
          >
            Demo Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-4 text-base-content dark:text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <p className="text-center my-4 font-semibold text-gray-500 dark:text-gray-300">
          OR
        </p>

        {/* Social login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;