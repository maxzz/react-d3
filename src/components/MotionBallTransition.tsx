import React from 'react';
import * as d3 from 'd3';
import { css } from '@stitches/react';

type Datum = number;
//const DATA = d3.range(100).map(_ => Math.random());
const DATA = d3.range(3).map((_, i) => i/2);

const style = css({
    fill: 'none',
    stroke: 'white',
    strokeWidth: '1',
});

function Body() {
    const ref = React.useRef<SVGSVGElement>(null);

    const WIDTH = 300;
    const HEIGHT = 300;

    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    const inset = 30;
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const xScale = d3.scaleBand().domain(DATA.map((_, i) => `${i}`)).range([margin.left, margin.left + innerWidth]).paddingInner(.1);
    const yScale = d3.scaleLinear().domain([0, 1]).range([margin.top + innerHeight, margin.top]);

    function bars(svgEl: SVGSVGElement) {
        const svg = d3.select(svgEl);
        svg.selectAll('g').remove();
        
        const g = svg.append('g')
            .selectAll('.bar')
            .data(DATA)
            .enter()
            .append('rect')
            .attr('class', `bar ${style()}`)
            .attr('x', (d, i): number => xScale('' + i) || 0)
            .attr('y', d => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => HEIGHT - yScale(d));
    }

    React.useEffect(() => {
        ref.current && bars(ref.current);
    }, []);

    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={ref}>
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
