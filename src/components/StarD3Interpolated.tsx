import React from 'react';
import { curveCatmullRomClosed, curveLinearClosed, lineRadial, randomUniform } from 'd3';
import './Slider.scss';
import { saveTextData } from '../utils/save-data';
import { reduceIndentByLast } from '../utils/indentation';

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
    save: number; // any new number different from zero will trigger the shape.
};

type InterpolatedShapeProps = {
    shape: ShapeParams;
    randomize: RandomizeParams;
    showOuter: boolean;
};

const VIEWBOX_SIZE = 200;

function viewboxString(size: number) {
    return `${-size / 2} ${-size / 2} ${size} ${size}`;
}

function generateSVG({ path, outerPoints, size }: { path: string; outerPoints: [number, number][]; size: number; }) {
    const viewbox = viewboxString(size);
    const circles = () => outerPoints.map(([x, y]) => `            <circle r="5" cx="${x}" cy="${y}" />`).join('\n');
    let s = 
    `<svg viewBox="${viewbox}" width="256px" height="256px" stroke="#8c00ff" strokeWidth="2" fill="#9494e4" xmlns="http://www.w3.org/2000/svg">
        <path
            d="${path}"
        />${outerPoints.length ? `\n        <g stroke="#7c82ff80" strokeWidth=".5" fill="none">\n${circles()}\n        </g>` : ''}
    </svg>
    `;
    return reduceIndentByLast(s);
}

function InterpolatedShape({ shape, randomize, showOuter }: InterpolatedShapeProps) {
    const { nRays, iRadius, oRadius, smooth } = shape;
    const { inner, outer, update, save, } = randomize;

    const path = React.useMemo(() => {
        const step = 2 * Math.PI / (nRays * 2);
        const points: [number, number][] = [];
        for (let i = 0; i < nRays * 2; i++) {
            if (inner && outer) {
                points.push([i * step, randomUniform(oRadius, iRadius)()]);
            } else
                if (outer) {
                    points.push([i * step, i % 2 === 0 ? randomUniform(iRadius, oRadius)() : iRadius]);
                } else {
                    points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
                }
        }
        const outerPts: [number, number][] = points.filter((_, idx) => idx % 2 === 0).map(([a, r]) => {
            return [r * Math.sin(a), r * -Math.cos(a)];
        });

        let gen = lineRadial();
        gen = smooth ? gen.curve(curveCatmullRomClosed) : gen.curve(curveLinearClosed);

        return [gen(points) || '', outerPts] as const;
    }, [nRays, iRadius, oRadius, smooth, inner, outer, update,]);

    React.useEffect(() => {
        if (save) {
            saveTextData(generateSVG({ path: path[0], outerPoints: showOuter ? path[1] : [], size: VIEWBOX_SIZE }), 'red3.svg');
        }
    }, [save]);

    return (
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${viewboxString(VIEWBOX_SIZE)}`}>
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

type CheckboxProps = {
    className?: string;
    label: string;
    enabled?: boolean;
    value: boolean;
    onChange: (v: boolean) => void;
};

function Checkbox({ className, label, enabled = true, value, onChange }: CheckboxProps) {
    return (
        <label className={`flex items-center text-sm ${enabled ? '' : 'opacity-50'} ${className}`}>
            <input className="mr-1" type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
            {label}
        </label>

    );
}

function IconRefresh() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    );
}

function IconSave() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
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
    const [save, setSave] = React.useState(0);
    const randomize: RandomizeParams = {
        inner: iRandom,
        outer: oRandom,
        update,
        save,
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

    return (
        <div className="p-2 flex select-none">
            {/* Shape */}
            <div
                className="w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200"
                style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}
            >
                <InterpolatedShape shape={shape} randomize={randomize} showOuter={showOuter} />
            </div>
            {/* Controls */}
            <div className="mx-2 p-2 flex flex-col justify-between">
                {/* Sliders */}
                <div className="">
                    <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                    <Slider label="Inner radius" value={iRadius} onChange={(v) => setIRadius(v)} />
                    <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
                </div>
                {/* Options */}
                <div className="relative">
                    <Checkbox className="" label="Smooth lines" value={smooth} onChange={setSmooth} />
                    <Checkbox className="" label="Randomize outer and inner radius" value={iRandom} onChange={onRandomBoth} />
                    <Checkbox className="" label="Randomize outer radius" value={oRandom} onChange={onRandomOuter} />
                    <Checkbox className="" label="Show outer points" value={showOuter} onChange={setShowOuter} />
                    {/* Actions */}
                    <div className="absolute text-sm bottom-0 right-0 space-x-1">
                        <button
                            className="rounded border border-gray-500 p-1 text-green-900 bg-green-100"
                            onClick={() => setSave(v => v + 1)}
                            title="Save"
                        >
                            <IconSave />
                        </button>
                        <button
                            className="rounded border border-gray-500 p-1 text-green-900 bg-green-100"
                            onClick={() => setUpdate(v => v + 1)}
                            title="Update"
                        >
                            <IconRefresh />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarD3Interpolated;
