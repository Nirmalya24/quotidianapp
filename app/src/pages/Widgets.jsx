import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { gradientState } from '../utils/Atom';
import Background from '../partials/Background';
import WidgetMenuBar from '../partials/WidgetMenuBar';
import ThemeBar from '../partials/ThemeBar';
import WidgetBar from '../partials/WidgetBar';


function Widgets() {
    const [menubar, setMenubar] = useState(false)
    const [themebar, setThemebar] = useState(false)
    const [widgetbar, setWidgetbar] = useState(false)

    const openMenubar = () => {
        console.log("Open menu bar")
        setMenubar(true)
        setThemebar(false)
        setWidgetbar(false)
    }

    const closeMenubar = () => {
        console.log("Close menu bar")
        setMenubar(false)
        setThemebar(false)
        setWidgetbar(false)
    }

    const openThemebar = () => {
        console.log("Open theme bar")
        setThemebar(true)
        setMenubar(false)
        setWidgetbar(false)
    }

    const openWidgetbar = () => {
        console.log("Open widget bar")
        setWidgetbar(true)
        setMenubar(false)
        setThemebar(false)
    }

    return (
        <div>
            <Background />
            <WidgetMenuBar 
                menubarState={menubar}
                themebarState={themebar} 
                widgetbarState={widgetbar} 
                openThemebar={openThemebar}
                openWidgetbar={openWidgetbar}/>
            <ThemeBar 
                themebarState={themebar} 
                closeMenubar={closeMenubar}
                openMenubar={openMenubar}/>
            <WidgetBar 
                widgetbarState={widgetbar} 
                closeMenubar={closeMenubar}
                openMenubar={openMenubar}/>
        </div>
    )

}

export default Widgets;