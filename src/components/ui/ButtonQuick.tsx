import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classnames';
import { IconRefresh } from '@ui/UIIcons';

export function ButtonQuick({ children = <IconRefresh />, onClick, className, title }: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={classNames(
                'p-0.5 w-6 h-6 flex-none',
                'text-green-900 bg-green-100 hover:bg-green-200 border-[#006f94] border rounded active:scale-[.97]',
                className,
            )}
            style={{ boxShadow: '#0000001f 1px 1px 1px 1px' }}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    );
}
