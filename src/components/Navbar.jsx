import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
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
        { name: "Report Issue", path: "/create-issue" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [];

  const menuItems = [...baseRoutes, ...authRoutes];

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary-content px-3 py-2 rounded-md font-medium"
      : "px-3 py-2 hover:text-primary transition";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-base-100 shadow z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <div className="lg:hidden dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                ☰
              </label>
              <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <NavLink to={item.path}>{item.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/" className="text-2xl font-bold text-primary">
              UrbanFix
            </Link>
          </div>

          {/* Desktop menu */}
          <ul className="hidden lg:flex gap-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} className={navLinkStyle}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="user"
                    />
                  </div>
                </label>
                <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="font-semibold text-center">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
