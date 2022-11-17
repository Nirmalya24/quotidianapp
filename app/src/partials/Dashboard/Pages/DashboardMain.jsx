import React from "react";
import TodosWidget from "../Widgets/TodosWidget";
import WeatherWidgetComponent from "../Widgets/WeatherWidget";
import QuoteWidget from "../Widgets/QuoteWidget";
import CalendarWidget from "../Widgets/CalendarWidget"

function DashboardMain() {
  return (
    <div className="widget-page">
      <h1 className="text-2xl font-semibold pt-7 pl-7">Widget Dashboard</h1>
      <div className="item-grid grid-flow-row-dense">

        {/* Motivation Card */}
        <QuoteWidget />

        {/* Todo Cards */}
        <div className="card w-96 bg-neutral text-neutral-content p-4">
          <TodosWidget />
        </div>

        {/* Weather Widget */}
        <WeatherWidgetComponent />

        {/* Calendar Widget */}
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <div className="card-body">
            <CalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
