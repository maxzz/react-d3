import React from 'react';
//import './Slider.scss'; // TODO: does not work this way. later.

export type SliderProps = {
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    labelWidth?: string;
    lStyles?: React.CSSProperties; // styles for label before the main input control
    rStyles?: React.CSSProperties; // styles for number after the main input control
};

export type CheckboxProps = {
    className?: string;
    label: string;
    enabled?: boolean;
    value: boolean;
    onChange: (v: boolean) => void;
};
