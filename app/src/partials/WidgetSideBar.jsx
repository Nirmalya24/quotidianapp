import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { themeState } from '../utils/Atom';
import "../css/widget-page/ddcss.css";
import { Link } from 'react-router-dom';


function WidgetSideBar({ openThemebar }) {
    const [sidebar, setSidebar] = useState(false);


    const toggleSidebar = () => {
        console.log("Toggle burger menu button")
        setSidebar((sidebar) => !sidebar)
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="burger" onClick={toggleSidebar}>
                <label htmlFor="my-drawer-4" className="btn glass btn-ghost">
                    <i className={sidebar ? 'ri-close-circle-line': 'ri-menu-line'}></i>
                </label>
            </div>
            <div className="drawer-side">
                <label className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <div>
                        <div>Menu</div>
                    </div>
                    <li>
                        <button className='btn-size'>
                            <i className='ri-tools-line'></i>
                            Widgets
                        </button>
                    </li>
                    <li>
                        <button className='btn-size' onClick={openThemebar} >
                            <i className='ri-landscape-line'></i> 
                            Theme
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default WidgetSideBar;
