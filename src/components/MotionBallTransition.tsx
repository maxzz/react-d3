import React from 'react';
import * as d3 from 'd3';
import { css } from '@stitches/react';
import { IconRefresh } from './ui/ActionButtons';

type Datum = number;
//let DATA = d3.range(130).map(_ => Math.random());
let DATA = d3.range(13).map((_, i) => i / 5);
console.log(DATA);

const style = css({
    fill: '#5993da',
    stroke: 'white',
    strokeWidth: '1',
});

type API = {
    update: () => void;
};

const Body = React.forwardRef(function(_props, refAPI: React.Ref<API>) {
    const refSvg = React.useRef<SVGSVGElement>(null);

    const WIDTH = 300;
    const HEIGHT = 300;

    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    const inset = 30;
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const bandTop = margin.top + 50;

    const domain = d3.extent(DATA, d => d) as [number, number];

    const xScale = d3.scaleBand().domain(DATA.map((_, i) => `${i}`)).range([margin.left, margin.left + innerWidth]).paddingInner(.7);
    const yScale = d3.scaleLinear().domain(domain).range([0, innerHeight - bandTop]);
    //const yScale = d3.scaleLinear().domain(domain).range([margin.top + innerHeight, margin.top]);

    function bars(svgEl: SVGSVGElement) {
        const svg = d3.select(svgEl);
        //svg.selectAll('g').remove();

        let g = svg.select('g');
        if (g.empty()) {
            svg.append('g');
            g = svg.select('g');
        }

        const bars = g
            .selectAll('.bar')
            .data(DATA)
            .join('rect')
            .attr('class', `bar ${style()}`)

            .attr('x', (d, i): number => xScale('' + i) || 0)
            .attr('y', d => bandTop)
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(d));
    }

    React.useImperativeHandle(refAPI, () => ({
        update: () => {
            console.log('33');
            DATA = d3.range(13).map(_ => Math.random());
            refSvg.current && bars(refSvg.current);
        }
    }));

    React.useEffect(() => {
        refSvg.current && bars(refSvg.current);
    }, []);

    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={refSvg}>
        </svg>
    );
});

function MotionBallTransition() {
    const ref = React.useRef<API>(null);
    return (
        <div className="">
            <div className="bg-blue-400">
                <Body ref={ref} />
            </div>
            <button className="mt-1 p-0.5 w-6 h-6 border rounded border-gray-400 active:scale-[.97]"
                onClick={() => ref.current?.update()}
            >
                <IconRefresh />
            </button>
        </div>
    );
}

export default MotionBallTransition;
