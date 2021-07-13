import React from 'react';
import * as d3 from 'd3';

function HierarchyClassic() {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.append("circle")
            .attr("cx", 100)
            .attr("cy", 70)
            .attr("r", 50);
    }, []);

    return (
        <div className="w-48 h-48">
            <svg className="w-full h-full bg-red-100" ref={ref}>

            </svg>
        </div>
    );
}

export default HierarchyClassic;
