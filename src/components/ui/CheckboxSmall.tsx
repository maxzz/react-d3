import React from 'react';

export type CheckboxSmallProps = {
    label: string,
    checked: boolean,
    onChange: (value: boolean) => void;
    styles: CSSModuleClasses;
};

function CheckboxSmall({ label, checked, onChange, styles }: CheckboxSmallProps) {
    const { checkbox, input, icon, frame, tick, text } = styles;
    return (
        <label className={checkbox}>
            <input className={input} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
            <svg className={icon} viewBox="0 0 22 22">
                <rect className={frame} width="100%" height="100%" x=".5" y=".5" rx="3" />
                <path className={tick} d="M4.7 11l5 5 9-9" />
            </svg>
            <span className={text}>{label}</span>
        </label>
    );
}

export default CheckboxSmall;
