import React from "react";

function ScheduleDashboard() {
  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Schedule Dashboard</h1>
        {/* Cards */}

        {/* Motivation Card */}
        <div className="card w-96 bg-primary text-primary-content ml-0 m-6">
          <div className="card-body">
            <h2 className="card-title">Lets take a look at your shcedule</h2>
            <p>Looks like you are going to win SU ACM 2022!</p>
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

export default ScheduleDashboard;
