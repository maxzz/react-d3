import React from 'react';

export interface SliderProps {
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    labelWidth?: string;
    onChange: (value: number) => void;
}

function beautifyFloat(v: string) {
    return (v || '').trim().replace(/ /g, '').replace(/^\./, '0.').replace(/\.$/, '.0');
}

type InputRange = {
    min: number;
    max: number;
    step: number;
};

// Keyboard events support

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

interface StepKeys {
    upKey: boolean;
    downKey: boolean;
}

function getStepForKey(baseStep: number, ev: React.KeyboardEvent | KeyboardEvent, keys: StepKeys): number {
    const realStep: number = baseStep * (ev.altKey ? 100 : 1) * (ev.shiftKey ? 10 : 1) * (ev.ctrlKey ? 0.1 : 1); // AI logic: shift: v+step*10; ctrl: v+step*0.1; alt: n/a
    return keys.upKey ? +realStep : keys.downKey ? -realStep : 0;
}

function getVerticalStepKeys(ev: React.KeyboardEvent | KeyboardEvent): StepKeys {
    return {
        upKey: ev.key === 'ArrowUp',
        downKey: ev.key === 'ArrowDown',
    };
}

function getHorizontalStepKeys(ev: React.KeyboardEvent | KeyboardEvent): StepKeys {
    return {
        upKey: ev.key === 'ArrowRight',
        downKey: ev.key === 'ArrowLeft',
    };
}

function getShift4Input(baseStep: number, ev: React.KeyboardEvent | KeyboardEvent): number {
    return getStepForKey(baseStep, ev, getVerticalStepKeys(ev));
}

function useFloatInput(value: number, range: InputRange, onChange: (newValue: number) => void) {
    const [local, setLocal] = React.useState('' + value); // TODO: that is not NaN

    React.useEffect(() => {
        setLocal('' + value);
    }, [value]);

    function setLocalValue(s: string): void {
        setLocal(s);
        let n = +beautifyFloat(s);
        if (!isNaN(n)) {
            onChange(n);
        }
    }

    const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        onChange(+event.target.value);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value);
    };

    const onInputKey = (event: React.KeyboardEvent) => {
        let n = +local;
        if (!isNaN(n)) {
            let shift = getShift4Input(range.step, event);
            shift && setLocalValue('' + clamp(+(n + shift).toFixed(4), range.min, range.max));
        }
    };

    return [local, onSliderChange, onInputChange, onInputKey] as const;
}

export function SliderWithInput({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-5 flex-centered space-x-2 text-xs text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider"
                type="range"
                min={min} max={max} step={step}
                value={value}
                tabIndex={-1}
                onChange={onSliderChange}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </div>
    );
}
