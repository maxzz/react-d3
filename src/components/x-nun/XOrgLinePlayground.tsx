import React from 'react';
import * as d3 from 'd3';
import styles from './XOrgLinePlayground.module.scss';

function initial(mainGroup: SVGGElement) {
    type CurveInfo = {
        name: string;
        curve: d3.CurveFactory | d3.CurveBundleFactory;
        active: boolean;
        lineString?: string;
        group: boolean;
        info: string;
    };

    const CURVEINFO: CurveInfo[] = [
        { name: 'curveBundle (ß=0)', curve: d3.curveBundle.beta(0), active: false, group: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight.' },
        { name: 'curveBundle (ß=0.5)', curve: d3.curveBundle.beta(0.5), active: false, group: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is.' },
        { name: 'curveBundle (ß=1)', curve: d3.curveBundle.beta(1), active: false, group: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis.' },

        { name: 'curveCardinal (tension=0)', curve: d3.curveCardinal.tension(0), active: false, group: true, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=0.5)', curve: d3.curveCardinal.tension(0.5), active: false, group: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=1)', curve: d3.curveCardinal.tension(1), active: false, group: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },

        { name: 'curveCatmullRom (α=0)', curve: d3.curveCatmullRom.alpha(0), active: true, group: true, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform.' },
        { name: 'curveCatmullRom (α=0.5)', curve: d3.curveCatmullRom.alpha(0.5), active: false, group: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided.' },
        { name: 'curveCatmullRom (α=1)', curve: d3.curveCatmullRom.alpha(1), active: false, group: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal.' },

        { name: 'curveMonotoneX', curve: d3.curveMonotoneX, active: false, group: true, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y.' },
        { name: 'curveMonotoneY', curve: d3.curveMonotoneY, active: false, group: false, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x.' },

        { name: 'curveNatural', curve: d3.curveNatural, active: false, group: true, info: 'Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints.' },
        { name: 'curveStep', curve: d3.curveStep, active: false, group: true, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points.' },
        { name: 'curveStepAfter', curve: d3.curveStepAfter, active: false, group: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value.' },
        { name: 'curveStepBefore', curve: d3.curveStepBefore, active: false, group: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value.' },

        { name: 'curveLinear', curve: d3.curveLinear, active: true, group: true, info: 'Interpolates the points using linear segments.' },
        { name: 'curveBasis', curve: d3.curveBasis, active: false, group: true, info: 'Interpolates the start and end points and approximates the inner points using a B-spline.' },
        { name: 'curveBasisClosed', curve: d3.curveBasisClosed, active: false, group: false, info: 'Uses a closed B-Spline to approximate the points.' },
    ];

    type DatumPoint = [number, number, number];
    const points: DatumPoint[] = [[46, 179, 0], [123, 404, 1], [123, 56, 2], [292, 56, 3], [292, 274, 4], [456, 163, 5], [463, 473, 6]];
    let numActivePoints = points.length;

    const categoryScale = d3.scaleOrdinal<string>(d3.schemeCategory10);
    function colorScale(d: number | string) { return d === 0 ? '#777' : categoryScale(d as string); }

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
        if (current) {
            let s = points.map(d => {
                let pt = JSON.stringify(d);
                return d === current ? `<b>${pt}</b>` : pt;
            }).join(',');
            d3.select('.info .points').html(s);
        }
        else {
            d3.select('.info .points').text(`${JSON.stringify(points)}`);
        }
    }

    function updateMenu() {
        let u = d3.select('.menu')
            .selectAll<HTMLDivElement, CurveInfo>('div.item')
            .data(CURVEINFO);

        u.enter()
            .append('div')
            .attr('class', d => `item ${styles.item} ${d.group ? styles.itemBegingroup : ''}`)
            .text(d => d.name)
            .on('click', function (event, d) {
                d.active = !d.active;
                update();
            })
            .on('mouseover', function (event, d) { updateInfo(d.info); })
            .on('mouseout', function () { updateInfo(''); })
            .merge(u)
            .style('background-color', function (d, i) { return d.active ? colorScale(i) : '#fff'; })
            .style('color', function (d, i) { return d.active ? 'white' : '#444'; });
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
            // let u = d3.select('svg g')
            .selectAll<SVGPathElement, CurveInfo>('path')
            .data(CURVEINFO);

        u.enter()
            .append('path')
            .merge(u)
            .attr('stroke-width', 7)
            .style('stroke', (d, i) => colorScale(i))
            .attr('d', d => d.lineString || '')
            .style('display', d => d.active ? 'inline' : 'none');
    }

    function updatePoints() {
        let u = d3.select(mainGroup)
            // let u = d3.select('g')
            .selectAll<SVGCircleElement, DatumPoint>('circle')
            .data(points.slice(0, numActivePoints));

        let t = d3.select(mainGroup)
            // let t = d3.select('g')
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

        u.exit().remove();
    }

    function update() {
        updateMenu();
        updatePointsMenu();
        updateLines();
        updatePoints();
    }

    updatePointsInfo();
    update();
}

function LineEditor() {
    const ref = React.useRef<SVGGElement>(null);
    React.useEffect(() => {
        ref.current && initial(ref.current);
    }, []);
    return (
        <div className=""> {/* scale-75 */}
            <svg className="bg-white border-8 border-blue-400" viewBox="0 0 500 500" fill="none" stroke="red" strokeWidth="1">
                <g ref={ref}></g>
            </svg>

            <div className="sidebar mt-4 p-2 rounded-md text-sm bg-white">
                <a href="https://github.com/d3/d3-shape#curves" target="_blank">D3 curve types to interpolate a set of points:</a>
                <div className="menu border border-gray-400 rounded overflow-hidden"></div>
                <div className="info w-[30rem] h-20 mt-4 p-2 text-xs rounded bg-blue-100 flex flex-col justify-between">
                    <span className="default">
                        <p>Toggle each of the curve types to activate / deactivate the curve.</p>
                        <p>You can also add/remove/drag the points to change the shape of the curve.</p>
                    </span>
                    <span className="text"></span>
                    <span className="points"></span>
                </div>
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
