import React from "react";
import Timer from "../Widgets/TimerWidget";

function ProductivityDashboard() {
  return (
    <div className="widget-page">
      <h1 className="text-2xl font-semibold pt-7 pl-7">Productivity Dashboard</h1>
      <div className="item-grid">
        
        {/* Timer */}
        <div className="card w-auto bg-primary text-primary-content ml-0 m-6">
          <div className="card-body">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityDashboard;
