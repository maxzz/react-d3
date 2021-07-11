import React from 'react';
import { lineRadial } from 'd3';
import './Slider.scss';

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
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}>
            <path className="" d={`${path}z`} />
        </svg>
    );
}

function Slider({ value, onChange, label }: { value: number, onChange: (v: number) => void; label: string; }) {
    return (
        <div className="flex text-sm">
            <div className="w-24">{label}</div>
            <div className=""><input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} /></div>
            <div className="ml-1">{value}</div>
        </div>
    );
}

function StarD3Interpolated() {
    const [nRays, setURays] = React.useState(7);
    const [iRadius, setIRadius] = React.useState(49);
    const [oRadius, setORadius] = React.useState(63);

    const shape = {
        nRays,
        iRadius,
        oRadius,
    };

    return (
        <div className="p-2 flex">
            <div className="w-40 h-40 border-8 border-white bg-gray-800 text-blue-800">
                <InterpolatedShape shape={shape} />
            </div>
            <div className="mx-2 p-2">
                <Slider label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                <Slider label="Inner radius" value={iRadius} onChange={(v) => setIRadius(v)} />
                <Slider label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
            </div>
        </div>
    );
}

export default StarD3Interpolated;
