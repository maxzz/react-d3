import React, { useEffect, useRef } from 'react';
import { Data as JSONDATA } from './HeirarchyPanData';
import { treeJSON } from './HierarchyPanD3';

function HierarchyPanD3() {

    const ref = useRef(null);
    useEffect(() => {
        treeJSON(JSONDATA);
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
