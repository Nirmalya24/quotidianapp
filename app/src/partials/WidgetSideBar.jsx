import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { themeState } from '../utils/Atom';
import "../css/widget-page/ddcss.css";
import { Link } from 'react-router-dom';


function WidgetSideBar({openSidebar}) {
    const [theme, setTheme] = useRecoilState(themeState);

    const clickTheme = theme => {
        console.log('new theme: ', theme)
        setTheme(theme)
    }

    return (
        <div className={openSidebar?'sidebar sidebar-open':'sidebar'}>
            <li>Menu</li>
            <li><i class="ri-tools-line"></i>Widgets</li>
            <li><i className='ri-landscape-line'></i> Theme</li>
            <div className='dropdown dropdown-end'>
                <label tabIndex={0} className="btn btn-ghost rounded-btn">Dropdown</label>
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <button onClick={
                        () => clickTheme('retro')
                    }>
                        <div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline" data-set-theme="retro" data-act-class="outline"><div data-theme="retro" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"><div class="grid grid-cols-5 grid-rows-3"><div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"><div class="flex-grow text-sm font-bold">retro</div> <div class="flex flex-shrink-0 flex-wrap gap-1"><div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div></div></div></div></div></div>
                    </button>

                    <button onClick={
                        () => clickTheme('cyberpunk')
                    }>
                        <div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline" data-set-theme="cyberpunk" data-act-class="outline"><div data-theme="cyberpunk" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"><div class="grid grid-cols-5 grid-rows-3"><div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"><div class="flex-grow text-sm font-bold">cyberpunk</div> <div class="flex flex-shrink-0 flex-wrap gap-1"><div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div></div></div></div></div></div>
                    </button>


                    <button onClick={
                        () => clickTheme('valentine')
                    }>
                        <div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline" data-set-theme="valentine" data-act-class="outline"><div data-theme="valentine" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"><div class="grid grid-cols-5 grid-rows-3"><div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"><div class="flex-grow text-sm font-bold">valentine</div> <div class="flex flex-shrink-0 flex-wrap gap-1"><div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div></div></div></div></div></div>
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default WidgetSideBar;
