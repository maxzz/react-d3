import React from 'react';
type LineProps = {
    angle?: string;
    offset?: string;
    color?: string;
};

const Line = ({ angle = '0deg', offset = '0px, 0px', color }: LineProps) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 'calc(200vw + 200vh)',
                height: '1px',
                transform: `translate(${offset}) rotate(${angle}) translate(-50%, -50%)`,
                transformOrigin: 'top left',
                backgroundColor: color,
            }}
        />
    );
};

function BgLines() {
    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            <Line angle="45deg" offset="10px, 0px" color="red" />
        </div>
    );
}

export default BgLines;
