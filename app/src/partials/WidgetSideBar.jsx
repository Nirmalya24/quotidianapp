import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { themeState } from '../utils/Atom';
import "../css/widget-page/ddcss.css";
import { Link } from 'react-router-dom';


function WidgetSideBar({ openSidebar, openThemebar }) {
    const [theme, setTheme] = useRecoilState(themeState);

    const clickTheme = theme => {
        console.log('new theme: ', theme)
        setTheme(theme)
    }

    return (
        <div className={openSidebar ? 'sidebar sidebar-open' : 'sidebar'}>
            <div className='widget-menu'>
                {/* <div className='x'><i className='ri-close-line'></i></div> */}
                <div className='menu'>Menu</div>
            </div>
            <li>
                <button>
                    <i className='ri-tools-line'></i>Widgets
                </button>
                </li>
            <li>
                <button className='open-theme-bar' onClick={openThemebar} >
                    <i className='ri-landscape-line'></i> Theme
                </button>
            </li>
        </div>
    )
}

export default WidgetSideBar;
