import React, { useState, useEffect }from 'react';
import { useRecoilState } from 'recoil';
import { gradientState } from '../utils/Atom';
import '../css/widget-page/ddcss.css';
import '../css/widget-page/theme.css';

function Background() {
    
    const [gradient, setGradient] = useRecoilState(gradientState);

    return (
        <div className={gradient}>
            <div className="widget-gridspace">
                <header>
                    <h1>Widgets go here</h1>
                </header>
            </div>
        </div>
    )
}

export default Background;
