import React, { SVGAttributes, useEffect, useRef } from 'react';
import * as d3 from 'd3';

type AxisProps = {
    direction: 'axisLeft' | 'axisRight' | 'axisTop' | 'axisBottom';
    scale: Scale;
    attrs?: SVGAttributes<SVGGElement>;
};

type Scale = d3.ScaleLinear<number, number>;

function AxisX({ direction, scale, attrs = {} }: AxisProps) {
    const gRef = useRef<SVGGElement>(null);

    useEffect(() => {
        function d3render(el: SVGGElement) {
            const axisX = d3[direction](scale);
            d3.select(el).call(axisX);
        }

        gRef.current && d3render(gRef.current);
    }, [direction, scale]);

    return <g ref={gRef} {...attrs} > {/* style={{ outline: '1px solid red' }} */} </g>;
}

const datum = d3.range(200).map(_ => [Math.random(), Math.random()]);

type Datum = typeof datum;

function ScatterPlot({ data, width, height, xScale, yScale }: { data: Datum; width: number, height: number; xScale: Scale; yScale: Scale; }) {
    return (
        <g>
            <rect width={width} height={height} fill="rgb(147, 197, 253)" /> {/* #f707 */}
            {data.map((item, idx) => (
                <circle
                    cx={xScale(item[0])}
                    cy={yScale(item[1])}
                    r="3"
                    fill='#fff'
                    stroke="rebeccapurple"
                    strokeWidth={1}
                    key={idx}
                />
            ))}
        </g>
    );
}

export function MotionBallTransition() {
    const WIDTH = 400;
    const HEIGHT = 300;

    const inner = 30;
    const margin = { left: inner, top: inner, right: inner, bottom: inner };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.right;

    const xScale = d3.scaleLinear().domain([0, 1]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([innerHeight, 0]);

    return (
        <div className="bg-blue-400">
            <svg width={WIDTH} height={HEIGHT}>
                <AxisX attrs={{ transform: `translate(${margin.left},${margin.top})` }} direction="axisLeft" scale={yScale} />
                <AxisX attrs={{ transform: `translate(${margin.left},${margin.top + innerHeight})` }} direction="axisBottom" scale={xScale} />

                <g transform={`translate(${margin.left},${margin.top})`} > {/* style={{ outline: '1px solid red' }} */}
                    <ScatterPlot data={datum} width={innerWidth} height={innerHeight} xScale={xScale} yScale={yScale} />
                </g>
            </svg>
        </div>
    );
}
