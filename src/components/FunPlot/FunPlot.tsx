import React from 'react';
import * as d3 from 'd3';
import { SliderProps } from '../Slider';
import '../Slider.scss';

type FunPlotOptions = {
    xdomain?: [number, number] | [undefined, undefined] | [string, string];
    ydomain?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    inset?: number;
    insetTop?: number;
    insetRight?: number;
    insetBottom?: number;
    insetLeft?: number;
    width?: number;
    height?: number;
    xticks?: number;
    yticks?: number;
    scheme?: string[];
    strokeWidth?: number;
    n?: number; // number of sample;
};

function funplot(svgOrg: SVGSVGElement, f: Function | Function[] /* either a function or array of functions */, options?: FunPlotOptions) {

    let {
        xdomain = [-10, +10],
        ydomain,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40,
        inset = 6,
        insetTop = inset,
        insetRight = inset,
        insetBottom = inset,
        insetLeft = inset,
        width = 640,
        height = 240,
        xticks = (width - marginRight - marginLeft - insetLeft - insetRight) / 80,
        yticks = (height - marginTop - marginBottom - insetTop - insetBottom) / 40,
        scheme = d3.schemeTableau10,
        strokeWidth = 1.5,
        n = width // number of samples
    } = options || {} as FunPlotOptions;

    const F = typeof f === "function" ? [f] : Array.from(f);
    const X = d3.range(n).map(d3.scaleLinear([0, n - 1], xdomain));
    const Y = F.map(f => X.map(f));
    if (ydomain === undefined) ydomain = d3.extent(Y.flat());
    const x = d3.scaleLinear(xdomain, [marginLeft + insetLeft, width - marginRight - insetRight]);
    const y = d3.scaleLinear(ydomain, [height - marginBottom - insetBottom, marginTop + insetTop]).nice();

    //const svg = d3.create("svg")
    const svg = d3.select(svgOrg)
        .attr("viewBox", [0, 0, width, height] as any)
        .style("max-width", `${width}px`);

    svg.selectChildren().remove();

    // x lines
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x.copy().interpolate(d3.interpolateRound)).ticks(xticks))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("stroke-opacity", d => d ? 0.1 : 0.4)
            .attr("y1", -height));

    //y lines
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y.copy().interpolate(d3.interpolateRound)).ticks(yticks))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("stroke-opacity", d => d ? 0.1 : 0.4)
            .attr("x1", width));

    // curves
    svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", strokeWidth)
        .attr("stroke-miterlimit", 1)
        .selectAll("path")
        .data(Y)
        .join("path")
        .attr("stroke", (Y, i) => scheme[i % scheme.length])
        .attr("d", Y => d3.line().x(x).y((d, i) => y(Y[i]))(X));

    return svg.node();
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

function FunPlot() {
    const ref = React.useRef<SVGSVGElement>(null);

    const [xdomain, setxDomain] = React.useState(1);

    React.useEffect(() => {
        ref.current && funplot(ref.current, [Math.sin, Math.cos], { xdomain: [-xdomain * Math.PI, xdomain * Math.PI] });
    }, [xdomain]);
    return (
        <div>
            <svg className="w-64 h-64 bg-yellow-100" ref={ref}>
            </svg>
            <Slider value={xdomain} onChange={setxDomain} label="xdomain" min={-1} max={50} />
        </div>
    );
}

export default FunPlot;
