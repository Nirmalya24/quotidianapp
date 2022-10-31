import React from 'react';

function WidgetBackDrop({openSidebar, closeSidebar}) {
    return (
        <div className={openSidebar?'backdrop backdrop-open':'backdrop'}
        onClick={closeSidebar}></div>
    )
}

export default WidgetBackDrop;