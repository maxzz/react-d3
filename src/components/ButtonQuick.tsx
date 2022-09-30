import React from 'react';
import { IconRefresh } from './UI/UIIcons';

function ButtonQuick({ icon = <IconRefresh />, onClick, classes = '', title }: { icon?: React.ReactNode, onClick: () => void; classes?: string; title?: string }) {
    return (
        <button
            className={`p-0.5 w-6 h-6 flex-none
                text-green-900 
                bg-green-100 hover:bg-green-200
                border rounded border-[#006f94] 
                active:scale-[.97] ${classes}`
            }
            style={{ boxShadow: '#0000001f 1px 1px 1px 1px' }}
            onClick={onClick}
            title={title}
        >
            {icon}
        </button>
    );
}

export default ButtonQuick;
