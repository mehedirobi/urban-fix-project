import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.message || "Please try again!",
      });
    }
  };

  const handleDemoLogin = () => {
    Swal.fire({
      icon: "success",
      title: "Demo Login Successful",
      text: "Welcome, Demo User!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-gray-800 shadow-xl p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-base-content dark:text-gray-100">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
            required
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
            required
          />

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="btn btn-primary w-full mt-2">Login</button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-outline btn-primary w-full mt-2"
          >
            Demo Login
          </button>
        </form>

        <p className="text-center mt-4 text-base-content dark:text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary underline font-semibold hover:text-primary-focus"
          >
            Register
          </Link>
        </p>

        <p className="text-center my-4 font-semibold text-gray-500 dark:text-gray-300">
          OR
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
