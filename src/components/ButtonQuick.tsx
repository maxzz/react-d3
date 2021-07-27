import React from 'react';
import { IconRefresh } from './ui/ButtonIcons';

function ButtonQuick({ icon = <IconRefresh />, onClick, classes = '' }: { icon?: React.ReactNode, onClick: () => void; classes?: string; }) {
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
        >
            {icon}
        </button>
    );
}

        {/* <button
            className="w-7 h-7 p-1 
              bg-green-100 hover:bg-green-200 
                border rounded border-gray-500
               text-green-900 
                active:scale-[0.97]"
            style={{ boxShadow: '#0000001f 1px 1px 1px 1px' }}
            onClick={() => genCb?.current?.save()}
            title="Save SVG"
        >
            <IconSave />
        </button> */}
        {/* <button
            className="w-7 h-7 p-1 
              bg-green-100  hover:bg-green-200 
                border rounded border-gray-500
               text-green-900 
                active:scale-[0.97]"
            style={{ boxShadow: '#0000001f 1px 1px 1px 1px' }}
            onClick={() => setUpdate(v => v + 1)}
            title="Update"
        >
            <IconRefresh />
        </button> */}

export default ButtonQuick;
