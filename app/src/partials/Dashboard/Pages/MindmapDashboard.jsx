import React from "react";
import MindmapWidget from "../Widgets/MindmapWidget";

function MindmapDashboard() {
  return (
    <div className="flex">
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Mindmap dashboard</h1>
        <MindmapWidget />
      </div>
    </div>
  );
}

export default MindmapDashboard;
