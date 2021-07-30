import React from 'react';
import * as d3 from 'd3';
import { css } from '@stitches/react';
import Checkbox from './ui/checkbox/Checkbox';
import ButtonQuick from './ButtonQuick';
import Slider from './ui/slider/Slider';
import BarsChart from '../store';

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
    domain[0] = 0;

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

type BodyProps = {
    sorted?: boolean;
    nBars?: number;
    onNBarsChanged: (n: number) => void;
};

const Body = React.forwardRef(function ({ sorted = false, nBars = 12, onNBarsChanged }: BodyProps, refAPI: React.Ref<API>) {
    const refSvg = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        genData(sorted, nBars);
        refSvg.current && bars(refSvg.current, DATA);
    }, [nBars]);

    function genData(sorted: boolean, nBars: number) {
        //const total = d3.randomInt(5, 20)();
        DATA = d3.range(nBars).map(_ => Math.random());
        if (sorted) {
            DATA.sort((a, b) => d3.ascending(a, b));
        }
    }

    React.useImperativeHandle(refAPI, () => ({
        update: () => {
            const total = d3.randomInt(5, 20)();
            onNBarsChanged(total);

            // DATA = d3.range(total).map(_ => Math.random());
            // if (sorted) {
            //     DATA.sort((a, b) => d3.ascending(a, b));
            // }
            // refSvg.current && bars(refSvg.current, DATA);
        }
    }));

    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={refSvg}>
        </svg>
    );
});

const storeSelector = (store: BarsChart.Store) => ({ nBars: store.nBars, sorted: store.sorted, setNBars: store.setNBars, setSorted: store.setSorted });

function MotionBallTransition() {
    const ref = React.useRef<API>(null);
    const { nBars, setNBars, sorted, setSorted } = BarsChart.useStore(storeSelector);
    return (
        <div className="w-[30rem]">
            <div className="border rounded border-green-200 shadow">
                <Body ref={ref} sorted={sorted} nBars={nBars} onNBarsChanged={setNBars} />
            </div>
            <div className="mt-2 flex items-center space-x-4">
                <ButtonQuick title="Update view" onClick={() => ref.current?.update()} />

                <Slider label="Bars" labelWidth="2.5rem" value={nBars} onChange={(value) => setNBars(value)} step={1} min={2} max={120} />
                <Checkbox label="Sort" checked={sorted} onChange={setSorted} title="Sort after update" />
                {/* <Checkbox label="Update quantity" checked={sorted} onChange={setSorted} title="Update # of bars during update" /> */}
            </div>
        </div>
    );
}

export default MotionBallTransition;
