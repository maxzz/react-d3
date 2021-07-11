import React from 'react';
import { lineRadial } from 'd3';

type ShapeParams = {
    nRays: number;
    iRadius: number;
    oRadius: number;
};

type InterpolatedShapeProps = {
    shape: ShapeParams;
};

function InterpolatedShape({ shape }: InterpolatedShapeProps) {
    const { nRays,
        iRadius,
        oRadius,
    } = shape;

    const step = 2 * Math.PI / (nRays * 2);

    const points: [number, number][] = [];
    for (let i = 0; i < nRays * 2; i++) {
        points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
    }

    const path = lineRadial()(points) || '';

    return (
        <svg className="" fill="currentColor" viewBox="-50 -50 100 100">
            <path className="" d={path} />
        </svg>
    );
}

function Slider({ value, onChange, label }: { value: number, onChange: (v: number) => void; label: string }) {
    return (
        <div className="flex">
            <div className="">{label}</div>
            <input type="range" value={value} onChange={(e) => onChange(+e.target.value)} />
            <div className="">{value}</div>
        </div>
    );
}

function StarD3Interpolated() {
    const [nRays, setURays] = React.useState(15);
    const [iRadius, setIRadius] = React.useState(20);
    const [oRadius, setORadius] = React.useState(40);

    const shape = {
        nRays,
        iRadius,
        oRadius,
    };

    return (
        <div className="flex">
            <div className="w-32 h-32 bg-red-100 text-blue-600">
                <InterpolatedShape shape={shape} />
            </div>
            <div className="mx-2 bg-yellow-100">
                <Slider label="nRays" value={nRays} onChange={(v) => setURays(v)} />
                <Slider label="iRadius" value={iRadius} onChange={(v) => setIRadius(v)} />
                <Slider label="oRadius" value={oRadius} onChange={(v) => setORadius(v)} />
            </div>
        </div>
    );
}

export default StarD3Interpolated;
