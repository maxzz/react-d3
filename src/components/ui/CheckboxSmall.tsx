import React from 'react';
import styles from './CheckboxSmall.module.scss';

function CheckboxSmall({label, checked, onChange}: {label: string, checked: boolean, onChange: (value: boolean) => void}) {
    const { checkbox, input, icon, frame, tick, text } = styles;
    return (
        <label className={checkbox}>
            <input className={input} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
            <svg className={icon} viewBox="0 0 22 22">
                <rect className={frame} width="100%" height="100%" x=".5" y=".5" rx="3" />
                <path className={tick} stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4.7 11l5 5 9-9" />
            </svg>
            <span className={text}>{label}</span>
        </label>
    );
}

export default CheckboxSmall;
