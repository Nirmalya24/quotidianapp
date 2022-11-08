import React from "react";
import TodosWidget from "./TodosWidget";

function DashboardMain() {
  return (
    <div className="mt-12 ml-6">
      <h1 className="font-['Comfortaa'] font-bold text-3xl mb-10">Dashboard</h1>

      {/* Cards */}

      {/* Motivation Card */}
      <div className="card w-96 bg-primary text-primary-content ml-0 m-6">
        <div className="card-body">
          <h2 className="card-title">Motivational Quote</h2>
          <p>
            Nothing is particulary hard if you break it down into small jobs.
          </p>
          <div className="card-actions justify-end">
            <a href="https://www.youtube.com/watch?v=7vBb4-E-4Qc">
              <button className="btn">Need more motivation?</button>
            </a>
          </div>
        </div>
      </div>
      {/* TODO Cards */}
      <div className="card w-96 bg-neutral text-neutral-content p-4">
        <TodosWidget />
      </div>
    </div>
  );
}

export default DashboardMain;
