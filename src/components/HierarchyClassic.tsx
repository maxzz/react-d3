import React from 'react';
import * as d3 from 'd3';

function HierarchyClassic() {
    const ref = React.useRef(null);

    React.useEffect(() => {

        type TreeItemData = {
            id: string;
            parentId?: string;
        };

        type TItem = d3.HierarchyPointNode<TreeItemData>;

        const width = 300;
        const dx = 12;
        const dy = 70;
        const tree = d3.tree<TreeItemData>().nodeSize([dx, dy]);
        const treeLink = d3.linkHorizontal<d3.HierarchyPointLink<TItem>, d3.HierarchyPointNode<TItem>>().x((d: any) => d.y).y((d: any) => d.x);

        const svg = d3.select(ref.current);

        svg.select('*').remove(); //Proper temp hack to fix HMR problem.

        function graph(_root: d3.HierarchyNode<TreeItemData>, {
            label = (d: TItem) => d.data.id,
            highlight = (d: TItem) => false,
            marginLeft = 40,
        } = {}) {
            const root: TItem = tree(_root);

            let x0 = Infinity;
            let x1 = -x0;
            root.each((d: TItem) => {
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
                .attr("stroke", (d) => highlight(d.source) && highlight(d.target) ? "red" : null)
                .attr("stroke-opacity", (d) => highlight(d.source) && highlight(d.target) ? 1 : null)
                .attr("d", treeLink as any);

            // circle and text
            const node = g.append("g")
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .selectAll("g")
                .data(root.descendants())
                .join("g")
                .attr("transform", (d) => `translate(${d.y},${d.x})`);

            // circle
            node.append("circle")
                .attr("fill", (d) => highlight(d) ? "red" : d.children ? "#5a57" : "none")
                .attr("stroke", (d) => highlight(d) ? "red" : d.children ? "#585" : "#5a5")
                .attr("stroke-width", (d) => d.children ? .7 : 1)
                .attr("r", 4);

            // text
            node.append("text")
                .attr("fill", (d: TItem) => highlight(d) ? "red" : 'blue')
                .attr("dy", "0.32em")
                .attr("x", (d: TItem) => d.children ? -6 : 6)
                .attr("text-anchor", (d: TItem) => d.children ? "end" : "start")
                .text(label)
                .clone(true).lower()
                .attr("stroke-width", 1.7)
                .attr("stroke", "#4aff8780");

            return svg.node();
        }

        const chaos: d3.HierarchyNode<TreeItemData> = d3.stratify<TreeItemData>()([
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
