import React from "react";
import TodosWidget from "./TodosWidget";

function DashboardMain() {
  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {/* Cards */}

        {/* Motivation Card */}
        <div className="card w-96 bg-primary text-primary-content ml-0 m-6">
          <div className="card-body">
            <h2 className="card-title">Motivational Quote</h2>
            <p>
              Nothing is particulary hard if you break it down into small jobs.
            </p>
            <div className="card-actions justify-end">
              <a href="https://www.goodreads.com/quotes/tag/motivational">
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
    </div>
  );
}

export default DashboardMain;
