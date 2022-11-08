import React from "react";
import Logo from "../images/Q..png";
import DashboardSidebar from "../partials/DashboardSidebar";
import DashboardMain from "../partials/DashboardMain";

function Dashboard() {
  return (
    <div className="h-screen w-screen flex bg-gray-200">
      {/*  container */}

      <DashboardSidebar />
      <DashboardMain />
    </div>
  );
}

export default Dashboard;
