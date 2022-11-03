import React, { useState, useEffect } from 'react';
import '../css/widget-page/ddcss.css';


function WidgetMenuBar({ menubarState, themebarState, widgetbarState, openThemebar, openWidgetbar }) {
    const [menubar, setMenubar] = useState(false);

    const openMenubar = () => {
        console.log("Open menu bar")
        setMenubar(true)
    }

    const closeMenubar = () => {
        console.log("Close menu bar")
        setMenubar(false)
    }

    useEffect(() => {
        if (menubarState)
            setMenubar(true)
    }, [menubarState])

    useEffect(() => {
        if (themebarState)
            setMenubar(false)
    }, [themebarState])

    useEffect(() => {
        if (widgetbarState)
            setMenubar(false)
    }, [widgetbarState])

    return (
        <div className="drawer drawer-end">
            <div className="burger" onClick={openMenubar}>
                <label htmlFor="my-drawer-4" className="btn glass btn-ghost">
                    <i className={menubar ? 'ri-close-circle-line' : 'ri-menu-line'}></i>
                </label>
            </div>
            <div className={menubar ? "menubar-open" : "menubar-closed"}>
                <div className="menu p-4 overflow-y-auto w-80 bg-base-100 glass text-base-content">
                    <div className='bar-title-minus'>
                        <div>Menu</div>
                        <div onClick={closeMenubar} >
                            <i className='ri-close-circle-line'></i>
                        </div>
                    </div>
                    <li>
                        <button className='btn-size' onClick={openWidgetbar}>
                            <i className='ri-tools-line'></i>
                            Widgets
                        </button>
                    </li>
                    <li>
                        <button className='btn-size' onClick={openThemebar}>
                            <i className='ri-landscape-line'></i>
                            Theme
                        </button>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default WidgetMenuBar;