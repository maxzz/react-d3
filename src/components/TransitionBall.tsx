import React from 'react';
import * as d3 from 'd3';

function Ball({ x, y }: { x: number, y: number; }) {
    const ref = React.useRef<SVGCircleElement>(null);
    const [realPos, setRealPos] = React.useState({ x, y });

    React.useEffect(() => {
        const ball = d3.select(ref.current);

        ball.transition()
            .duration(800)
            .ease(d3.easeBounceOut)
            .attr('cx', x)
            .attr('cy', y)
            .on('end', () => setRealPos({ x, y }));
    }, [x, y]);

    return (
        <circle ref={ref} cx={realPos.x} cy={realPos.y} r={45}>
        </circle>
    );
}

function TransitionBall() {
    const [pos, setPos] = React.useState({ x: 150, y: 50 });
    const [onLeft, setOnLeft] = React.useState(true);

    return (
        <div className="w-96 h-96 bg-yellow-100">
            <svg className="bg-red-100" onClick={() => {
                setOnLeft(v => !v);
            }}>
                <Ball x={onLeft ? 20 : 150} y={pos.y} />
            </svg>
        </div>
    );
}

export default TransitionBall;
