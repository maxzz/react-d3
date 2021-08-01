import React from 'react';
import * as d3 from 'd3';
import { precisionRound } from 'd3';
import HighlightedBall from './HighlightedBall';

function Ball({ x, y }: { x: number, y: number; }) {
    const ref = React.useRef<SVGCircleElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    React.useEffect(() => {
        const ball = d3.select(ref.current);

        ball.transition('move-x')
            .duration(800)
            .ease(d3.easeBounceOut)
            .attr('cx', x)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        ball.transition('move-y')
            .ease(d3.easeCubicInOut)
            .attr('cy', y)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));

    }, [x, y]);

    return (
        <circle ref={ref} cx={realPos.x} cy={realPos.y} r={20} fill="none" stroke="blue" strokeWidth={6} clipPath="circle()" >
        </circle>
    );
}

function ShapeNestedSVG({ x, y }: { x: number, y: number; }) {
    const ref = React.useRef<SVGSVGElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    console.log('xy', realPos.x, realPos.y);

    React.useEffect(() => {
        const ball = d3.select(ref.current);

        ball.transition('move-x')
            .duration(800)
            .ease(d3.easeBounceOut)
            .attr('x', `${x}px`)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        ball.transition('move-y')
            .ease(d3.easeCubicInOut)
            .attr('y', `${y}px`)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));

    }, [x, y]);

    return (
        <HighlightedBall ref={ref} x={`${realPos.x}px`} y={`${realPos.y}px`} width="50px" height="40px" transforms="" />
    );
}

function Shape({ x, y }: { x: number, y: number; }) {
    const ref = React.useRef<SVGSVGElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    const refX = React.useRef<HTMLDivElement>(null);
    const refY = React.useRef<HTMLDivElement>(null);

    console.log('xy', realPos.x, realPos.y);

    React.useEffect(() => {
        const ball = d3.select(ref.current);

        const ballX = d3.select(refX.current);
        const ballY = d3.select(refY.current);

        ballX.transition('move-x')
            .duration(800)
            .ease(d3.easeBounceOut)
            .style('transform', `translateX(${x - 20}px)`)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        ballY.transition('move-y')
            // .duration(800)
            // .ease(d3.easeCubicInOut)
            .style('transform', `translateY(${y - 20}px)`)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));

    }, [x, y]);

    return (
        <div ref={refX}>
            <div ref={refY} className="w-10 h-40">
                {/* <HighlightedBall ref={ref} style={{ transform: `translate(${realPos.x - 20}px, ${realPos.y - 20}px)` }} width="40px" height="40px" transforms="" /> */}
                <HighlightedBall ref={ref} className="w-full h-full bg-red-600" transforms="" />
            </div>
        </div>
    );
}

/*
function Shape({ x, y }: { x: number, y: number; }) {
    const ref = React.useRef<SVGGElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    React.useEffect(() => {
        const ball = d3.select(ref.current);

        ball.transition('move-x')
            .duration(3800)
            .ease(d3.easeBounceOut)
            .style('transform', `translateX(${x}px) scale(.1)`)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        // ball.transition('move-y')
        //     .duration(3800)
        //     .ease(d3.easeCubicInOut)
        //     .style('transform', `translateY(${y}px) scale(.1)`)
        //     .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));

    }, [x, y]);

    return (
        <g ref={ref} style={{ transform: `translate(${realPos.x}px, ${realPos.y}px) scale(.1)` }}>
            <HighlightedBall />
        </g>
    );
}
*/
function TransitionBall() {
    const [pos, setPos] = React.useState({ x: 150, y: 50 });
    const [onLeft, setOnLeft] = React.useState(true);

    return (
        <div className="w-[300px] h-[300px] bg-red-100" onClick={() => setOnLeft(v => !v)}>
            {/* <svg className="bg-red-100 w-full h-full" onClick={() => setOnLeft(v => !v)}>
                <ShapeNestedSVG x={onLeft ? 20 : 280} y={onLeft ? 20 : 280} />
                <Ball x={onLeft ? 20 : 280} y={onLeft ? 20 : 280} />
            </svg> */}
            <div className="">
                <Shape x={onLeft ? 20 : 280} y={onLeft ? 20 : 280} />
            </div>
        </div>
    );
}

export default TransitionBall;
