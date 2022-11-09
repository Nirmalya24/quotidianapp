import React from "react";
import DashboardSidebar from "../partials/DashboardSidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    // container
    <div className="h-screen w-screen flex bg-gray-200">
      {/* Side navbar */}
      <DashboardSidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
