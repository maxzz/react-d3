import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function AxisX() {
    const gEl = useRef<SVGGElement>(null);

    useEffect(() => {
        d3render();
    }, []);

    function d3render() {
        if (gEl.current) {
            let xScale = d3.scaleLinear().domain([0, 20]).range([0, 200]);
            let axisX = d3.axisBottom(xScale);

            d3.select(gEl.current)
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
        <div>
            <svg>
                <AxisX />
            </svg>
        </div>
    );
}

export default MotionBallTransition;
