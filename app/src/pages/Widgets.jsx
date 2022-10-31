import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../utils/Atom';
import WidgetNavBar from '../partials/WidgetNavBar';
import WidgetSideBar from '../partials/WidgetSideBar';
import WidgetBackDrop from '../partials/WidgetBackDrop';
import ThemePick from '../partials/ThemePick';



function Widgets() {

    const [sidebar, setSidebar] = useState(false);
    const [themebar, setThemebar] = useState(false);
    
    
    const [theme, setTheme] = useRecoilState(themeState);

    const toggleSidebar = () => {
        setSidebar((sidebar) => !sidebar)
        console.log('Side bar open is: ', sidebar)
    }

    const toggleThemePick = () => {
        setThemebar((themebar) => !themebar)
        console.log('ThemePick open is: ', themebar)
    }


    useEffect(() => {
    }, [theme])

    return (
        <div data-theme={theme}>
            <WidgetNavBar openSidebar={toggleSidebar}/>
            <WidgetSideBar openSidebar={sidebar} 
                           openThemebar={toggleThemePick}/>
            <WidgetBackDrop openSidebar={sidebar} 
                            closeSidebar={toggleSidebar}/>
            <ThemePick openThemebar={themebar}/>
        </div>
    )

}

export default Widgets;