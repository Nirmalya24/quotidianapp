import React from "react";
import TodosWidget from "../Widgets/TodosWidget";
import WeatherWidgetComponent from "../Widgets/WeatherWidget";
import QuoteWidget  from "../Widgets/QuoteWidget";

function DashboardMain() {
  return (
    <div className="widget-page">
      <h1 className="text-2xl font-semibold pt-7 pl-7">Widget Dashboard</h1>
      <div className="item-grid">
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
