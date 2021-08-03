import React from 'react';
import * as d3 from 'd3';
import styles from './XOrgLinePlayground.module.scss';
import CheckboxTw from '../ui/checkbox/CheckboxTw';

type API = {
    setAll: (onOff: boolean) => void;
};

function initial(mainGroup: SVGGElement, onSelectionChange: (allOn: boolean) => void): API {
    type CurveInfo = {
        name: string;
        curve: d3.CurveFactory | d3.CurveBundleFactory;
        group: boolean;
        active: boolean;
        info: string;

        grpIdx: number;         // Group index [0..7]
        lineStyle: number;      // Line style in group [0..2]
        lineString?: string;    // Generated curve points
    };

    const CURVEINFO: CurveInfo[] = [
        { name: 'curveBundle (ß=0)', curve: d3.curveBundle.beta(0), grpIdx: 0, lineStyle: 0, group: false, active: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight.' },
        { name: 'curveBundle (ß=0.5)', curve: d3.curveBundle.beta(0.5), grpIdx: 0, lineStyle: 1, group: false, active: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is.' },
        { name: 'curveBundle (ß=1)', curve: d3.curveBundle.beta(1), grpIdx: 0, lineStyle: 2, group: false, active: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis.' },

        { name: 'curveCardinal (tension=0)', curve: d3.curveCardinal.tension(0), grpIdx: 1, lineStyle: 0, group: true, active: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=0.5)', curve: d3.curveCardinal.tension(0.5), grpIdx: 1, lineStyle: 1, group: false, active: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=1)', curve: d3.curveCardinal.tension(1), grpIdx: 1, lineStyle: 2, group: false, active: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },

        { name: 'curveCatmullRom (α=0)', curve: d3.curveCatmullRom.alpha(0), grpIdx: 2, lineStyle: 0, group: true, active: true, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform.' },
        { name: 'curveCatmullRom (α=0.5)', curve: d3.curveCatmullRom.alpha(0.5), grpIdx: 2, lineStyle: 1, group: false, active: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided.' },
        { name: 'curveCatmullRom (α=1)', curve: d3.curveCatmullRom.alpha(1), grpIdx: 2, lineStyle: 2, group: false, active: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal.' },

        { name: 'curveMonotoneX', curve: d3.curveMonotoneX, grpIdx: 3, lineStyle: 0, group: true, active: false, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y.' },
        { name: 'curveMonotoneY', curve: d3.curveMonotoneY, grpIdx: 3, lineStyle: 1, group: false, active: false, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x.' },

        { name: 'curveNatural', curve: d3.curveNatural, grpIdx: 4, lineStyle: 0, group: true, active: false, info: 'Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints.' },

        { name: 'curveStep', curve: d3.curveStep, grpIdx: 5, lineStyle: 0, group: true, active: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points.' },
        { name: 'curveStepAfter', curve: d3.curveStepAfter, grpIdx: 5, lineStyle: 1, group: false, active: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value.' },
        { name: 'curveStepBefore', curve: d3.curveStepBefore, grpIdx: 5, lineStyle: 2, group: false, active: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value.' },

        { name: 'curveLinear', curve: d3.curveLinear, grpIdx: 6, lineStyle: 0, group: true, active: true, info: 'Interpolates the points using linear segments.' },

        { name: 'curveBasis', curve: d3.curveBasis, grpIdx: 7, lineStyle: 0, group: true, active: false, info: 'Interpolates the start and end points and approximates the inner points using a B-spline.' },
        { name: 'curveBasisClosed', curve: d3.curveBasisClosed, grpIdx: 7, lineStyle: 1, group: false, active: false, info: 'Uses a closed B-Spline to approximate the points.' },
    ];

    type DatumPoint = [number, number, number];
    const points: DatumPoint[] = [[46, 179, 0], [123, 404, 1], [123, 56, 2], [292, 56, 3], [292, 274, 4], [456, 163, 5], [463, 473, 6]];
    let numActivePoints = points.length;

    const categoryScale = d3.scaleOrdinal<string>(d3.schemeCategory10);
    function colorScale(d: number | string) { return categoryScale(d as string); } // TODO: we need 18 but have 10
    // function colorScale(d: number | string) { return d === 0 ? '#777' : categoryScale(d as string); }

    const lineGenerator = d3.line();

    const drag = d3.drag<SVGCircleElement, DatumPoint>()
        .on('drag', function (event: any, d: DatumPoint) {
            const idx = d[2];
            const xy = d3.pointer(event, this);
            points[idx][0] = Math.round(xy[0]);
            points[idx][1] = Math.round(xy[1]);
            updatePointsInfo(d);
            update();
        })
        .on('end', () => {
            updatePointsInfo();
        });

    function updateInfo(info: string) {
        d3.select('.info .default').style('display', info ? 'none' : 'inline');
        d3.select('.info .text').text(info);
    }

    function updatePointsInfo(current?: DatumPoint) {

        function joinPoints(d: DatumPoint) {
            let pt = JSON.stringify(d);
            return d === current ? `<b>${pt}</b>` : pt;
        }

        const a = points.slice(0, numActivePoints).map(joinPoints);
        const b = points.slice(numActivePoints).map(joinPoints).join(',');

        d3.select('.info .points').html(`[${[...a, ...b].join(',')}]`);
    }

    // function updatePointsInfo(current?: DatumPoint) {
    //     if (current) {
    //         let s = points.map(d => {
    //             let pt = JSON.stringify(d);
    //             return d === current ? `<b>${pt}</b>` : pt;
    //         }).join(',');
    //         d3.select('.info .points').html(s);
    //     }
    //     else {
    //         d3.select('.info .points').text(`${JSON.stringify(points)}`);
    //     }
    // }

    function updateMenu() {
        let items = d3.select('.menu')
            .selectAll<HTMLDivElement, CurveInfo>('div.item')
            .data(CURVEINFO);

        let itemsEnter = items.enter()
            .append('div')
            .attr('class', d => `item ${styles.item} ${d.group ? styles.itemBegingroup : ''}`)
            .on('click', function (event, d) {
                d.active = !d.active;
                updateAllLinesOn();
                update();
            })
            .on('mouseover', function (event, d) { updateInfo(d.info); })
            .on('mouseout', function () { updateInfo(''); });

        itemsEnter.append('div')
            .attr('class', d => `info ${styles.info}`);
        itemsEnter.append('div')
            .attr('class', styles['item-name'])
            .text(d => d.name);

        itemsEnter.merge(items)
            .select('.info')
            .attr('class', d => `info ${styles.info} ${!d.active ? '' : d.lineStyle === 2 ? styles.line2 : d.lineStyle === 1 ? styles.line1 : styles.line0}`)
            .style('--color', function (d, i) { return colorScale(d.grpIdx); })
            .transition()
            .duration(50)
            .ease(d3.easeCubicInOut)
            .style('--size', d => d.active ? 0 : 80);
    }

    function updatePointsMenu() {
        d3.select('.remove-point')
            .classed('active', numActivePoints > 2)
            .on('click', function () {
                if (numActivePoints <= 2) return;
                numActivePoints--;
                update();
            });

        d3.select('.add-point')
            .classed('active', numActivePoints < points.length)
            .on('click', function () {
                if (numActivePoints >= points.length) return;
                numActivePoints++;
                update();
            });
    }

    function updateLines() {
        CURVEINFO.forEach(function (d) {
            if (d.active) {
                lineGenerator.curve(d.curve);
                d.lineString = lineGenerator(points.slice(0, numActivePoints) as any as [number, number][]) || '';
            }
        });

        let u = d3.select(mainGroup)
            .selectAll<SVGPathElement, CurveInfo>('path')
            .data(CURVEINFO);

        u.enter()
            .append('path')
            .merge(u)
            .attr('stroke-width', 7)
            .style('stroke', (d, i) => colorScale(d.grpIdx))
            .style('stroke-dasharray', (d, i) => d.lineStyle === 2 ? "8,2" : d.lineStyle === 1 ? "2,2,2" : "")
            .attr('d', d => d.lineString || '')
            .style('display', d => d.active ? 'inline' : 'none');
    }

    function updatePoints() {
        let u = d3.select(mainGroup)
            .selectAll<SVGCircleElement, DatumPoint>('circle')
            .data(points.slice(0, numActivePoints));

        let t = d3.select(mainGroup)
            .selectAll<SVGTextElement, DatumPoint>('text')
            .data(points.slice(0, numActivePoints));

        u.enter()
            .append('g')
            .call(function (selection) {
                selection
                    .append('text')
                    .append('tspan')
                    .merge(t)
                    .attr('x', d => d[0] - 24)
                    .attr('y', d => d[1] - 16)
                    .text(d => d[2] + 1);
            })
            .append('circle')
            .attr('class', `${styles.circle}`)
            .attr('r', 14)
            .call(drag)
            .merge(u)
            .attr('cx', d => d[0])
            .attr('cy', d => d[1]);

        let g = d3.select(mainGroup)
            .selectAll('g')
            .data(points.slice(0, numActivePoints));

        g.exit().remove();
    }

    function updateAllLinesOn() {
        onSelectionChange(!CURVEINFO.some(item => !item.active));
    }

    function setAll(onOff: boolean) {
        CURVEINFO.forEach(item => item.active = onOff);
        update();
    }

    function update() {
        updateMenu();
        updatePointsMenu();
        updateLines();
        updatePoints();
    }

    (function init() {
        // d3.select("body").transition()
        //     .duration(4750)
        //     .on("start", function () { d3.select(this).style("color", "red"); })
        //     .style("color", "green");

        //d3.select(mainGroup).selectAll('.menu').remove();

        //.styleTween('opacity', (d) => function () { return `${d3.interpolateNumber(0,1)}` }) //OK The returned style should be string w/ the current CSS specs

        updatePointsInfo();
        update();
        updateAllLinesOn();
    })();

    return {
        setAll
    };
}

function LineEditor() {
    const svgRef = React.useRef<SVGGElement>(null);
    const apiRef = React.useRef<API | null>(null);

    const [allChecked, setAllChecked] = React.useState(false);

    function onSelectionChange(allOn: boolean) {
        setAllChecked(allOn);
    }

    React.useEffect(() => {
        apiRef.current = svgRef.current && initial(svgRef.current, onSelectionChange);
    }, []);

    return (
        <div className=""> {/* scale-75 */}
            <svg className="bg-white border-8 border-blue-400" viewBox="0 0 500 500" fill="none" stroke="red" strokeWidth="1">
                <g ref={svgRef}></g>
            </svg>

            <div className="ml-4 -mt-3 flex space-x-1">
                <div
                    className="remove-point
                        w-4 h-4 pb-1 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none 
                        flex items-center justify-center"
                    title="Remove point (min is 2)"
                >-</div>
                <div
                    className="add-point
                        w-4 h-4 pb-1 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none 
                        flex items-center justify-center"
                    title="Add point (maximum 7)"
                >+</div>
            </div>

            {/* Controls */}
            <div className="sidebar mt-1 p-2 rounded-md text-sm bg-white">
                {/* Info panel */}
                <div className="info w-[30rem] h-20 p-2 text-xs rounded bg-blue-100 flex flex-col justify-between">
                    <span className="default">
                        <p>Toggle each of the curve types to activate / deactivate the curve.</p>
                        <p>You can also add/remove/drag the points to change the shape of the curve.</p>
                    </span>
                    <span className="text"></span>
                    <span className="points"></span>
                </div>

                {/* Menu header */}
                <div className="flex justify-between">
                    <a className="mt-2 flex items-center" href="https://github.com/d3/d3-shape#curves" target="_blank">
                        <span>D3 curve types to interpolate a set of points:</span>
                        <svg className="h-4 w-4 pt-0.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                    </a>
                    <CheckboxTw label="" title="Toggle all" className="w-4 h-4 rounded-sm"
                        checked={allChecked}
                        onChange={(v) => { apiRef.current?.setAll(v); setAllChecked(v); }}
                    />
                </div>

                {/* Menu items generated by D3 */}
                <div className="menu border border-gray-400 rounded overflow-hidden"></div>
            </div>
        </div>
    );
}

function LinePlayground() {
    return (
        <div className="w-full">
            <LineEditor />
        </div>
    );
}

export default LinePlayground;
