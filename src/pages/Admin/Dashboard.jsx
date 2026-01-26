import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome 👋 Manage projects, skills and about section from the sidebar.
      </p>
    </div>
  );
};

export default Dashboard;
