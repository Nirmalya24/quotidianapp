import React, { useState } from 'react';
import WidgetMenuBar from '../partials/WidgetMenuBar';
import ThemeBar from '../partials/WidgetThemeBar';
import WidgetBar from '../partials/WidgetBar';
import Burger from '../partials/Burger';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StatefulTargetBox as TargetBox} from "../partials/TargetBox";

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

        <div style={{ float: "right", className: 'menu p-4 overflow-y-auto w-80 text-base-content'}}>
          <Burger
            menubarState={menubar}
            openMenubar={openMenubar}
          />
          <WidgetMenuBar
            menubarState={menubar}
            openThemebar={openThemebar}
            openWidgetbar={openWidgetbar}
            closeMenubar={closeMenubar}
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
        </div>
      </DndProvider>
    </div>
  );
}

export default Widgets;