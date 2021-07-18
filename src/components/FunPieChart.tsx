import React from 'react';
import * as d3 from 'd3';

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

function FunChartBody() {
    const ref = React.useRef(null);

    React.useEffect(() => {
    }, []);

    const pieData = d3.pie<Fruit>().value(d => d.count)(FRUITS);

    const arcPie = d3.arc<d3.PieArcDatum<Fruit>>()
        .innerRadius(210)
        .outerRadius(310)
        .padRadius(300)
        .padAngle(2 / 300)
        .cornerRadius(8);

    return (
        <svg viewBox="-320 -320 640 640" ref={ref}>
            {pieData.map((d, idx) => (
                <div key={idx}>
                    <path fill="steelblue" d={arcPie(d) || ''}></path>
                    <text fill="white" transform={`translate(${arcPie.centroid(d).join(",")})`} >
                        <tspan x="0" fontSize="24">${d.data.name}</tspan>
                        <tspan x="0" fontSize="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
                    </text>
                </div>
            ))
            }
        </svg >
    );
}

function FunPieChart() {
    return (
        <div>
            <div className="w-32 h-32">
                <FunChartBody />
            </div>
        </div>
    );
}

export default FunPieChart;
