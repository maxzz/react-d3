import React from 'react';
import CheckboxStyles from './CheckboxSmall.module.scss';

export type CheckboxSmallProps = {
    label: string;
    checked: boolean;
    enabled?: boolean;
    onChange: (value: boolean) => void;
    styles?: CSSModuleClasses;
};

/*
import { CheckboxProps } from './ui/ui-props';
// function Checkbox({ className, label, enabled = true, checked: value, onChange }: CheckboxProps) {
//     return (
//         <label className={`flex items-center text-sm ${enabled ? '' : 'opacity-50'} ${className}`}>
//             <input className="mr-1" type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
//             {label}
//         </label>
//     );
// }
*/

function CheckboxSmall({ label, checked, onChange, enabled = true, styles = CheckboxStyles }: CheckboxSmallProps) {
    const { checkbox, input, icon, frame, tick, text } = styles;
    return (
        <label className={`${enabled ? '' : 'opacity-50'} ${checkbox}`}>
            <input className={input} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} disabled={!enabled} />
            <svg className={icon} viewBox="0 0 22 22">
                <rect className={frame} width="100%" height="100%" x=".5" y=".5" rx="3" />
                <path className={tick} d="M4.7 11l5 5 9-9" />
            </svg>
            <span className={text}>{label}</span>
        </label>
    );
}

export default CheckboxSmall;
