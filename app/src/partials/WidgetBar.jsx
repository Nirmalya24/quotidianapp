import React from 'react';
import '../css/widget-page/ddcss.css';

function WidgetBar({ widgetbarState, closeMenubar, openMenubar }) {

    return (
        <div>
            <div className={widgetbarState ? 'widgetbar-open glass' : 'widgetbar-closed'}>
                <div className='bar-title'>
                    <div onClick={openMenubar}>
                        <i className='ri-arrow-left-circle-line'></i>
                    </div>
                    <div>Choose Widgets</div>
                    <div onClick={closeMenubar} >
                        <i className='ri-close-circle-line'></i>
                    </div>
                </div>
                <div>
                    <ul className="menu p-4 overflow-y-auto w-80">
                    </ul>
                </div>
            </div >
        </div>
    )
}

export default WidgetBar;