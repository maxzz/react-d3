import React from 'react';
import { SliderProps } from './ui-props';

function Slider({ value, onChange, label, min = 0, max = 100, step = 1, labelWidth }: SliderProps) {
    return (
        <div className="flex items-center text-sm text-gray-800">
            <div style={{ ...(labelWidth && {width: labelWidth }) }}>{label}</div>
            <div className="flex items-center">
                <input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} min={min} max={max} step={step} />
            </div>
            <div className="min-w-[2rem] text-right">{value}</div>
        </div>
    );
}

export default Slider;
