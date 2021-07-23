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
        <g ref={gEl} transform={`translate(30,0)`}>
        </g>
    );
}

const datum = d3.range(100).map(_ => [Math.random(), Math.random()]);

function ScatterPlot({ data }: { data: typeof datum; }) {
    const xSale = d3.scaleLinear().domain([0, 1]).range([0, 200]);
    const ySale = d3.scaleLinear().domain([0, 1]).range([0, 200]);
    return (
        <g>
            {data.map(item => (
                <circle cx={xSale(item[0])} cy={ySale(item[1])} r="5" />
            ))}
        </g>
    );
}

function MotionBallTransition() {
    return (
        <div className="bg-blue-400">
            <svg>
                <AxisX direction="axisLeft" />
                <ScatterPlot data={datum} />
            </svg>
        </div>
    );
}

export default MotionBallTransition;
