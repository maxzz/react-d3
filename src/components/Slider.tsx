import './Slider.scss';

export type SliderProps = {
    value: number;
    onChange: (v: number) => void;
    label: string;
    min?: number;
    max?: number;
    step?: number;
};
