import React, { CSSProperties } from 'react';
//import './Slider.scss'; // TODO: does not work this way. later.

export type SliderProps = {
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    labelWidth?: string;
    lStyles?: CSSProperties; // styles for label before the main input control
    rStyles?: CSSProperties; // styles for number after the main input control
};

export type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    enabled?: boolean;
    title?: string;

    className?: string;
};

export type CheckboxWithStyleProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    enabled?: boolean;
    title?: string;

    styles?: CSSModuleClasses;
};
