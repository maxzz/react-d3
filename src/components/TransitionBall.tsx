import React from 'react';
import * as d3 from 'd3';
import { precisionRound } from 'd3';

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

function TransitionBall() {
    const [pos, setPos] = React.useState({ x: 150, y: 50 });
    const [onLeft, setOnLeft] = React.useState(true);

    return (
        <div className="w-[300px] h-[300px] bg-yellow-100">
            <svg className="bg-red-100 w-full h-full" onClick={() => {
                setOnLeft(v => !v);
            }}>
                <Ball x={onLeft ? 20 : 280} y={onLeft ? 20 : 280} />
            </svg>
        </div>
    );
}

export default TransitionBall;
