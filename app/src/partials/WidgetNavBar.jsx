import React from 'react';
import "../css/widget-page/ddcss.css";

function WidgetNavBar({openSidebar}) {
    return (
        <div className='navbar'>
            <div className='burger' onClick={openSidebar}>
                <i className='ri-menu-line'></i>
            </div>
        </div>
    )
}

export default WidgetNavBar;