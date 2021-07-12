import React from 'react';
import { curveCatmullRomClosed, curveLinearClosed, lineRadial, randomUniform } from 'd3';
import './Slider.scss';

type ShapeParams = {
    nRays: number;
    iRadius: number;
    oRadius: number;
    smooth: boolean;
};

type RandomizeParams = {
    inner: boolean;
    outer: boolean;
    update: number; // any new number will update the shape.
};

type InterpolatedShapeProps = {
    shape: ShapeParams;
    randomize: RandomizeParams;
    showOuter: boolean;
};

const VIEWBOX_SIZE = 200;

function InterpolatedShape({ shape, showOuter }: InterpolatedShapeProps) {
    const { nRays, iRadius, oRadius, smooth } = shape;

    const path = React.useMemo(() => {
        const step = 2 * Math.PI / (nRays * 2);
        const points: [number, number][] = [];
        for (let i = 0; i < nRays * 2; i++) {
            //points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
            //points.push([i * step, randomUniform(oRadius, iRadius)()]);
            points.push([i * step, i % 2 === 0 ? randomUniform(iRadius, oRadius)() : iRadius]);
        }
        const outerPts: [number, number][] = points.filter((_, idx) => idx % 2 === 0).map(([a, r]) => {
            return [r * Math.sin(a), r * -Math.cos(a)];
        });

        let gen = lineRadial();
        gen = smooth ? gen.curve(curveCatmullRomClosed) : gen.curve(curveLinearClosed);

        return [gen(points) || '', outerPts] as const;
    }, [nRays, iRadius, oRadius, smooth]);

    return (
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${-VIEWBOX_SIZE / 2} ${-VIEWBOX_SIZE / 2} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}>
            <path className="" d={path[0]} />

            {showOuter &&
                <g stroke="white" strokeWidth=".5" fill="none">
                    {path[1].map(([x, y], idx) => <circle cx={x} cy={y} r={5} key={idx} />)}
                </g>
            }
        </svg>
    );
}

function Slider({ value, onChange, label }: { value: number, onChange: (v: number) => void; label: string; }) {
    return (
        <div className="flex items-center text-sm text-gray-800">
            <div className="w-24">{label}</div>
            <div className="flex items-center"><input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} /></div>
            <div className="ml-4">{value}</div>
        </div>
    );
}

function Checkbox({ className, label, value, onChange }: { className?: string, label: string, value: boolean, onChange: (v: boolean) => void; }) {
    return (
        <label className={`flex items-center text-sm ${className}`}>
            <input className="mr-1" type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
            {label}
        </label>

    );
}

function StarD3Interpolated() {
    const [nRays, setURays] = React.useState(7);
    const [iRadius, setIRadius] = React.useState(60);
    const [oRadius, setORadius] = React.useState(87);
    const [smooth, setSmooth] = React.useState(true);
    const shape = {
        nRays,
        iRadius,
        oRadius,
        smooth,
    };

    const [iRandom, setIRandom] = React.useState(false);
    const [oRandom, setORandom] = React.useState(false);
    const randomize: RandomizeParams = {
        inner: iRandom,
        outer: oRandom,
        update: 0,
    };

    const [showOuter, setShowOuter] = React.useState(false);

    return (
        <div className="p-2 flex select-none">
            <div className="w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200"
                style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}
            >
                <InterpolatedShape shape={shape} randomize={randomize} showOuter={showOuter} />
            </div>
            <div className="mx-2 p-2 flex flex-col justify-between">
                <div className="">
                    <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                    <Slider label="Inner radius" value={iRadius} onChange={(v) => setIRadius(v)} />
                    <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
                </div>

                <div className="">
                    <Checkbox className="" label="Smooth lines" value={smooth} onChange={setSmooth} />
                    <Checkbox className="" label="Randomize outer and inner radius" value={iRandom} onChange={setIRandom} />
                    <Checkbox className="" label="Randomize outer radius" value={oRandom} onChange={setORandom} />
                    <Checkbox className="" label="Show outer points" value={showOuter} onChange={setShowOuter} />
                </div>

            </div>
        </div>
    );
}

export default StarD3Interpolated;
