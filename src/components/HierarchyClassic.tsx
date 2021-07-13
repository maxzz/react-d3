import React from 'react';
import * as d3 from 'd3';

function HierarchyClassic() {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const svg = d3.select(ref.current);

        const width = 300;

        const dx = 12;
        const dy = 70;
        const tree = d3.tree().nodeSize([dx, dy]);
        const treeLink = d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x);

        function graph(root: any, {
            label = (d: any) => d.data.id,
            highlight = (d: any) => false,
            marginLeft = 40
        } = {}) {
            root = tree(root);

            let x0 = Infinity;
            let x1 = -x0;
            root.each((d: any) => {
                if (d.x > x1) x1 = d.x;
                if (d.x < x0) x0 = d.x;
            });

            svg.attr("viewBox", [0, 0, width, x1 - x0 + dx * 2] as any)
                .style("overflow", "visible");

            const g = svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("transform", `translate(${marginLeft},${dx - x0})`);

            const link = g.append("g")
                .attr("fill", "none")
                .attr("stroke", "#555")
                .attr("stroke-opacity", 0.4)
                .attr("stroke-width", 1.5)
                .selectAll("path")
                .data(root.links())
                .join("path")
                .attr("stroke", (d: any) => highlight(d.source) && highlight(d.target) ? "red" : null)
                .attr("stroke-opacity", (d: any) => highlight(d.source) && highlight(d.target) ? 1 : null)
                .attr("d", treeLink as any);

            const node = g.append("g")
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .selectAll("g")
                .data(root.descendants())
                .join("g")
                .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

            node.append("circle")
                .attr("fill", (d: any) => highlight(d) ? "red" : d.children ? "#555" : "#999")
                .attr("r", 4);

            node.append("text")
                .attr("fill", d => highlight(d) ? "red" : null)
                .attr("dy", "0.31em")
                .attr("x", (d: any) => d.children ? -6 : 6)
                .attr("text-anchor", (d: any) => d.children ? "end" : "start")
                .text(label)
                .clone(true).lower()
                .attr("stroke", "white");

            return svg.node();
        }

        const chaos = d3.stratify()([
            { id: "Chaos" },
            { id: "Gaia", parentId: "Chaos" },
            { id: "Eros", parentId: "Chaos" },
            { id: "Erebus", parentId: "Chaos" },
            { id: "Tartarus", parentId: "Chaos" },
            { id: "Mountains", parentId: "Gaia" },
            { id: "Pontus", parentId: "Gaia" },
            { id: "Uranus", parentId: "Gaia" }
        ]);

        graph(chaos);

    }, []);

    return (
        <div className="w-[450px] h-48">
            <svg className="w-full h-full bg-red-100" ref={ref}>

            </svg>
        </div>
    );
}

export default HierarchyClassic;
