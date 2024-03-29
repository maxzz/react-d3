import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Slider } from '@ui/Slider';
import { Checkbox } from '@ui/Checkbox';
import { CheckboxJw } from '@ui/Checkboxes/CheckboxJw';
import { FrameOfDemo } from '@ui/FrameOfDemo';

type PlotOptions = {
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

type MapXToYFn = (x: number) => number;

type MapXToYFnParam = MapXToYFn | MapXToYFn[]; // either a function or array of functions

function funplot(svgOrg: SVGSVGElement, f: MapXToYFnParam, options?: PlotOptions) {
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
    } = options || {} as PlotOptions;

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

const FUNCTIONS: Record<string, MapXToYFn> = {
    'cos-sin': (x: number) => Math.cos(x * 4) * (Math.PI / 10) * x,

    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'atan': Math.atan,
    'cos4': (x: number) => .4 * Math.cos(x * 4),
    'const': (i: number) => .1 * i - .5,
    'twit': (x: number) => Math.sin(4.1 * x) + 12 * Math.sin(3 * x), //https://twitter.com/yuanchuan23/status/1447548295992152072
};

export function Demo2_FunPlotFunPlot() {
    const svgRef = useRef<SVGSVGElement>(null);

    const [xdomain, setxDomain] = useState(2);
    const [strokeWidthInner, setStrokeWidthInner] = useState(20);
    const [strokeWidthOuter, setStrokeWidthOuter] = useState(26);

    const [allFns, setAllFns] = useState<Record<string, boolean>>({
        'sin': true,
        'cos': false,
        'tan': false,
        'atan': false,
        'cos-sin': true,
        'cos4': false,
        'const': false,
        'twit': false,
    });

    function setFnCheck(fnName: string, cheked: boolean) {
        setAllFns(prev => ({ ...prev, [fnName]: cheked, }));
    }

    useEffect(
        () => {
            if (!svgRef.current) { return; }

            const functionsToShow = Object.keys(FUNCTIONS).map((fnName) => allFns[fnName] && FUNCTIONS[fnName]).filter(Boolean);

            funplot(svgRef.current, functionsToShow, {
                xdomain: [-xdomain * Math.PI, xdomain * Math.PI],
                strokeWidthInner: strokeWidthInner,
                strokeWidthOuter: strokeWidthOuter,
            });
        },
        [xdomain, strokeWidthInner, strokeWidthOuter, allFns]
    );

    return (
        <FrameOfDemo>
            <div className="flex flex-col">
                {/* Preview */}
                <div className="h-64 border-8 border-blue-200 bg-blue-400">
                    <svg className="w-full h-full" ref={svgRef} />
                </div>

                <div className="my-2 space-y-2">
                    {/* Sliders */}
                    <div className="">
                        <Slider labelWidth="5.5rem" value={xdomain} onChange={setxDomain} label="X domain" min={0.1} max={15} step={0.1} />
                        <Slider labelWidth="5.5rem" value={strokeWidthInner} onChange={setStrokeWidthInner} label="Inner stroke" min={0.1} max={40} step={0.1} />
                        <Slider labelWidth="5.5rem" value={strokeWidthOuter} onChange={setStrokeWidthOuter} label="Outer stroke" min={0.1} max={40} step={0.1} />
                    </div>
                    {/* Checkboxes */}
                    <div className="">
                        <Checkbox label="sin(x)" checked={allFns['sin']} onChange={(cheked) => setFnCheck('sin', cheked)} />
                        <Checkbox label="cos(x)" checked={allFns['cos']} onChange={(cheked) => setFnCheck('cos', cheked)} />
                        <Checkbox label="tan(x)" checked={allFns['tan']} onChange={(cheked) => setFnCheck('tan', cheked)} />
                        <Checkbox label="atan(x)" checked={allFns['atan']} onChange={(cheked) => setFnCheck('atan', cheked)} />
                        <Checkbox label="cos(x * 4) * (PI / 10) * x" checked={allFns['cos-sin']} onChange={(cheked) => setFnCheck('cos-sin', cheked)} />
                        <Checkbox label=".4 * cos(x * 4)" checked={allFns['cos4']} onChange={(cheked) => setFnCheck('cos4', cheked)} />
                        <Checkbox label=".1 * x - .5" checked={allFns['const']} onChange={(cheked) => setFnCheck('const', cheked)} />
                        <Checkbox label="sin(4.1 * x) + 12 * sin(3 * x)" checked={allFns['twit']} onChange={(cheked) => setFnCheck('twit', cheked)} />
                        {/* <CheckboxJw /> */}
                    </div>
                </div>
            </div>
        </FrameOfDemo>
    );
}
