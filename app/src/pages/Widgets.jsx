import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../utils/Atom';
import WidgetMenuBar from '../partials/WidgetMenuBar';
import WidgetBackDrop from '../partials/WidgetBackDrop';
import ThemeBar from '../partials/ThemeBar';



function Widgets() {

    const [themebar, setThemebar] = useState(false)
    const [theme, setTheme] = useRecoilState(themeState)

    const openThemebar = () => {
        console.log("Open theme bar")
        setThemebar(true)
    }

    const closeThemebar = () => {
        console.log("Close theme bar")
        setThemebar(false)
    }

    const openMenubar = () => {
        console.log("Re-open menu bar")
        setThemebar(false)
    }

    useEffect(() => {
    }, [theme])

    return (
        <div data-theme={theme}>
            <WidgetMenuBar openThemebar={openThemebar}/>
            {/* <WidgetBackDrop openSidebar={sidebar} 
                            closeSidebar={toggleSidebar}/> */}
            <ThemeBar themebarState={themebar} 
                    closeThemebar={closeThemebar}
                    returnToMenu={openMenubar}/>
        </div>
    )

}

export default Widgets;