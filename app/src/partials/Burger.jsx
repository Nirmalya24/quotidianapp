import React, {useState, useEffect} from 'react';
import '../css/widget-page/ddcss.css';

function Burger({ menubarState, openMenubar }) {
    const [menubar, setMenubar] = useState(false);

    useEffect(() => {
        if (menubarState)
            setMenubar(true)
    }, [menubarState])

    return (
        <div 
            className={!menubarState ? "ri-menu-line burger" : 'visibility: hidden'} 
            onClick={openMenubar}>
        </div>
    );
}

export default Burger;