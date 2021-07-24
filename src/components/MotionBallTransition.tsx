import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Body() {
    const ref = React.useRef(null);

    const WIDTH = 400;
    const HEIGHT = 300;

    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    const inset = 30;
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={ref}>
            <circle cx={100} cy={100} r={5}/>
        </svg>
    );
}

function MotionBallTransition() {
    return (
        <div className="bg-blue-400">
            <Body />
        </div>
    );
}

export default MotionBallTransition;
