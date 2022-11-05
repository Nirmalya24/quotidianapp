import React from 'react';
import { useRecoilState } from 'recoil';
import { gradientState } from '../utils/Atom';
import "../css/widget-page/ddcss.css";

function ThemeBar({ themebarState, closeMenubar, openMenubar }) {

    const [gradient, setGradient] = useRecoilState(gradientState);

    const gradients = [
        { label: 'Default', gradientID: 'gradient-0' },
        { label: 'Hawaiian', gradientID: 'gradient-1' },
        { label: 'Valentine', gradientID: 'gradient-2' },
        { label: 'Halloween', gradientID: 'gradient-3' },
    ]

    const listGradients = gradients.map((g) =>
        <li key={g.label}>
            <button onClick={() => setGradient(g.gradientID)}>{g.label}</button>
        </li>
    );

    return (
        <div className={themebarState ? 'themebar-open glass' : 'visibility: hidden'}>
            <div className='bar-title'>
                <div onClick={openMenubar}>
                    <i className='ri-arrow-left-circle-line'></i>
                </div>
                <div>Change Theme</div>
                <div onClick={closeMenubar} >
                    <i className='ri-close-circle-line'></i>
                </div>
            </div>
            <div className="menu p-4 overflow-y-auto w-80 text-base-content">
                {listGradients}
            </div>
        </div >
    )
}

export default ThemeBar;