import React, { useRef, useState } from 'react';
import * as d3 from 'd3';
import { SliderProps } from '@ui/UIProps';
import { FrameOfDemo } from '@ui/FrameOfDemo';

type Fruit = {
    name: string;
    count: number;
};

const FRUITS: Fruit[] = [
    { name: "🍊", count: 21 },
    { name: "🍇", count: 13 },
    { name: "🍏", count: 8 },
    { name: "🍌", count: 5 },
    { name: "🍐", count: 3 },
    { name: "🍋", count: 21 },
    { name: "🍎", count: 11 },
    { name: "🍉", count: 11 }
];

type FunChartBodyProps = {
    innerRadius: number;
    outerRadius: number;
    padRadius: number;
    padAngle: number;
    cornerRadius: number;
};

function FunChartBody(props: FunChartBodyProps) {
    const ref = useRef(null);

    const pieData = d3.pie<Fruit>().value(d => d.count)(FRUITS);

    const arcPie = d3.arc<d3.PieArcDatum<Fruit>>()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius)
        .padRadius(props.padRadius)
        .padAngle(props.padAngle)
        .cornerRadius(props.cornerRadius);

    return (
        <svg viewBox="-320 -320 640 640" ref={ref}>
            {pieData.map((d, idx) => (
                <g key={idx}>
                    <path fill="#1e40af" stroke="white" d={arcPie(d) || ''}></path>
                    <text fill="white" transform={`translate(${arcPie.centroid(d).join(",")})`} >
                        <tspan x="-14" fontSize="24">{d.data.name}</tspan>
                        <tspan x="0" fontSize="12" dy="1.3rem">{d.value.toLocaleString("en")}</tspan>
                    </text>
                </g>
            ))}
        </svg >
    );
}

function Slider({ value, onChange, label, min = 0, max = 100, step = 1 }: SliderProps) {
    return (
        <div className="flex items-center text-sm text-gray-800">
            <div className="w-24">{label}</div>
            <div className="flex items-center">
                <input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} min={min} max={max} step={step} />
            </div>
            <div className="min-w-[2rem] text-right">{value}</div>
        </div>
    );
}

const RANGES: { [key in keyof FunChartBodyProps]: { min: number; max: number; step: number; } } = {
    innerRadius: { min: 0, max: 320, step: 1 },
    outerRadius: { min: 0, max: 320, step: 1 },
    padRadius: { min: 0, max: 400, step: 1 },
    padAngle: { min: 0, max: 0.01, step: .001 },
    cornerRadius: { min: 0, max: 100, step: 1 },
};

export function Demo6_FunPieChart() {

    const [props, setProps] = useState({
        innerRadius: 100,
        outerRadius: 310,
        padRadius: 300,
        padAngle: +(2 / 300).toFixed(3),
        cornerRadius: 8,
    });

    function update(name: string, value: number) {
        setProps(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <FrameOfDemo>
            <div className="">
                <div className="mb-1 w-full border-8 border-blue-200 bg-blue-400" style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}>
                    <FunChartBody {...props} />
                </div>

                <Slider value={props.innerRadius} onChange={(v) => update('innerRadius', v)} label="innerRadius" {...RANGES['innerRadius']} />
                <Slider value={props.outerRadius} onChange={(v) => update('outerRadius', v)} label="outerRadius" {...RANGES['outerRadius']} />
                <Slider value={props.padRadius} onChange={(v) => update('padRadius', v)} label="padRadius" {...RANGES['padRadius']} />
                <Slider value={props.padAngle} onChange={(v) => update('padAngle', v)} label="padAngle" {...RANGES['padAngle']} />
                <Slider value={props.cornerRadius} onChange={(v) => update('cornerRadius', v)} label="cornerRadius" {...RANGES['cornerRadius']} />
            </div>
        </FrameOfDemo>
    );
}
