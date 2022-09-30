import React, { forwardRef, PropsWithChildren, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import * as d3 from 'd3';
import { IconRefresh } from './UI/UIIcons';

function D3World(svgRoot: SVGSVGElement) {
    let svg = d3.select<SVGSVGElement, Datum>(svgRoot);
    const parent = svg.node()?.parentElement;
    if (!parent) {
        return;
    }

    const width = 440;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const insetAll = 0;
    const inset = {
        top: insetAll,
        right: insetAll,
        bottom: insetAll,
        left: insetAll,
    };
    const xticks = (width - margin.right - margin.left - inset.left - inset.right) / 40;
    const yticks = (height - margin.top - margin.bottom - inset.top - inset.bottom) / 40;

    type Datum = {
        y: number;
    };

    const nDataPoints = 21;
    const dataset = d3.range(nDataPoints).map((d) => ({ 'y': d3.randomUniform(1)() }));

    const xScale = d3.scaleLinear().domain([0, nDataPoints - 1]).range([margin.left + inset.right, width - margin.right - inset.right]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom - inset.bottom, margin.top + inset.top]).nice();

    const lineGen = d3.line<Datum>()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX);

    svg.selectChildren().remove();

    const g = svg
        .attr('viewBox', [0, 0, width, height] as any)
        .append('g');
    //.attr('transform', `translate(${margin.left},${margin.top})`);

    // Call the x axis in a group tag
    g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        //.call(d3.axisBottom(xScale.copy().interpolate(d3.interpolateRound)).ticks(xticks));
        .call(d3.axisBottom(xScale.copy().interpolate(d3.interpolateRound)).ticks(xticks)); // Create an axis component with d3.axisBottom

    // Call the y axis in a group tag
    g.append('g')
        .attr('class', 'y-axis')
        .attr("transform", `translate(${margin.left},0)`)
        //.call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
        .call(d3.axisLeft(yScale.copy().interpolate(d3.interpolateRound)).ticks(yticks)); // Create an axis component with d3.axisLeft

    // Append the path, bind the data, and call the line generator 
    g.append('path')
        .datum(dataset) // 10. Binds data to the line 
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('d', lineGen) // Calls the line generator 
        .clone(true).lower()
        .attr('stroke', '#c58b36')
        .attr('stroke-width', 4);

    // Dots
    g.selectAll<SVGCircleElement, Datum>('.dot')
        .data(dataset)
        .enter().append('circle') // Uses the enter().append() method
        .attr('class', 'dot') // Assign a class for styling
        .attr('fill', '#4cb3d8c9')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 4)
        .on('mouseover', function (event, d) {
            console.log(event);
            //this.attr('class', 'focus');
        })
        .on('mouseout', function () {
        });
}

type LineChartBodyApi = {
    update: () => void;
};

function LineChartBodyRaw(_: PropsWithChildren<any>, ref: Ref<LineChartBodyApi>) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        svgRef.current && D3World(svgRef.current);
    }, []);

    useImperativeHandle(ref, () => ({
        update() {
            svgRef.current && D3World(svgRef.current);
        }
    }));

    return (
        <svg ref={svgRef}>

        </svg>
    );
}

const LineChartBody = forwardRef(LineChartBodyRaw);

export function Demo5_LineChart() {
    const api = useRef<LineChartBodyApi>(null);
    return (
        <div className='w-[30rem] border-8 border-blue-200 bg-blue-400'
            style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}
        >
            <div className="">
                <LineChartBody ref={api} />
                <button className="ml-4 mb-2 h-6 w-6 p-1 border rounded border-blue-800 hover:bg-blue-500 active:bg-blue-500 active:scale-[.97]"
                    style={{ boxShadow: '#00000019 0 0 1px 1px' }}
                    onClick={() => api.current?.update()}
                >
                    <IconRefresh />
                </button>
            </div>
        </div>
    );
}
