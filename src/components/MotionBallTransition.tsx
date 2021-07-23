import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type AxisProps = {
    direction: 'axisLeft' | 'axisRight' | 'axisTop' | 'axisBottom';
};

function AxisX({ direction }: AxisProps) {
    const gEl = useRef<SVGGElement>(null);

    useEffect(() => {
        d3render();
    }, [direction]);

    function d3render() {
        if (gEl.current) {
            let xScale = d3.scaleLinear().domain([0, 20]).range([0, 200]);
            let axisX = d3[direction](xScale);

            d3.select(gEl.current).call(axisX);
        }
    }

    return (
        <g ref={gEl} transform={`translate(30,0)`} style={{ outline: '1px solid red' }}>
        </g>
    );
}

const datum = d3.range(100).map(_ => [Math.random(), Math.random()]);
type Datum = typeof datum;

function ScatterPlot({ data, width, height }: { data: Datum; width: number, height: number; }) {
    const xSale = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const ySale = d3.scaleLinear().domain([0, 1]).range([0, height]);
    return (
        <g>
            <rect width={width} height={height} fill="#f707" />
            {data.map(item => (
                <circle cx={xSale(item[0])} cy={ySale(item[1])} r="5" />
            ))}
        </g>
    );
}

function MotionBallTransition() {
    const WIDTH = 400;
    const HEIGHT = 300;

    const inner = 10;
    const margin = { left: inner, top: inner, right: inner, bottom: inner };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.right;
    return (
        <div className="bg-blue-400">
            <svg width={WIDTH} height={HEIGHT}>
                <AxisX direction="axisLeft" />
                <g transform={`translate(${margin.left},${margin.top})`} style={{ outline: '1px solid red' }}>
                    <ScatterPlot data={datum} width={innerWidth} height={innerHeight} />
                </g>
            </svg>
        </div>
    );
}

export default MotionBallTransition;
