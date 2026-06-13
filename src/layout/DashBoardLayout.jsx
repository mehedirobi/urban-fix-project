import React, { useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Loader from "../components/Loader";

const SIDEBAR_LINKS = [
  { to: "/dashboard/my-issues", label: "My Issues", roles: ["User", "Admin"] },
  { to: "/dashboard/manage-users", label: "Manage Users", roles: ["Admin", "Manager"] },
  { to: "/dashboard/manage-issues", label: "Manage Issues", roles: ["Admin"] },
  { to: "/dashboard/my-payment", label: "My Payment", roles: ["User", "Admin", "Manager"] },
  { to: "/dashboard/profile", label: "My Profile", roles: ["User", "Admin", "Manager"] },
];

const DashBoardLayout = () => {
  const { user, loading } = useAuth();

  const userRole = useMemo(() => {
    return user?.role?.trim() || "User";
  }, [user]);

  const filteredLinks = useMemo(() => {
    return SIDEBAR_LINKS.filter((link) =>
      link.roles.includes(userRole)
    );
  }, [userRole]);

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="drawer lg:drawer-open min-h-screen">

      {/* Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-base-100">

        {/* Navbar */}
        <header>
          <nav className="navbar bg-base-200 shadow-md px-4 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
                aria-label="open sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>

            <div className="flex-1 text-center text-2xl lg:text-3xl font-bold text-primary">
              Dashboard
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

      </div>

      {/* Sidebar */}
      <aside className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        />

        <nav
          className="w-64 min-h-screen bg-base-200 flex flex-col border-r border-base-300"
          aria-label="dashboard navigation"
        >
          {/* Header */}
          <div className="p-4 text-lg font-bold border-b border-base-300">
            Menu
          </div>

          {/* Links */}
          <ul className="menu p-4 space-y-2 flex-1">
            {filteredLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition",
                      isActive
                        ? "bg-indigo-500 text-white"
                        : "text-base-content hover:bg-base-300",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default DashBoardLayout;