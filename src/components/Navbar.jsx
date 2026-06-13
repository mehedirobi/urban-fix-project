import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
  HiOutlineMenuAlt3,
  HiOutlineUser,
} from "react-icons/hi";
import { FaTools } from "react-icons/fa";

import UseAuth from "../hooks/UseAuth";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = async () => {
    try {
      await logout();

      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const baseRoutes = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/all-issues" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
    { name: "Support", path: "/support" },
  ];

  const authRoutes = user
    ? [
        {
          name: "Report Issue",
          path: "/create-issue",
          highlight: true,
        },
        {
          name: "Dashboard",
          path: "/dashboard",
        },
      ]
    : [];

  const menuItems = [...baseRoutes, ...authRoutes];

  const navLinkStyle = ({ isActive }) =>
    `
      relative
      px-4
      py-2
      text-sm
      font-medium
      transition-all
      duration-300
      rounded-full
      ${
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-base-200"
      }
    `;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          backdrop-blur-xl
          bg-base-100/80
          border-b
          border-base-300
        "
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu */}
              <div className="dropdown lg:hidden">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                >
                  <HiOutlineMenuAlt3 size={24} />
                </label>

                <ul
                  tabIndex={0}
                  className="
                    menu
                    dropdown-content
                    mt-3
                    p-2
                    shadow-xl
                    bg-base-100
                    rounded-2xl
                    w-64
                    border
                    border-base-300
                    z-[100]
                  "
                >
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavLink to={item.path}>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logo */}
              <Link
                to="/"
                className="
                  flex
                  items-center
                  gap-2
                  text-2xl
                  font-extrabold
                  tracking-tight
                "
              >
                <FaTools className="text-primary text-3xl" />

                <span>
                  Urban
                  <span className="text-primary">
                    Fix
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  {item.highlight ? (
                    <NavLink
                      to={item.path}
                      className="
                        px-5
                        py-2
                        rounded-full
                        bg-primary
                        text-primary-content
                        font-medium
                        hover:scale-105
                        transition-all
                        duration-300
                      "
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={navLinkStyle}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Right */}
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="
                      btn
                      btn-ghost
                      btn-circle
                      avatar
                    "
                  >
                    <div
                      className="
                        w-11
                        rounded-full
                        ring-2
                        ring-primary/30
                        overflow-hidden
                      "
                    >
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt="user"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="
                      menu
                      dropdown-content
                      mt-4
                      p-3
                      shadow-xl
                      bg-base-100
                      rounded-2xl
                      w-64
                      border
                      border-base-300
                      z-[100]
                    "
                  >
                    <li className="pointer-events-none mb-2">
                      <div className="flex flex-col items-center gap-2 py-2">
                        <div className="avatar">
                          <div className="w-14 rounded-full">
                            <img
                              src={
                                user.photoURL ||
                                "https://i.ibb.co/4pDNDk1/avatar.png"
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <h3 className="font-semibold">
                          {user.displayName || "User"}
                        </h3>

                        <p className="text-xs opacity-60">
                          {user.email}
                        </p>
                      </div>
                    </li>

                    <div className="divider my-1"></div>

                    <li>
                      <NavLink to="/dashboard/profile">
                        <HiOutlineUser />
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <button onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="
                    btn
                    btn-primary
                    rounded-full
                    px-6
                    font-semibold
                    shadow-md
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Navbar Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;