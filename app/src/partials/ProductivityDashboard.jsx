import React from "react";

function ProductivityDashboard() {
  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Productivity Dashboard</h1>
        {/* Cards */}

        {/* Motivation Card */}
        <div className="card w-96 bg-primary text-primary-content ml-0 m-6">
          <div className="card-body">
            <h2 className="card-title">Breaking News</h2>
            <p>This app is going to win SU ACM 2022!</p>
            <div className="card-actions justify-end">
              <a href="#">
                <button className="btn">CLICK FOR GOOD LUCK</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityDashboard;
