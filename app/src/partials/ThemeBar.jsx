import React from 'react';
import "../css/widget-page/ddcss.css";

function ThemeBar({ themebarState, closeThemebar, returnToMenu}) {

    return (
        <div className={themebarState ? 'themebar-open' : 'themebar-closed'}>
            {console.log("Hey, ", themebarState)}
            <div className='themebar-title'>
                <div onClick={returnToMenu}>
                    <i className='ri-arrow-left-circle-line'></i>
                </div>
                <div>Change Theme</div>
                <div onClick={closeThemebar} >
                    <i className='ri-close-circle-line'></i>
                </div>
            </div>
            <div>
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <button onClick={() => clickTheme('retro')}>
                        <div data-theme="retro" className="menu dropdown-content 
                    p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                <div class="flex-grow text-sm font-bold">retro</div>
                                <div class="flex flex-shrink-0 flex-wrap gap-1">
                                    <div class="bg-primary w-2 rounded"></div>
                                    <div class="bg-secondary w-2 rounded"></div>
                                    <div class="bg-accent w-2 rounded"></div>
                                    <div class="bg-neutral w-2 rounded"></div>
                                </div></div></div>
                    </button>

                    <button onClick={() => clickTheme('cyberpunk')}>
                        <div data-theme="cyberpunk" className="menu dropdown-content 
                        p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                <div class="flex-grow text-sm font-bold">cyberpunk</div>
                                <div class="flex flex-shrink-0 flex-wrap gap-1">
                                    <div class="bg-primary w-2 rounded"></div>
                                    <div class="bg-secondary w-2 rounded"></div>
                                    <div class="bg-accent w-2 rounded"></div>
                                    <div class="bg-neutral w-2 rounded"></div>
                                </div></div></div>
                    </button>


                    <button onClick={
                        () => clickTheme('valentine')}>
                        <div data-theme="valentine" className="menu dropdown-content 
                    p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                <div class="flex-grow text-sm font-bold">valentine</div>
                                <div class="flex flex-shrink-0 flex-wrap gap-1">
                                    <div class="bg-primary w-2 rounded"></div>
                                    <div class="bg-secondary w-2 rounded"></div>
                                    <div class="bg-accent w-2 rounded"></div>
                                    <div class="bg-neutral w-2 rounded"></div>
                                </div></div></div>
                    </button>
                </ul>
            </div>
        </div >
    )
}

export default ThemeBar;