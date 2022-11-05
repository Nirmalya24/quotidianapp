import React, { useState } from 'react';
import WidgetMenuBar from '../partials/WidgetMenuBar';
import ThemeBar from '../partials/ThemeBar';
import WidgetBar from '../partials/WidgetBar';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StatefulTargetBox as TargetBox } from "../partials/TargetBox";

function Widgets() {
  const [menubar, setMenubar] = useState(false);
  const [themebar, setThemebar] = useState(false);
  const [widgetbar, setWidgetbar] = useState(false);

  const openMenubar = () => {
    console.log("Open menu bar");
    setMenubar(true);
    setThemebar(false);
    setWidgetbar(false);
  };

  const closeMenubar = () => {
    console.log("Close menu bar");
    setMenubar(false);
    setThemebar(false);
    setWidgetbar(false);
  };

  const openThemebar = () => {
    console.log("Open theme bar");
    setThemebar(true);
    setMenubar(false);
    setWidgetbar(false);
  };

  const openWidgetbar = () => {
    console.log("Open widget bar");
    setWidgetbar(true);
    setMenubar(false);
    setThemebar(false);
  };

  return (
    <div>
      {/* <Background /> */}
      {/* <DragDrop /> */}
      <DndProvider backend={HTML5Backend}>
        <div style={{ float: "left", marginLeft: "5rem", marginTop: ".5rem" }}>
          <TargetBox />
        </div>

        <WidgetMenuBar
          menubarState={menubar}
          themebarState={themebar}
          widgetbarState={widgetbar}
          openThemebar={openThemebar}
          openWidgetbar={openWidgetbar}
        />
        <ThemeBar
          themebarState={themebar}
          closeMenubar={closeMenubar}
          openMenubar={openMenubar}
        />
        <WidgetBar
          widgetbarState={widgetbar}
          closeMenubar={closeMenubar}
          openMenubar={openMenubar}
        />
      </DndProvider>
    </div>
  );
}

export default Widgets;