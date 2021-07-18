//import './Slider.scss'; // TODO: does not work this way. later.

export type SliderProps = {
    value: number;
    onChange: (v: number) => void;
    label: string;
    min?: number;
    max?: number;
    step?: number;
};

export type CheckboxProps = {
    className?: string;
    label: string;
    enabled?: boolean;
    value: boolean;
    onChange: (v: boolean) => void;
};
