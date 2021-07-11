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

const SIZE = 200;

function InterpolatedShape({ shape }: InterpolatedShapeProps) {
    const path = React.useMemo(() => {
        const { nRays,
            iRadius,
            oRadius,
        } = shape;
    
        const step = 2 * Math.PI / (nRays * 2);
    
        const points: [number, number][] = [];
        for (let i = 0; i < nRays * 2; i++) {
            points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
        }
    
        return lineRadial()(points) || '';
    }, [shape]);

    return (
        <svg className="" fill="currentColor" viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}>
            <path className="" d={path} />
        </svg>
    );
}

function Slider({ value, onChange, label }: { value: number, onChange: (v: number) => void; label: string }) {
    return (
        <div className="flex text-sm">
            <div className="w-24">{label}</div>
            <input type="range" value={value} onChange={(e) => onChange(+e.target.value)} />
            <div className="ml-1">{value}</div>
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
            <div className="w-40 h-40 bg-red-100 text-blue-600">
                <InterpolatedShape shape={shape} />
            </div>
            <div className="mx-2 p-2 bg-yellow-100">
                <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                <Slider label="Inner radius" value={iRadius} onChange={(v) => setIRadius(v)} />
                <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
            </div>
        </div>
    );
}

export default StarD3Interpolated;
