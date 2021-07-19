import React from 'react';
import * as d3 from 'd3';

function D3World() {
    var svg = d3.select("svg");
    const parent = (svg.node() as HTMLDivElement)?.parentElement;
    if (!parent) {
        return;
    }

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = parent.clientWidth - margin.left - margin.right;
    const height = parent.clientHeight - margin.top - margin.bottom;

    type Datum = {
        y: number;
    };

    const nDataPoints = 21;
    const dataset = d3.range(nDataPoints).map((d) => ({ "y": d3.randomUniform(1)() }));

    const xScale = d3.scaleLinear().domain([0, nDataPoints - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const lineGen = d3.line<Datum>()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX);

    svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line")
        .attr('fill', "none")
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
        .attr("d", lineGen); // Calls the line generator 

    // Dots
    svg.selectAll<SVGCircleElement, Datum>(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr('fill', '#4cd88f')
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .on("mouseover", function (event, d) {
            console.log(event);
            //this.attr('class', 'focus');
        })
        .on("mouseout", function () {

        });
}

function LineChartBody() {
    React.useEffect(() => {
        D3World();
    }, []);
    return (
        <svg>

        </svg>
    );
}

function LineChart() {
    return (
        <div className="w-96 h-64">
            <LineChartBody />
        </div>
    );
}

export default LineChart;
