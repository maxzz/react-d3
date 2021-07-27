import React from 'react';
import { downloadTextAsFile } from '../utils/download-data';
import { generatePath, generateSVG, RandomizeParams, ShapeParams, viewboxCentered } from '../utils/ngonGenerator';
import { CheckboxProps, SliderProps } from './ui/ui-props';
import './ui/slider/Slider.scss';
import { IconRefresh, IconSave } from './ui/ButtonIcons';
import ButtonQuick from './ButtonQuick';
// import { default as Checkbox2 } from './ui/Checkbox';

const VIEWBOX_SIZE = 200;

type InterpolatedShapeProps = {
    shape: ShapeParams;
    randomize: RandomizeParams;
    showOuter: boolean;
};

type InterpolatedShapeActions = {
    save: () => void;
};

function InterpolatedShapeRaw({ shape, randomize, showOuter }: InterpolatedShapeProps, ref: React.Ref<InterpolatedShapeActions>) {
    const { nRays, iRadius, oRadius, smooth } = shape;
    const { inner, outer, update, } = randomize;

    const path = React.useMemo(() => {
        return generatePath(shape, randomize);
    }, [nRays, iRadius, oRadius, smooth, inner, outer, update,]);

    React.useImperativeHandle(ref, () => ({
        save: () => {
            downloadTextAsFile(generateSVG({ path: path[0], outerPoints: showOuter ? path[1] : [], size: VIEWBOX_SIZE }), 'red3.svg');
        }
    }));

    return (
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${viewboxCentered(VIEWBOX_SIZE)}`}>
            <path className="" d={path[0]} />

            {showOuter &&
                <g stroke="white" strokeWidth=".5" fill="none">
                    {path[1].map(([x, y], idx) => <circle cx={x} cy={y} r={5} key={idx} />)}
                </g>
            }
        </svg>
    );
}

const InterpolatedShape = React.forwardRef(InterpolatedShapeRaw);

function Slider({ value, onChange, label, min = 0, max = 100, step = 1 }: SliderProps) {
    return (
        <div className="flex items-center text-sm text-gray-800">
            <div className="w-24">{label}</div>
            <div className="flex items-center">
                <input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} min={min} max={max} step={step} />
            </div>
            <div className="min-w-[2rem] text-right">{value}</div>
        </div>
    );
}

function Checkbox({ className, label, enabled = true, checked: value, onChange }: CheckboxProps) {
    return (
        <label className={`flex items-center text-sm ${enabled ? '' : 'opacity-50'} ${className}`}>
            <input className="mr-1" type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
            {label}
        </label>
    );
}

function StarD3Interpolated() {
    const [nRays, setURays] = React.useState(21);
    const [iRadius, setIRadius] = React.useState(89);
    const [oRadius, setORadius] = React.useState(7);
    const [smooth, setSmooth] = React.useState(true);
    const shape = {
        nRays,
        iRadius,
        oRadius,
        smooth,
    };

    const [iRandom, setIRandom] = React.useState(true);
    const [oRandom, setORandom] = React.useState(true);
    const [update, setUpdate] = React.useState(0);
    const randomize: RandomizeParams = {
        inner: iRandom,
        outer: oRandom,
        update,
    };

    const [showOuter, setShowOuter] = React.useState(false);

    function onRandomBoth(v: boolean) {
        setIRandom(v);
        v && setORandom(v);
    }

    function onRandomOuter(v: boolean) {
        setIRandom(false);
        setORandom(v);
    }

    const genCb = React.useRef<InterpolatedShapeActions>(null);

    return (
        <div className="w-[30rem] flex select-none">
            {/* Shape */}
            <div
                className="w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200"
                style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}
            >
                <InterpolatedShape shape={shape} randomize={randomize} showOuter={showOuter} ref={genCb} />
            </div>
            {/* Controls */}
            <div className="mx-2 p-2 flex flex-col justify-between">
                {/* Sliders */}
                <div className="">
                    <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                    <Slider label="Inner radius" value={iRadius} min={-100} onChange={(v) => setIRadius(v)} />
                    <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
                </div>
                {/* Options */}
                <div className="relative">
                    {/* <Checkbox2 label={'Smooth lines'} /> */}
                    <Checkbox label="Smooth lines" checked={smooth} onChange={setSmooth} />
                    <Checkbox label="Randomize outer and inner radius" checked={iRandom} onChange={onRandomBoth} />
                    <Checkbox label="Randomize outer radius" checked={oRandom} onChange={onRandomOuter} />
                    <Checkbox label="Show outer points" checked={showOuter} onChange={setShowOuter} />
                    {/* Actions */}
                    <div className="absolute text-sm bottom-0 right-0 space-x-1">
                        <ButtonQuick classes="w-7 h-7" icon={<IconSave />} onClick={() => genCb?.current?.save()} />
                        <ButtonQuick classes="w-7 h-7" icon={<IconRefresh />} onClick={() => setUpdate(v => v + 1)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarD3Interpolated;
