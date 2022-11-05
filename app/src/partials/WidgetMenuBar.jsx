import React, { useState, useEffect } from 'react';
import '../css/widget-page/ddcss.css';


function WidgetMenuBar({ menubarState, openThemebar, openWidgetbar, closeMenubar }) {

    return (
        <div className={menubarState ? "menubar-open glass" : 'visibility: hidden'}>
            <div className='bar-title'>
                <div>Menu</div>
                <div onClick={closeMenubar} >
                    <i className='ri-close-circle-line'></i>
                </div>
            </div>
            <div className="menu p-4 overflow-y-auto w-80 text-base-content">
                <li>
                    <button onClick={openWidgetbar}>
                        <i className='ri-tools-line'></i>
                        Widgets
                    </button>
                </li>
                <li>
                    <button onClick={openThemebar}>
                        <i className='ri-landscape-line'></i>
                        Theme
                    </button>
                </li>
            </div>
        </div>
    )
}

export default WidgetMenuBar;
