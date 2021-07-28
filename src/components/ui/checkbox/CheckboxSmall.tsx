import React from 'react';
import { CheckboxWithStyleProps } from '../ui-props';
import CheckboxStyles from './CheckboxSmall.module.scss';

function CheckboxSmall({ label, checked, onChange, enabled = true, styles = CheckboxStyles }: CheckboxWithStyleProps) {
    const { checkbox, input, icon, frame, tick, text } = styles;
    return (
        <label className={`${enabled ? '' : 'opacity-50'} ${checkbox}`}>
            <input className={input} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} disabled={!enabled} />
            <svg className={icon} viewBox="0 0 22 22">
                <rect className={frame} width="100%" height="100%" x=".5" y=".5" rx="3" />
                <path className={tick} d="M4.7 11l5 5 9-9" style={{transform: 'scale(.9) translate(1px, 1px)'}} />
            </svg>
            <span className={text}>{label}</span>
        </label>
    );
}

export default CheckboxSmall;
