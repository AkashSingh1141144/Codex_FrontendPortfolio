import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">
      
      {/* 👉 SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-900 p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Admin Panel
        </h2>

        <nav className="space-y-3">
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/admin/skills"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            Skills
          </NavLink>

          <NavLink
            to="/admin/about"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            About
          </NavLink>
        </nav>
      </aside>

      {/* 👉 PAGE CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
