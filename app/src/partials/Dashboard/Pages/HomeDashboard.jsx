import React from "react";
import { StatefulTargetBox as TargetBox } from "../TargetBox";


function HomeDashboard() {
    return (
      <div className="widget-page">
        <h1 className="text-2xl font-semibold pt-7 pl-7">Widget Dashboard</h1>
        <h1 className="text-sm font-semibold py-7 pl-7">
          Drag some widgets from the 🎁 Widget Drawer to get started!
        </h1>
        <TargetBox />
      </div>
    );
}

export default HomeDashboard;
