import React from 'react';
import * as d3 from 'd3';
import { css } from '@stitches/react';
import { IconRefresh } from './ui/ActionButtons';
import Checkbox from './ui/Checkbox';

type Datum = number;
let DATA = d3.range(5).map((_, i) => (i + 1) / 5);
//console.log(DATA);

const style = css({
    fill: '#5993da',
    stroke: 'white',
    strokeWidth: '1',
});

type API = {
    update: () => void;
};

const WIDTH = 600;
const HEIGHT = 300;

const margin = { left: 20, top: 20, right: 20, bottom: 20 };
const inset = 30;
const innerWidth = WIDTH - margin.left - margin.right;
const innerHeight = HEIGHT - margin.top - margin.bottom;
const bandTop = margin.top + 50;

function bars(svgEl: SVGSVGElement, DATA: Datum[]) {
    const domain = d3.extent(DATA, d => d) as [number, number];
    domain[0] =  0;

    const xScale = d3.scaleBand().domain(DATA.map((_, i) => `${i}`)).range([margin.left, margin.left + innerWidth]).paddingInner(.2);
    const yScale = d3.scaleLinear().domain(domain).range([bandTop, margin.top + innerHeight - bandTop]);

    const svg = d3.select(svgEl);
    //svg.selectAll('g').remove();

    let g = svg.select('g');
    if (g.empty()) {
        svg.append('g');
        g = svg.select('g');
    }

    function mouseOver(this: d3.BaseType, event: MouseEvent, d: number): void {
        const [x, y] = d3.pointer(event, this);
        g.append('text')
            .attr('class', 'hint')
            .attr('x', x)
            .attr('y', y + 20)
            .text(`${x} x ${y} => ${d}`);
    }

    function mouseOut(this: d3.BaseType, event: Event, d: number): void {
        g.selectAll('.hint').remove();
    }

    g
        .selectAll('.bar')
        .data(DATA)
        .join('rect')
        .attr('class', `bar ${style()}`)
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)

        .attr('x', (d, i): number => xScale('' + i) || 0)
        .attr('y', d => bandTop)
        .transition()
        .duration(400)
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(d));
}

const Body = React.forwardRef(function (_props, refAPI: React.Ref<API>) {
    const refSvg = React.useRef<SVGSVGElement>(null);

    React.useImperativeHandle(refAPI, () => ({
        update: () => {
            const total = d3.randomInt(5, 20)();
            DATA = d3.range(total).map(_ => Math.random());
            refSvg.current && bars(refSvg.current, DATA);
        }
    }));

    React.useEffect(() => {
        refSvg.current && bars(refSvg.current, DATA);
    }, []);

    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={refSvg}>
        </svg>
    );
});

function MotionBallTransition() {
    const ref = React.useRef<API>(null);
    const [sorted, setSorted] = React.useState(false);
    return (
        <div className="w-[30rem]">
            <div className="bg-blue-400">
                <Body ref={ref} />
            </div>
            <div className="flex space-x-2">
                <button className="mt-1 p-0.5 w-6 h-6 border rounded border-gray-400 active:scale-[.97]"
                    onClick={() => ref.current?.update()}
                >
                    <IconRefresh />
                </button>
                <Checkbox label="Sorted" checked={sorted} onChange={setSorted} />
            </div>
        </div>
    );
}

export default MotionBallTransition;
