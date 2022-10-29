import React, { useEffect} from 'react';
import WidgetHeader from "../partials/WidgetHeader";
import Footer from '../partials/Footer';
import { useRecoilState } from "recoil";
import { themeState } from "../utils/Atom";



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

            <Footer />
        </div>



    )

}

export default Widgets;