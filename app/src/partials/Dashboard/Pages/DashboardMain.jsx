import React from "react";
import TodosWidget from "../Widgets/TodosWidget";
import WeatherWidgetComponent from "../Widgets/WeatherWidget";
import QuoteWidget  from "../Widgets/QuoteWidget";

function DashboardMain() {
  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {/* Cards */}

        {/* Motivation Card */}
        <QuoteWidget />
        
        {/* Todo Cards */}
        <div className="card w-96 bg-neutral text-neutral-content p-4">
          <TodosWidget />
        </div>
        {/* Weather Widget Component */}
        <WeatherWidgetComponent />
      </div>
    </div>
  );
}

export default DashboardMain;
