import React from 'react';
import * as d3 from 'd3';
import { precisionRound } from 'd3';
import HighlightedBall from './HighlightedBall';
import { IconRefresh } from './ui/ButtonIcons';

function Ball({ x, y, r }: { x: number, y: number; r: number; }) {
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
        <circle ref={ref} cx={realPos.x} cy={realPos.y} r={r} fill="none" stroke="blue" strokeWidth={6} clipPath="circle()" >
        </circle>
    );
}

function ShapeNestedSVG({ x, y, width, height }: { x: number, y: number; width: number; height: number; }) {
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
        <HighlightedBall ref={ref} x={`${realPos.x}px`} y={`${realPos.y}px`} width={`${width}px`} height={`${height}px`} transforms="" preserveAspectRatio="none" />
    );
}

function Shape({ x, y, width, height, ...rest }: { x: number, y: number; width: number; height: number; } & React.HTMLAttributes<HTMLElement>) {
    const ref = React.useRef<SVGSVGElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    const refX = React.useRef<HTMLDivElement>(null);
    const refY = React.useRef<HTMLDivElement>(null);

    console.log('xy', realPos.x, realPos.y);

    React.useEffect(() => {
        console.log('hook xy', x, y, realPos.x, realPos.y);

        const ball = d3.select(ref.current);

        const ballX = d3.select(refX.current);
        const ballY = d3.select(refY.current);

        ballX.transition('move-x')
            .duration(800)
            .ease(d3.easeBounceOut)
            .style('transform', `translateX(${x}px)`)
            // .style('transform', `translateX(${x - width / 2}px)`)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        ballY.transition('move-y')
            // .duration(800)
            // .ease(d3.easeCubicInOut)
            .style('transform', `translateY(${y}px)`)
            // .style('transform', `translateY(${y - height / 2}px)`)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));

    }, [x, y]);

    return (
        <div ref={refX} style={{ transform: `translateX(${realPos.x}px` }} {...rest}>
            <div ref={refY} style={{ transform: `translateY(${realPos.y}px)` }}>
                {/* <HighlightedBall ref={ref} style={{ transform: `translate(${realPos.x - 20}px, ${realPos.y - 20}px)` }} width="40px" height="40px" transforms="" /> */}
                {/* <HighlightedBall style={{width, height, transform: `translate(${realPos.x - width / 2}px, ${realPos.y - height / 2}px)`}} ref={ref} className="bg-red-600 w-full h-full" preserveAspectRatio="none" /> */}
                {/* <HighlightedBall ref={ref} style={{ width, height, }} className="bg-red-600" preserveAspectRatio="none" /> */}
                <HighlightedBall ref={ref} className="w-full h-full" style={{ width, height }} preserveAspectRatio="none" />
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
    const [onLeft, setOnLeft] = React.useState(true);

    const width = 300;
    const height = 500;

    const ballWidth = 20;
    const ballHeight = 60;

    const squareWidth = 20;
    const squareHeight = 30;

    const circleR = 20;

    return (
        <div className={`relative bg-red-100`} style={{ width, height }} onClick={() => setOnLeft(v => !v)}>
            <div className="absolute w-full h-full">
                {/* <div className="absolute w-full h-full bg-yellow-100 opacity-5"></div> */}
                <svg className="absolute w-full h-full">
                    <ShapeNestedSVG x={onLeft ? 0 : width - squareWidth} y={onLeft ? 0 : height - squareHeight} width={squareWidth} height={squareHeight} />
                    <Ball x={onLeft ? circleR : width - circleR} y={onLeft ? circleR : height - circleR} r={circleR} />
                </svg>
            </div>
            {/* <div className="bg-green-400">
                <Shape x={onLeft ? 0 : width - ballWidth} y={onLeft ? 0 : height - ballHeight} width={ballWidth} height={ballHeight} className="opacity-100" />
            </div> */}
            {/* <div className="w-110 h-50">
                <IconRefresh />
            </div> */}
        </div>
    );
}

export default TransitionBall;
