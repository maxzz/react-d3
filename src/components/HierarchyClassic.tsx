import React from 'react';
import * as d3 from 'd3';

function HierarchyClassic() {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const svg = d3.select(ref.current);

        svg.select('g').remove(); //Proper temp hack to fix HMR problem.
        //const hackEl = (svg as any)?._groups?.[0]?.[0] as SVGSVGElement; hackEl && (hackEl.innerHTML = ''); //Temp hack to fix HMR problem.

        const width = 300;

        const dx = 12;
        const dy = 70;
        const tree = d3.tree().nodeSize([dx, dy]);
        const treeLink = d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x);

        function graph(root: any, {
            label = (d: any) => d.data.id,
            highlight = (d: any) => false,
            marginLeft = 40,
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

            // lines
            const link = g.append("g")
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("stroke-opacity", 0.4)
                .attr("stroke-width", 1.2)
                .selectAll("path")
                .data(root.links())
                .join("path")
                .attr("stroke", (d: any) => highlight(d.source) && highlight(d.target) ? "red" : null)
                .attr("stroke-opacity", (d: any) => highlight(d.source) && highlight(d.target) ? 1 : null)
                .attr("d", treeLink as any);

            // circle and text
            const node = g.append("g")
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .selectAll("g")
                .data(root.descendants())
                .join("g")
                .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

            // circle
            node.append("circle")
                .attr("fill", (d: any) => highlight(d) ? "red" : d.children ? "#5a57" : "none")
                .attr("stroke", (d: any) => highlight(d) ? "red" : d.children ? "#585" : "#5a5")
                .attr("stroke-width", (d: any) => d.children ? .7 : 1)
                .attr("r", 4);

            // text
            node.append("text")
                .attr("fill", d => highlight(d) ? "red" : 'blue')
                .attr("dy", "0.32em")
                .attr("x", (d: any) => d.children ? -6 : 6)
                .attr("text-anchor", (d: any) => d.children ? "end" : "start")
                .text(label)
                .clone(true).lower()
                .attr("stroke-width", 1.7)
                .attr("stroke", "#4aff8780");

            return svg.node();
        }

        const chaos = d3.stratify()([
            { id: "Chaos" },
            { id: "Gaia", parentId: "Chaos" },
            { id: "Eros", parentId: "Chaos" },
            { id: "Erebus", parentId: "Chaos" },
            { id: "Tartarus", parentId: "Chaos" },

            { id: "Tartarus 1", parentId: "Tartarus" },
            { id: "Tartarus 2", parentId: "Tartarus" },
            { id: "Tartarus 3", parentId: "Tartarus" },
            { id: "Tartarus 4", parentId: "Tartarus" },
            { id: "Tartarus 5", parentId: "Tartarus" },
            { id: "Tartarus 6", parentId: "Tartarus" },
            { id: "Tartarus 7", parentId: "Tartarus" },
            { id: "Tartarus 8", parentId: "Tartarus" },

            { id: "Tartarus 1", parentId: "Tartarus" },
            { id: "Tartarus 2", parentId: "Tartarus" },
            { id: "Tartarus 3", parentId: "Tartarus" },
            { id: "Tartarus 4", parentId: "Tartarus" },
            { id: "Tartarus 5", parentId: "Tartarus" },
            { id: "Tartarus 6", parentId: "Tartarus" },
            { id: "Tartarus 7", parentId: "Tartarus" },
            { id: "Tartarus 8", parentId: "Tartarus" },

            { id: "Mountains", parentId: "Gaia" },
            { id: "Pontus", parentId: "Gaia" },
            { id: "Uranus", parentId: "Gaia" },

            { id: "Uranus 1", parentId: "Uranus" },
            { id: "Uranus 2", parentId: "Uranus" },
            { id: "Uranus 3", parentId: "Uranus" },
            { id: "Uranus 4", parentId: "Uranus" },
            { id: "Uranus 5", parentId: "Uranus" },
            { id: "Uranus 6", parentId: "Uranus" },
            { id: "Uranus 7", parentId: "Uranus" },
            { id: "Uranus 8", parentId: "Uranus" },
        ]);

        graph(chaos);

    }, []);

    return (
        <div className="w-[450px] h-48 bg-yellow-100">
            <svg className="w-full h-full" ref={ref}>

            </svg>
        </div>
    );
}

export default HierarchyClassic;
