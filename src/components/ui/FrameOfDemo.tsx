import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classnames';

export function FrameOfDemo({ children, className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("p-1 w-[30rem] border-white/30 border rounded shadow", className)}>
            {children}
        </div>
    );
}
