import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const { register, handleSubmit, watch } = useForm();
  const { registerUser } = UseAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const url = URL.createObjectURL(photoFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const handleRegistration = async (data) => {
    Swal.fire({ title: "Creating account...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const profileImg = data.photo?.[0] || null;
      const user = await registerUser(data.email, data.password, data.name, profileImg);

      Swal.fire({ icon: "success", title: "Registration Successful", text: `Welcome, ${user.displayName || user.email}`, timer: 2000, showConfirmButton: false });
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Registration Failed!", text: err.message || "Something went wrong!" });
    }
  };

  const handleDemoLogin = () => {
    Swal.fire({ icon: "success", title: "Demo Login Successful", timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-gray-800 shadow-xl p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-base-content dark:text-gray-100">
          Create an Account
        </h1>

        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-300" />
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
            required
          />
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
            required
          />
          <input
            type="file"
            {...register("photo")}
            accept="image/*"
            className="file-input file-input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-100"
            required
            minLength={6}
          />
          <button className="btn btn-primary w-full mt-3">Register</button>
        </form>

        <button onClick={handleDemoLogin} className="btn btn-outline btn-primary w-full mt-3 text-sm">
          Demo Login
        </button>

        <p className="text-center mt-4 text-base-content dark:text-gray-200">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>

        <p className="text-center my-4 font-semibold text-gray-500 dark:text-gray-300">OR</p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
