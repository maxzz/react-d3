import React from 'react';
import { lineRadial } from 'd3';

function StarD3Interpolated() {
    
    const nRays = 15;
    const iRadius = 20;
    const oRadius = 40;
    const step = 2 * Math.PI / (nRays * 2);

    const points: [number, number][] = [];
    for (let i = 0; i < nRays * 2; i++) {
        points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
    }

    const path = lineRadial()(points) || '';

    return (
        <div className="w-32 h-32 bg-red-100 text-blue-600">
            <svg className="" fill="currentColor" viewBox="0 0 100 100">
                <path className="translate-x-[50px] translate-y-[50px]" d={path} />
            </svg>
        </div>
    );
}

export default StarD3Interpolated;

