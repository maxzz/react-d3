import React from 'react';
import * as d3 from 'd3';
import { css, styled } from '@stitches/react';
import { IconRefresh } from './ui/ActionButtons';
// import Checkbox from './ui/Checkbox';
import Slider from './ui/SimpleSlider';
import './ui/Slider.scss';

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

const styles2 = css({
    'checkbox': {
        'cursor': 'pointer',
        'display': 'flex',
        'align-items': 'center',

        '&__input': {
            "position": "absolute",
            "width": "1.375em",
            "height": "1.375em",
            "opacity": "0",
            "cursor": "pointer",

            '&:checked + &__icon .tick': {
                'stroke-dashoffset': '0',
            }
        },
    
        '&__icon': {
            "width": "1.375em",
            "height": "1.375em",
            "flexShrink": "0",
            "overflow": "visible",

            '.tick': {
                "strokeDasharray": "20px",
                "strokeDashoffset": "20px",
                "transition": "stroke-dashoffset 0.2s ease-out",
            }
        },

        '&__label': {
            'margin-left': '0.5em',
        }
    }
});

console.log('------------------');
console.log(styles2());
console.log('........');
console.log({...styles2});

const CheckboxLabel = styled('label', {
    'cursor': 'pointer',
    'display': 'flex',
    'align-items': 'center',

    '&__input': {
        "position": "absolute",
        "width": "1.375em",
        "height": "1.375em",
        "opacity": "0",
        "cursor": "pointer",

        '&:checked + &__icon .tick': {
            'stroke-dashoffset': '0',
        }
    },

});

const CheckboxInput = styled('input', {
});

const CheckboxSpan = styled('span', {
});

function Checkbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (value: boolean) => void; }) {
    return (
        <CheckboxLabel className={`${styles2()}`}>
        {/* <CheckboxLabel className={`flex items-center relative cursor-pointer ${styles2()}`}> */}
             {/* css={{}} */}
            <CheckboxInput type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
            {/* <CheckboxInput className="absolute w-[1.375em] h-[1.375em] opacity-0 cursor-pointer" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /> */}

            {/* <svg className="checkbox__icon w-14 h-14" viewBox="0 0 22 22">
                <rect width="100%" height="100%" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
                
                <path className="" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
            </svg> */}

            {/* <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" /> */}

            <CheckboxSpan className={`${styles2()}__label`}>{label}</CheckboxSpan>
        </CheckboxLabel>
    );
}

function MotionBallTransition() {
    const ref = React.useRef<API>(null);
    const [sorted, setSorted] = React.useState(false);
    const [nBars, setNBars] = React.useState(14);
    return (
        <div className="w-[30rem]">
            <div className="bg-blue-400">
                <Body ref={ref} sorted={sorted} nBars={nBars} />
            </div>
            <div className="flex space-x-2">
                <button className="mt-1 p-0.5 w-6 h-6 border rounded border-gray-400 active:scale-[.97]"
                    onClick={() => ref.current?.update()}
                >
                    <IconRefresh />
                </button>
                <Checkbox label="Sorted" checked={sorted} onChange={setSorted} />
                {/* <Checkbox label="Sorted" checked={sorted} onChange={setSorted} /> */}
                <Slider label="N Bars" labelWidth="3.5rem" value={nBars} onChange={(value) => setNBars(value)} step={1} min={2} max={20} />
            </div>
        </div>
    );
}

export default MotionBallTransition;
