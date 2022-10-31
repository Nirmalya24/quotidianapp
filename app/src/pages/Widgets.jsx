import React, { useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../utils/Atom';
import WidgetNavBar from '../partials/WidgetNavBar';
import WidgetSideBar from '../partials/WidgetSideBar';
import WidgetBackDrop from '../partials/WidgetBackDrop';



function Widgets() {

    const [sidebar, setSidebar] = useState(false);
    const [theme, setTheme] = useRecoilState(themeState);

    const toggleSidebar = () => {
        setSidebar((sidebar) => !sidebar)
        console.log('Side bar open is: ', sidebar)
    }

    useEffect(() => {
    }, [theme])

    return (
        <div data-theme={theme}>
            <WidgetNavBar openSidebar={toggleSidebar}/>
            <WidgetSideBar openSidebar={sidebar}/>
            <WidgetBackDrop openSidebar={sidebar} 
            closeSidebar={toggleSidebar}/>
        </div>
    )

}

export default Widgets;