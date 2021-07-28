import React from 'react';
import * as d3 from 'd3';
import Slider from './ui/slider/Slider';
import Checkbox from './ui/checkbox/Checkbox';

type FunPlotOptions = {
    xdomain?: [number, number];
    ydomain?: [number, number];
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
    strokeWidthInner?: number;
    strokeWidthOuter?: number;
    n?: number; // number of sample;
};

function funplot(svgOrg: SVGSVGElement, f: ((x: number) => number) | Array<(x: number) => number> /* either a function or array of functions */, options?: FunPlotOptions) {
    let {
        xdomain = [-10, +10],
        ydomain, // = [-2, +2],

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
        strokeWidthInner: strokeWidth = 1.5,
        strokeWidthOuter: strokeWidth2 = 26,
        n = width // number of samples
    } = options || {} as FunPlotOptions;

    const F = typeof f === "function" ? [f] : Array.from(f);
    const X = d3.range(n).map(d3.scaleLinear([0, n - 1], xdomain));
    // const Y = F.map(f => X.map(x => {
    //     return f(x);
    // }));
    const Y = F.map(f => X.map(f));
    if (ydomain === undefined) {
        let [a = -1, b = 1] = d3.extent<number>(Y.flat());
        ydomain = [a, b];
    }
    const x = d3.scaleLinear(xdomain, [marginLeft + insetLeft, width - marginRight - insetRight]);
    const y = d3.scaleLinear(ydomain, [height - marginBottom - insetBottom, marginTop + insetTop]).nice();

    const svg = d3.select(svgOrg) //const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height] as any)
        //.attr('transform', 'scale(1.2)')
        .style("max-width", `${width}px`);
    svg.selectChildren().remove();

    // x axis
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x.copy().interpolate(d3.interpolateRound)).ticks(xticks))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .clone()
            .attr("stroke-opacity", d => d ? 0.1 : 0.4)
            .attr("y1", -height));

    // y axis
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y.copy().interpolate(d3.interpolateRound)).ticks(yticks))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .clone()
            .attr("stroke-opacity", d => d ? 0.1 : 0.4)
            .attr("x1", width));

    // curves
    svg.append("g")
        .attr("fill", "none")
        //.attr("stroke-width", strokeWidth)
        .attr("stroke-miterlimit", 1)
        .selectAll("path")
        .data(Y)

        .join("path")
        .attr("stroke", (Y, i) => scheme[i % scheme.length])
        .attr("d", Y => d3.line<number>().x(x).y((d, i) => y(Y[i]))(X))
        .attr("stroke-width", strokeWidth)

        .clone(true).lower().attr('stroke-width', strokeWidth2).attr('stroke', 'white');

    return svg.node();
}

type YFunction = (x: number) => number;

const FUNCTIONS: Record<string, YFunction> = {
    //(i: number) => .1 * i - .5,
    //Math.tan,
    'cos-sin': (x: number) => Math.cos(x * 4) * (Math.PI / 10) * x,
    'sin': Math.sin,
    //Math.cos,
    'atan': Math.atan,
    // (i: number) => .4 * Math.cos(i * 4),

};

function FunPlot() {
    const ref = React.useRef<SVGSVGElement>(null);

    const [xdomain, setxDomain] = React.useState(2);
    const [strokeWidthInner, setStrokeWidthInner] = React.useState(20);
    const [strokeWidthOuter, setStrokeWidthOuter] = React.useState(26);

    const [functions, setFunctions] = React.useState<Record<string, boolean>>({
        'cos-sin': true,
        'sin': true,
        'atan': true,
    });

    function upadteFunction(name: string, value: boolean) {
        setFunctions(prev => ({
            ...prev,
            [name]: value
        }));
    }

    React.useEffect(() => {
        const functionsToShow = Object.keys(FUNCTIONS).map((fName) => functions[fName] && FUNCTIONS[fName]).filter(Boolean) as Exclude<YFunction, boolean>[];


        ref.current && funplot(ref.current,
            functionsToShow,
            {
                xdomain: [-xdomain * Math.PI, xdomain * Math.PI],
                strokeWidthInner: strokeWidthInner,
                strokeWidthOuter: strokeWidthOuter,
            },
        );
    }, [xdomain, strokeWidthInner, strokeWidthOuter, functions]);
    return (
        <div className="w-[30rem] flex flex-col">
            <div className="w-full h-64 border-8 border-blue-200 bg-blue-400">
                <svg className="w-full h-full" ref={ref}>
                </svg>
            </div>
            <div className="">
                <div className="">
                    <Slider labelWidth="5.5rem" value={xdomain} onChange={setxDomain} label="X domain" min={0.1} max={15} step={0.1} />
                    <Slider labelWidth="5.5rem" value={strokeWidthInner} onChange={setStrokeWidthInner} label="Inner stroke" min={0.1} max={40} step={0.1} />
                    <Slider labelWidth="5.5rem" value={strokeWidthOuter} onChange={setStrokeWidthOuter} label="Outer stroke" min={0.1} max={40} step={0.1} />
                </div>
                <div className="">
                    <Checkbox label="cos(x * 4) * (PI / 10) * x" checked={functions['cos-sin']} onChange={(value) => upadteFunction('cos-sin', value)} />
                    <Checkbox label="sin(x)" checked={functions['sin']} onChange={(value) => upadteFunction('sin', value)} />
                    <Checkbox label="atan(x)" checked={functions['atan']} onChange={(value) => upadteFunction('atan', value)} />
                </div>
            </div>
        </div>
    );
}

export default FunPlot;
