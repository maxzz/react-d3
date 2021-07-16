import React from 'react';


function HierarchyPanD3() {

    const ref = React.useRef(null);
    React.useEffect(() => {
        
    }, []);

    return (
        <svg ref={ref}>

        </svg>
    );
}

function HierarchyPan() {
    return (
        <div>
            <HierarchyPanD3 />
        </div>
    );
}

export default HierarchyPan;
