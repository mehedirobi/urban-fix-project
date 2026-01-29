import React from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-base-100 to-base-300 px-4 text-center">
      
      <motion.div
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="mb-6"
      >
        <TriangleAlert className="w-24 h-24 md:w-32 md:h-32 text-red-500 drop-shadow-xl" />
      </motion.div>

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold text-red-500 tracking-tight drop-shadow"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold mb-3"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-md md:max-w-lg mb-8 text-gray-700 text-lg md:text-xl leading-relaxed opacity-90"
      >
        Oops! Looks like you've wandered off the map. The page might be moved, removed, or never existed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          to="/"
          className="btn btn-primary btn-lg rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
