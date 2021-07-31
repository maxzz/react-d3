import React from 'react';

function HighlightedBallRaw(props: React.SVGAttributes<SVGSVGElement> & { transforms: string; }, ref: React.Ref<SVGSVGElement>) {
    const { transforms, ...rest } = props;
    return (
        <svg ref={ref} viewBox="0 0 432 432" {...props}>
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
            <g style={{ ...(transforms && { transform: transforms }), }}>
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

const HighlightedBall = React.forwardRef(HighlightedBallRaw);

export default HighlightedBall;
