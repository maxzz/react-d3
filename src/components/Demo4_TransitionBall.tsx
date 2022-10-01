import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Ball, BallAt, ShapeNestedSVG } from '@ui/Demo4_TransitionBallShapes';
import { FrameOfDemo } from '@ui/FrameOfDemo';

const sceneBounds = { w: 480 - (8 + 4) * 2, h: 256 - (8 + 4) * 2 }; // margin = 8; padding = 4
const ball = { w: 20, h: 20 };
const square = { w: 60, h: 80 };
const circle = { r: 50, };

export function Demo4_TransitionBall() {
    const [onLeft, setOnLeft] = useState(true);

    // useEffect(() => {
    //     const timer = d3.interval(() => setOnLeft(v => !v), 3000);
    //     return () => timer.stop();
    // }, []);

    //TODO: run animation by checkbox

    return (
        <FrameOfDemo>
            <div className="">
                <div
                    className="relative bg-blue-400 border-8"
                    style={{ width: sceneBounds.w, height: sceneBounds.h, boxSizing: 'content-box' }}
                    onClick={() => setOnLeft(v => !v)}
                >
                    <div className="absolute w-full h-full">
                        <svg className="absolute w-full h-full">
                            <Ball
                                x={onLeft ? circle.r : sceneBounds.w - circle.r}
                                y={onLeft ? circle.r : sceneBounds.h - circle.r}
                                r={circle.r}
                            />
                            <ShapeNestedSVG
                                x={onLeft ? 0 : sceneBounds.w - square.w}
                                y={onLeft ? 0 : sceneBounds.h - square.h}
                                width={square.w}
                                height={square.h}
                            />
                        </svg>
                    </div>
                    {[0, 1, 2, 3, 9].map((i, idx) => (
                        <BallAt
                            x={onLeft ? i * ball.w * .3 : sceneBounds.w - (i + 1) * ball.w}
                            y={onLeft ? i * ball.h * .5 : sceneBounds.h - (i + 1) * ball.h}
                            width={ball.w}
                            height={ball.h}
                            key={idx}
                        />
                    ))}
                    {/* <BallAt
                        x={onLeft ? 0 : sceneBounds.w - ball.w}
                        y={onLeft ? 0 : sceneBounds.h - ball.h}
                        width={ball.w}
                        height={ball.h}
                        className="opacity-100"
                    /> */}
                </div>
            </div>
        </FrameOfDemo>
    );
}
