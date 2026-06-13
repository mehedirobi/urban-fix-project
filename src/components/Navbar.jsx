import React, { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { HiOutlineMenuAlt3, HiOutlineUser } from "react-icons/hi";
import { FaTools } from "react-icons/fa";

import UseAuth from "../hooks/UseAuth";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logout } = UseAuth();
  const location = useLocation();

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

  const baseRoutes = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "All Issues", path: "/all-issues" },
      { name: "About Us", path: "/about-us" },
      { name: "Contact", path: "/contact" },
      { name: "Support", path: "/support" },
    ],
    []
  );

  const authRoutes = useMemo(
    () =>
      user
        ? [
            { name: "Report Issue", path: "/create-issue" },
            { name: "Dashboard", path: "/dashboard" },
          ]
        : [],
    [user]
  );

  const menuItems = [...baseRoutes, ...authRoutes];

  // FIXED active logic (manual control = 100% stable)
  const isActiveRoute = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-300"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="dropdown lg:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <HiOutlineMenuAlt3 size={24} />
                </label>

                <ul className="menu dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-300 z-[100]">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-lg ${
                            isActive ? "bg-primary text-white" : ""
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
                <FaTools className="text-primary text-3xl" />
                <span>
                  Urban<span className="text-primary">Fix</span>
                </span>
              </Link>
            </div>

            {/* DESKTOP */}
            <ul className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}   // 🔥 IMPORTANT FIX
                    className={({ isActive }) =>
                      item.highlight
                        ? "px-5 py-2 rounded-full bg-primary text-white"
                        : `px-4 py-2 rounded-full transition ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-base-200"
                          }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-11 rounded-full ring-2 ring-primary/30 overflow-hidden">
                      <img
                        src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt="user"
                      />
                    </div>
                  </label>

                  <ul className="menu dropdown-content mt-4 p-3 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-300 z-[100]">
                    <li className="pointer-events-none mb-2 text-center">
                      <div className="font-semibold">{user.displayName || "User"}</div>
                      <div className="text-xs opacity-60">{user.email}</div>
                    </li>

                    <div className="divider my-1"></div>

                    <li>
                      <NavLink to="/dashboard/profile" end>
                        <HiOutlineUser />
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink to="/login" className="btn btn-primary rounded-full px-6">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="h-16" />
    </>
  );
};

export default Navbar;