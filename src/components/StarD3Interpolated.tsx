import React from 'react';
import { lineRadial, randomUniform } from 'd3';
import './Slider.scss';

type ShapeParams = {
    nRays: number;
    iRadius: number;
    oRadius: number;
};

type InterpolatedShapeProps = {
    shape: ShapeParams;
    showOuter: boolean;
};

const VIEWBOX_SIZE = 200;

function InterpolatedShape({ shape, showOuter }: InterpolatedShapeProps) {
    const { nRays, iRadius, oRadius, } = shape;

    const path = React.useMemo(() => {
        const step = 2 * Math.PI / (nRays * 2);
        const points: [number, number][] = [];
        for (let i = 0; i < nRays * 2; i++) {
            // points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
            // points.push([i * step, randomUniform(oRadius, iRadius)()]);
            points.push([i * step, i % 2 === 0 ? randomUniform(iRadius, oRadius)() : iRadius]);
        }
        const outerPts: [number, number][] = points.filter((_, idx) => idx % 2 === 0).map(([a, r]) => {
            return [r * Math.sin(a), r * -Math.cos(a)];
        });
        return [lineRadial()(points) || '', outerPts] as const;
    }, [nRays, iRadius, oRadius]);

    return (
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${-VIEWBOX_SIZE / 2} ${-VIEWBOX_SIZE / 2} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}>
            <path className="" d={`${path[0]}z`} />

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

function StarD3Interpolated() {
    const [nRays, setURays] = React.useState(7);
    const [iRadius, setIRadius] = React.useState(60);
    const [oRadius, setORadius] = React.useState(87);
    const [showOuter, setShowOuter] = React.useState(false);

    const shape = { nRays, iRadius, oRadius, };

    return (
        <div className="p-2 flex select-none">
            <div className="w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200"
                style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}
            >
                <InterpolatedShape shape={shape} showOuter={showOuter} />
            </div>
            <div className="mx-2 p-2">
                <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                <Slider label="Inner radius" value={iRadius} onChange={(v) => setIRadius(v)} />
                <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
                <label className="mt-1 flex items-center text-sm">
                    <input className="mr-1" type="checkbox" checked={showOuter} onChange={(e) => setShowOuter(e.target.checked)} />
                    Show outer
                </label>
            </div>
        </div>
    );
}

export default StarD3Interpolated;
