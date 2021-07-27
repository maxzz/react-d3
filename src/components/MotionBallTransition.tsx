import React from 'react';
import * as d3 from 'd3';
import { css, styled } from '@stitches/react';
import { IconRefresh } from './ui/ActionButtons';
import Slider from './ui/SimpleSlider';
import './ui/Slider.scss';
import CheckboxStyles from './ui/CheckboxSmall.module.scss';
import CheckboxSmall from './ui/CheckboxSmall';
import TwCheckboxStitches from './ui/TwCheckboxStitches';

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
};

const Body = React.forwardRef(function ({ sorted = false, nBars = 12 }: BodyProps, refAPI: React.Ref<API>) {
    const refSvg = React.useRef<SVGSVGElement>(null);

    // React.useEffect(() => {
    //     refSvg.current && bars(refSvg.current, DATA);
    // }, []);

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
            DATA = d3.range(total).map(_ => Math.random());
            if (sorted) {
                DATA.sort((a, b) => d3.ascending(a, b));
            }
            refSvg.current && bars(refSvg.current, DATA);
        }
    }));

    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={refSvg}>
        </svg>
    );
});

//https://tailwindcss.com/docs/hover-focus-and-other-states#checked
// const checkboxTick = css({
//     .form-tick:checked {
//         background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e);
//         border-color: transparent;
//         background-color: currentColor;
//         background-size: 100% 100%;
//         background-position: 50%;
//         background-repeat: no-repeat;
//     }    
// });

const twCheckboxTick = css({
    '&:checked': {
        'backgroundImage': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`,
        'borderColor': 'transparent',
        'backgroundColor': 'currentColor',
        'backgroundSize': '100% 100%',
        'backgroundPosition': '50%',
        'backgroundRepeat': 'no-repeat',
    }
});

function MotionBallTransition() {
    const ref = React.useRef<API>(null);
    const [sorted, setSorted] = React.useState(false);
    const [nBars, setNBars] = React.useState(14);
    return (
        <div className="w-[30rem]">
            <div className="border rounded border-green-200 shadow">
                <Body ref={ref} sorted={sorted} nBars={nBars} />
            </div>
            <div className="mt-2 flex items-center space-x-4">
                <button className="p-0.5 w-6 h-6 flex-none border rounded border-[#006f94] active:scale-[.97]"
                    onClick={() => ref.current?.update()}
                >
                    <IconRefresh />
                </button>

                {/* <TwCheckboxStitches label="Sorted" value={sorted} onChange={setSorted}/> */}

                <label className="flex items-center space-x-3">
                    <input 
                        type="checkbox" name="checked-demo" value="1" 
                        className={`${twCheckboxTick()} form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none`} 
                    />
                    <span className="text-gray-900 font-medium">Sorted</span>
                </label>

                <CheckboxSmall label="Sorted" checked={sorted} onChange={setSorted} styles={CheckboxStyles} />
                <Slider label="# of bars" labelWidth="4.3rem" value={nBars} onChange={(value) => setNBars(value)} step={1} min={2} max={120} />
            </div>
        </div>
    );
}

export default MotionBallTransition;
