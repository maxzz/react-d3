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

            d3.select(gEl.current)
            .attr('transform', `translate(30,0)`)
                .call(axisX);
        }
    }

    return (
        <g ref={gEl}>
        </g>
    );
}

function MotionBallTransition() {
    return (
        <div className="bg-blue-400">
            <svg>
                <AxisX direction="axisLeft" />
            </svg>
        </div>
    );
}

export default MotionBallTransition;
