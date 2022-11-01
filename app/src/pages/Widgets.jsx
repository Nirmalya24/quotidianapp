import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../utils/Atom';
import WidgetMenuBar from '../partials/WidgetMenuBar';
import ThemeBar from '../partials/ThemeBar';



function Widgets() {
    const [menubar, setMenubar] = useState(false)
    const [themebar, setThemebar] = useState(false)
    const [theme, setTheme] = useRecoilState(themeState)

    const openThemebar = () => {
        console.log("Open theme bar")
        setThemebar(true)
        setMenubar(false)
    }

    const openMenubar = () => {
        console.log("Open menu bar")
        setMenubar(true)
        setThemebar(false)
    }

    const closeMenubar = () => {
        console.log("Close menu bar")
        setMenubar(false)
        setThemebar(false)
    }

    useEffect(() => {
    }, [theme])

    return (
        <div data-theme={theme}>
            <WidgetMenuBar 
                menubarState={menubar}
                themebarState={themebar} 
                openThemebar={openThemebar}/>
            <ThemeBar 
                themebarState={themebar} 
                closeMenubar={closeMenubar}
                openMenubar={openMenubar}/>
        </div>
    )

}

export default Widgets;