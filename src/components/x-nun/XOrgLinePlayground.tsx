import React from 'react';
import * as d3 from 'd3';
import styles from './XOrgLinePlayground.module.scss'

function initial() {
    type CurveInfo = {
        name: string;
        curve: d3.CurveFactory | d3.CurveBundleFactory;
        active: boolean;
        lineString: string;
        clear: boolean;
        info: string;
    };

    const CURVEINFO: CurveInfo[] = [
        { name: 'curveLinear', curve: d3.curveLinear, active: true, lineString: '', clear: false, info: 'Interpolates the points using linear segments.' },
        { name: 'curveBasis', curve: d3.curveBasis, active: true, lineString: '', clear: true, info: 'Interpolates the start and end points and approximates the inner points using a B-spline.' },
        { name: 'curveBasisClosed', curve: d3.curveBasisClosed, active: false, lineString: '', clear: false, info: 'Uses a closed B-Spline to approximate the points.' },
        
        { name: 'curveBundle (ß=0)', curve: d3.curveBundle.beta(0), active: false, lineString: '', clear: true, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight.' },
        { name: 'curveBundle (ß=0.5)', curve: d3.curveBundle.beta(0.5), active: false, lineString: '', clear: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is.' },
        { name: 'curveBundle (ß=1)', curve: d3.curveBundle.beta(1), active: false, lineString: '', clear: false, info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis.' },
        
        { name: 'curveCardinal (tension=0)', curve: d3.curveCardinal.tension(0), active: false, lineString: '', clear: true, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=0.5)', curve: d3.curveCardinal.tension(0.5), active: false, lineString: '', clear: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        { name: 'curveCardinal (tension=1)', curve: d3.curveCardinal.tension(1), active: false, lineString: '', clear: false, info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
        
        { name: 'curveCatmullRom (α=0)', curve: d3.curveCatmullRom.alpha(0), active: false, lineString: '', clear: true, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform.' },
        { name: 'curveCatmullRom (α=0.5)', curve: d3.curveCatmullRom.alpha(0.5), active: false, lineString: '', clear: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided.' },
        { name: 'curveCatmullRom (α=1)', curve: d3.curveCatmullRom.alpha(1), active: false, lineString: '', clear: false, info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal.' },
        
        { name: 'curveMonotoneX', curve: d3.curveMonotoneX, active: false, lineString: '', clear: true, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y.' },
        { name: 'curveMonotoneY', curve: d3.curveMonotoneY, active: false, lineString: '', clear: false, info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x.' },
        
        { name: 'curveNatural', curve: d3.curveNatural, active: false, lineString: '', clear: true, info: 'Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints.' },
        { name: 'curveStep', curve: d3.curveStep, active: false, lineString: '', clear: true, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points.' },
        { name: 'curveStepAfter', curve: d3.curveStepAfter, active: false, lineString: '', clear: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value.' },
        { name: 'curveStepBefore', curve: d3.curveStepBefore, active: false, lineString: '', clear: false, info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value.' }
    ];

    const lineGenerator = d3.line();

    const categoryScale = d3.scaleOrdinal<string>(d3.schemeCategory10);
    function colorScale(d: number | string) { return d === 0 ? '#777' : categoryScale(d as string); }

    type DatumPoint = [number, number, number];

    //const points: DatumPoint[] = [[50, 330, 0], [75, 200, 1], [280, 75, 2], [300, 75, 3], [475, 300, 4], [600, 200, 5], [600, 300, 6]];
    const points: DatumPoint[] = [[-30, 350, 0], [150, 350, 1], [150, 70, 2], [375, 70, 3], [375, 350, 4], [670, 150, 5], [670, 350, 6]];
    let numActivePoints = points.length;

    const drag = d3.drag<SVGCircleElement, DatumPoint>()
        .on('drag', function (event: any, d: DatumPoint) {
            const idx = d[2];
            points[idx][0] = event.x;
            points[idx][1] = event.y;
            update();
        });

    function updateInfo(info: string) {
        d3.select('.info .default').style('display', info ? 'none' : 'inline');
        d3.select('.info .text').text(info);
    }

    function setClass() {
        console.log('tcall', arguments);
    }

    function updateMenu() {
        var u = d3.select('.menu')
            .selectAll<HTMLDivElement, CurveInfo>('div.item')
            .data(CURVEINFO);

        u.enter()
            .append('div')
            //.classed(`item ${styles.item}`, true)
            .attr('class', function (d) {
                console.log('t', this.classList);
                
                return `item ${styles.item}`;
            })
            //.style('clear', function (d) { return d.clear ? 'left' : 'none'; })
            .text(d => d.name)
            .on('click', function (event, d) {
                d.active = !d.active;
                update();
            })
            .on('mouseover', function (event, d) { updateInfo(d.info); })
            .on('mouseout', function () { updateInfo(''); })
            .merge(u)
            .call(setClass)
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
            if (!d.active) return;
            lineGenerator.curve(d.curve);
            d.lineString = lineGenerator(points.slice(0, numActivePoints) as any as [number, number][]) || '';
        });

        var u = d3.select('svg g')
            .selectAll<SVGPathElement, CurveInfo>('path')
            .data(CURVEINFO);

        u.enter()
            .append('path')
            .merge(u)
            .style('stroke', function (d, i) { return colorScale(i); })
            .attr('d', function (d) { return d.lineString; })
            .style('display', function (d) { return d.active ? 'inline' : 'none'; });
    }

    function updatePoints() {
        var u = d3.select('g')
            .selectAll<SVGCircleElement, DatumPoint>('circle')
            .data(points.slice(0, numActivePoints));

        u.enter()
            .append('circle')
            .attr('r', 14)
            .attr('fill', 'red')
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

    update();
}

function LineEditor() {
    React.useEffect(() => {
        initial();
    }, []);
    return (
        <div className="w-96">
            <svg className="bg-yellow-100" viewBox="-50 0 800 600" fill="none" stroke="red" strokeWidth="1">
                <g></g>
            </svg>

            <div className="sidebar text-sm">
                <div className="menu"></div>
                <div className="info">
                    <span className="default">
                        The JavaScript library
                        <a href="https://d3js.org">D3</a>
                        provides a number of
                        <a href="https://github.com/d3/d3-shape#curves">curve types</a>
                        to interpolate (or approximate) a set of points.
                        Toggle each of the curve types using the buttons above.
                        You can also add/remove/drag the points to change the shape of the curve.
                    </span>
                    <span className="text"></span>
                </div>
            </div>
        </div>
    );
}

function LinePlayground() {
    return (
        <div className="border-8 border-blue-400">
            <LineEditor />
        </div>
    );
}

export default LinePlayground;
