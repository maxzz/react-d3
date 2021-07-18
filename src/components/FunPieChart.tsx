import React from 'react';
import * as d3 from 'd3';
import { SliderProps } from './ui/ui-props';

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
    { name: "🍋", count: 2 },
    { name: "🍎", count: 1 },
    { name: "🍉", count: 1 }
];

type FunChartBodyProps = {
    innerRadius: number;
    outerRadius: number;
    padRadius: number;
    padAngle: number;
    cornerRadius: number;
};

function FunChartBody(props: FunChartBodyProps) {
    const ref = React.useRef(null);

    React.useEffect(() => {
    }, []);

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
                    <path fill="steelblue" d={arcPie(d) || ''}></path>
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
            <div className="w-16">{label}</div>
            <div className="flex items-center">
                <input className="ui-slider" type="range" value={value} onChange={(e) => onChange(+e.target.value)} min={min} max={max} step={step} />
            </div>
            <div className="min-w-[2rem] text-right">{value}</div>
        </div>
    );
}

function FunPieChart() {

    const [props, setProps] = React.useState({
        innerRadius: 210,
        outerRadius: 310,
        padRadius: 300,
        padAngle: 2 / 300,
        cornerRadius: 8,
    });

    function update(name: string, value: number) {
        setProps(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div>
            <div className="w-96">
                <FunChartBody {...props}/>
            </div>
            <Slider value={props.innerRadius} onChange={(v) => update('innerRadius', v)} label="innerRadius" />
        </div>
    );
}

export default FunPieChart;
