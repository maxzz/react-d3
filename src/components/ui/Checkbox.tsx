import React from 'react';
import './Checkbox.scss';

function Checkbox({label, checked, onChange}: {label: string, checked: boolean, onChange: (value: boolean) => void}) {
    return (
        <label className="checkbox">
            <input className="checkbox__input" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
            <svg className="checkbox__icon w-14 h-14" viewBox="0 0 22 22">
                <rect width="100%" height="100%" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
                {/* <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" /> */}
                <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
            </svg>
            <span className="checkbox__label">{label}</span>
        </label>
    );
}

export default Checkbox;
