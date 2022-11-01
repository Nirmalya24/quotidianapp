import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../utils/Atom';
import WidgetSideBar from '../partials/WidgetSideBar';
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

    useEffect(() => {
    }, [theme])

    return (
        <div data-theme={theme}>
            <WidgetSideBar openThemebar={openThemebar}/>
            {/* <WidgetBackDrop openSidebar={sidebar} 
                            closeSidebar={toggleSidebar}/> */}
            <ThemeBar themebarState={themebar} closeThemebar={closeThemebar}/>
        </div>
    )

}

export default Widgets;