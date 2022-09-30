import React, { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import * as d3 from 'd3';
import { css } from '@/stitches.config';
import { Checkbox } from '@ui/Checkbox';
import { ButtonQuick } from '@ui/ButtonQuick';
import { Slider } from '@ui/Slider';
import { BarsChart } from '@/store';

type Datum = number;
let DATA = d3.range(5).map((_, i) => (i + 1) / 5);
//console.log(DATA);

const style = css({
    fill: '#5993da',
    stroke: 'white',
    strokeWidth: '1',
});

type BodyAPI = {
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
    nBars?: number;
    onNBarsChanged: (n: number) => void;
    sorted?: boolean;
    randomN: boolean;
};

const Body = forwardRef(function (props: BodyProps, refAPI: Ref<BodyAPI>) {
    const { nBars = 12, onNBarsChanged, sorted = false, randomN = true } = props;

    const refSvg = useRef<SVGSVGElement>(null);

    useEffect(() => {
        updateSVG(nBars, sorted);
    }, [nBars, sorted]);

    useImperativeHandle(refAPI, () => ({
        update: () => {
            if (randomN) {
                const total = d3.randomInt(5, 20)();
                onNBarsChanged(total);
            } else {
                updateSVG(nBars, sorted);
            }
        }
    }), [nBars, sorted, randomN, onNBarsChanged]);

    const updateSVG = useCallback(
        (nBars: number, sorted: boolean) => {
            if (!refSvg.current) { return; }

            DATA = d3.range(nBars).map(_ => Math.random());
            sorted && DATA.sort((a, b) => d3.ascending(a, b));

            bars(refSvg.current, DATA);
        }, [],
    );

    return <svg ref={refSvg} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} />;
});

const storeSelector = (store: BarsChart.Store) => ({
    nBars: store.nBars,
    sorted: store.sorted,
    randomN: store.randomN,
    setNBars: store.setNBars,
    setSorted: store.setSorted,
    setRandomN: store.setRandomN,
});

export function Demo3_FunBarsChart() {
    const bodyApiRef = useRef<BodyAPI>(null);
    const { nBars, setNBars, sorted, setSorted, randomN, setRandomN } = BarsChart.useStore(storeSelector);
    return (
        <div className="p-1 w-[30rem] border rounded border-white/50 shadow">
            <div className="bg-white/10">
                <Body ref={bodyApiRef} nBars={nBars} onNBarsChanged={setNBars} sorted={sorted} randomN={randomN} />
            </div>
            <div className="mt-2 flex items-center space-x-4">
                <ButtonQuick title="Update view" onClick={() => bodyApiRef.current?.update()} />

                <Slider label="Bars" labelWidth="2.5rem" value={nBars} onChange={(value) => setNBars(value)} step={1} min={2} max={120} />
                <Checkbox label="Update quantity" checked={randomN} onChange={setRandomN} title="Update # of bars during update" />
                <Checkbox label="Sort" checked={sorted} onChange={setSorted} title="Sort after update" />
            </div>
        </div>
    );
}
