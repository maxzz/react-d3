import React from 'react';
import * as d3 from 'd3';

type Datum = number;
const DATA = d3.range(3).map(_ => Math.random());

function Body() {
    const ref = React.useRef<SVGSVGElement>(null);

    const WIDTH = 400;
    const HEIGHT = 300;

    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    const inset = 30;
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const xScale = d3.scaleBand().domain(DATA.map((_, i) => `${i}`)).range([margin.left, margin.left + innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([margin.top, margin.top + innerHeight]);

    function bars(svgEl: SVGSVGElement) {
        const svg = d3.select(svgEl);
        const g = svg.append('g')
            .selectAll('.bar')
            .data(DATA)
            .enter()
            .append('rect')
            .attr('x', (d, i): number => xScale(''+i) || 0)
            .attr('y', d => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => HEIGHT - yScale(d));

    }

    React.useEffect(() => {
        ref.current && bars(ref.current);
    }, []);

    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={ref}>
            <circle cx={100} cy={100} r={5} />
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
