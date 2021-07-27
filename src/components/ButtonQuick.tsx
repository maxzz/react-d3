import React from 'react';
import { IconRefresh } from './ui/ButtonIcons';

function ButtonQuick({icon = <IconRefresh />, onClick}: {icon?: React.ReactNode, onClick: () => void}) {
    return (
        <button
            className="p-0.5 w-6 h-6 flex-none bg-green-100 hover:bg-green-200 border rounded border-[#006f94] active:scale-[.97]"
            style={{ boxShadow: '#0000001f 1px 1px 1px 1px' }}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

export default ButtonQuick;
