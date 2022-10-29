import React, { useEffect} from 'react';
import { useRecoilState } from "recoil";
import { themeState } from "../utils/Atom";
import WidgetHeader from "../partials/WidgetHeader";
import DragDrop from "../partials/DragDrop";



function Widgets() {

    const [theme, setTheme] = useRecoilState(themeState);

    useEffect(() => {
    }, [theme])


    return (
        <div data-theme={theme}>

            <WidgetHeader />
            <h1>
                "Hello"
            </h1>

            <DragDrop />
        </div>



    )

}

export default Widgets;