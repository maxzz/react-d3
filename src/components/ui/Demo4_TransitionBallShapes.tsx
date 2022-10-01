import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HighlightedBallRaw(props: React.SVGAttributes<SVGSVGElement> & { transforms?: string; }, svgRef: React.Ref<SVGSVGElement>) {
    const { transforms, ...rest } = props;
    return (
        <svg ref={svgRef} viewBox="0 0 432 432" {...rest}>
            <defs>
                <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="16.6" x2="415.4" y1="216" y2="216">
                    <stop offset="0" stopColor="#c7f8ff" />
                    <stop offset=".3" stopColor="#cfecff" />
                    <stop offset=".8" stopColor="#e4cbff" />
                    <stop offset="1" stopColor="#ecbfff" />
                </linearGradient>
                <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="551.2" x2="551.2" y1="234.7" y2="461.4">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
            </defs>

            <g style={{ ...(transforms && { transform: transforms }) }}>
                <circle cx="216" cy="216" fill="#8bbbe1" r="216" />
                <circle cx="216" cy="216" fill="url(#a)" r="199.4" />
                <path
                    fill="url(#b)"
                    transform="translate(-335.8 -200.7)"
                    d="M704.8 375.6c8.2 38.4-27.6-12.8-157.7 31.7-86.3 29.5-150.5 4.2-150.5-26.3s56-144.5 155.5-144.5 143.7 97.2 152.7 139.1z"
                />
            </g>
        </svg>
    );
}

export const HighlightedBall = React.forwardRef(HighlightedBallRaw);

export function Ball({ x, y, r }: { x: number, y: number; r: number; }) {
    const circleRef = useRef<SVGCircleElement>(null);
    const [realPos, setRealPos] = useState({ x, y });

    useEffect(() => {
        const ball = d3.select(circleRef.current);

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

    return <circle ref={circleRef} cx={realPos.x} cy={realPos.y} r={r} fill="#78dcff80" stroke="#67d8ff80" strokeWidth={6} clipPath="circle()" />;
}

export function ShapeNestedSVG({ x, y, width, height }: { x: number, y: number; width: number; height: number; }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [realPos, setRealPos] = useState({ x, y });

    useEffect(() => {
        const ball = d3.select(svgRef.current);

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
        <HighlightedBall ref={svgRef} x={`${realPos.x}px`} y={`${realPos.y}px`} width={`${width}px`} height={`${height}px`} transforms="" preserveAspectRatio="none" />
    );
}

export function BallAt({ x, y, width, height, ...rest }: { x: number, y: number; width: number; height: number; } & HTMLAttributes<HTMLElement>) {
    const [realPos, setRealPos] = useState({ x, y });

    const xRef = useRef<HTMLDivElement>(null);
    const yRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ballX = d3.select(xRef.current);
        const ballY = d3.select(yRef.current);

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
        <div ref={xRef} style={{ transform: `translateX(${realPos.x}px`, display: 'inline-block' }} {...rest}>
            <div ref={yRef} style={{ transform: `translateY(${realPos.y}px)` }}>
                <HighlightedBall style={{ width, height }} preserveAspectRatio="none" transforms="scale(.5)" />
            </div>
        </div>
    );
}
