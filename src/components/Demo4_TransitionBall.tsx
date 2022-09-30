import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { HighlightedBall } from '@ui/HighlightedBall';

function Ball({ x, y, r }: { x: number, y: number; r: number; }) {
    const ref = useRef<SVGCircleElement>(null);
    const [realPos, setRealPos] = useState({ x, y });

    useEffect(() => {
        const ball = d3.select(ref.current);

        ball.transition('move-x')
            .duration(800)
            .ease(d3.easeBounceOut)
            .attr('cx', x)
            .style('transform', `scale(.2)`)
            .on('end', function () {
                d3.select(this)
                    .transition()
                    .duration(800)
                    .style('transform', `scale(1)`);

                setRealPos((prev) => ({ x, y: prev.y }));
            });

        ball.transition('move-y')
            .ease(d3.easeCubicInOut)
            .attr('cy', y)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));
    }, [x, y]);

    return (
        <circle ref={ref} cx={realPos.x} cy={realPos.y} r={r} fill="#78dcff80" stroke="#67d8ff80" strokeWidth={6} clipPath="circle()" >
        </circle>
    );
}

function ShapeNestedSVG({ x, y, width, height }: { x: number, y: number; width: number; height: number; }) {
    const ref = useRef<SVGSVGElement>(null);
    const [realPos, setRealPos] = useState({ x, y });

    useEffect(() => {
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

function Shape({ x, y, width, height, ...rest }: { x: number, y: number; width: number; height: number; } & HTMLAttributes<HTMLElement>) {
    const [realPos, setRealPos] = useState({ x, y });

    const refX = useRef<HTMLDivElement>(null);
    const refY = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ballX = d3.select(refX.current);
        const ballY = d3.select(refY.current);

        ballX.transition('move-x')
            .duration(3800)
            .ease(d3.easeBounceOut)
            .style('transform', `translateX(${x}px)`)
            .on('end', () => setRealPos((prev) => ({ x, y: prev.y })));

        ballY.transition('move-y')
            .duration(800)
            .ease(d3.easeCubicInOut)
            .style('transform', `translateY(${y}px)`)
            .on('end', () => setRealPos((prev) => ({ x: prev.x, y })));
    }, [x, y]);

    return (
        <div ref={refX} style={{ transform: `translateX(${realPos.x}px`, display: 'inline-block' }} {...rest}>
            <div ref={refY} style={{ transform: `translateY(${realPos.y}px)` }}>
                <HighlightedBall style={{ width, height }} preserveAspectRatio="none" transforms="scale(.5)" />
            </div>
        </div>
    );
}

const width = 480 - 8 * 2;
const height = 256 - 8 * 2;

const ballWidth = 20;
const ballHeight = 20;

const squareWidth = 60;
const squareHeight = 80;

const circleR = 50;

export function Demo4_TransitionBall() {
    const [onLeft, setOnLeft] = useState(true);

    useEffect(() => {
        const timer = d3.interval(() => setOnLeft(v => !v), 3000);
        return () => timer.stop();
    }, []);

    return (
        <div className="relative bg-blue-400 border-8" style={{ width, height, boxSizing: 'content-box' }} onClick={() => setOnLeft(v => !v)}>
            <div className="absolute w-full h-full">
                <svg className="absolute w-full h-full">
                    <Ball x={onLeft ? circleR : width - circleR} y={onLeft ? circleR : height - circleR} r={circleR} />
                    <ShapeNestedSVG x={onLeft ? 0 : width - squareWidth} y={onLeft ? 0 : height - squareHeight} width={squareWidth} height={squareHeight} />
                </svg>
            </div>
            {[0, 1, 2, 3, 9].map((i) => (
                <Shape
                    x={onLeft ? i * ballWidth * .3 : width - (i + 1) * ballWidth}
                    y={onLeft ? i * ballHeight * .5 : height - (i + 1) * ballHeight}
                    width={ballWidth}
                    height={ballHeight}
                    key={i}
                />
            ))}
            {/* <Shape x={onLeft ? 0 : width - ballWidth} y={onLeft ? 0 : height - ballHeight} width={ballWidth} height={ballHeight} className="opacity-100" /> */}
        </div>
    );
}
