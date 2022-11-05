import React from 'react';
import { StatefulSourceBox as SourceBox} from "../partials/SourceBox";
import '../css/widget-page/ddcss.css';

function WidgetBar({ widgetbarState, closeMenubar, openMenubar }) {
  return (
    <div
      className={widgetbarState ? "widgetbar-open glass" : 'visibility: hidden'}
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

      {/* Widgets to be dragged and dropped */}
      <SourceBox />
    </div>
  );
}

export default WidgetBar;