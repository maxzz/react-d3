import React from 'react';
import * as d3 from 'd3';

function D3World(svgRoot: SVGSVGElement) {
    let svg = d3.select<SVGSVGElement, Datum>(svgRoot);
    const parent = svg.node()?.parentElement;
    if (!parent) {
        return;
    }

    const width = 440;
    const height = 200;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const insetAll = 6;
    const inset = {
        top: insetAll,
        right: insetAll,
        bottom: insetAll,
        left: insetAll,
    };
    const xticks = (width - margin.right - margin.left - inset.left - inset.right) / 80;
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

    console.log(svg);

    const g = svg
        .attr('viewBox', [0, 0, width, height] as any)
        .append('g')
        //.attr('transform', `translate(${margin.left},${margin.top})`);

    // Call the x axis in a group tag
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        //.call(d3.axisBottom(xScale.copy().interpolate(d3.interpolateRound)).ticks(xticks));
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // Call the y axis in a group tag
    g.append('g')
        .attr('class', 'y axis')
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

function LineChartBody() {
    const ref = React.useRef<SVGSVGElement>(null);
    React.useEffect(() => {
        ref.current && D3World(ref.current);
    }, []);
    return (
        <svg ref={ref}>

        </svg>
    );
}

function LineChart() {
    return (
        <div className='w-full h-full border-8 border-blue-200 bg-blue-400'>
            <LineChartBody />
        </div>
    );
}

export default LineChart;
