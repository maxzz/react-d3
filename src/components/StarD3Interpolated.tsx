import React from 'react';
import { lineRadial } from 'd3';
import Slider from './Sider';
// import { styled } from '@stitches/react';
// import * as Slider from '@radix-ui/react-slider';

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
        <svg className="" fill="currentColor" viewBox="0 0 100 100">
            <path className="translate-x-[50px] translate-y-[50px]" d={path} />
        </svg>
    );
}

function StarD3Interpolated() {
    const shape = {
        nRays: 15,
        iRadius: 20,
        oRadius: 40,
    };

    return (
        <div className="">
            {/* <Slider.Root>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb />
            </Slider.Root> */}

            <Slider />

            <div className="w-32 h-32 bg-red-100 text-blue-600">
                <InterpolatedShape shape={shape} />
            </div>
        </div>
    );
}

export default StarD3Interpolated;
