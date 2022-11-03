import React from 'react';
import '../css/widget-page/ddcss.css';
import { Container } from "./Container";

function WidgetBar({ widgetbarState, closeMenubar, openMenubar }) {
  return (
    <div>
      <div
        className={widgetbarState ? "widgetbar-open glass" : "widgetbar-closed"}
      >
        <div className="bar-title">
          <div onClick={openMenubar}>
            <i className="ri-arrow-left-circle-line"></i>
          </div>
          <div>Choose Widgets</div>
          <div onClick={closeMenubar}>
            <i className="ri-close-circle-line"></i>
          </div>
        </div>

        {/* Widgets to be dragged and dropped container */}
        <Container />
      </div>
    </div>
  );
}

export default WidgetBar;