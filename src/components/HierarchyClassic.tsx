import React from 'react';
import * as d3 from 'd3';

// Data

type Datum = {
    id: string;
    parentId?: string;
};

const chaosData: Datum[] = [
    { id: 'Chaos' },
    { id: 'Gaia', parentId: 'Chaos' },
    { id: 'Eros', parentId: 'Chaos' },
    { id: 'Erebus', parentId: 'Chaos' },
    { id: 'Tartarus', parentId: 'Chaos' },

    { id: 'Tartarus 1', parentId: 'Tartarus' },
    { id: 'Tartarus 2', parentId: 'Tartarus' },
    { id: 'Tartarus 3', parentId: 'Tartarus' },
    { id: 'Tartarus 4', parentId: 'Tartarus' },
    { id: 'Tartarus 5', parentId: 'Tartarus' },
    { id: 'Tartarus 6', parentId: 'Tartarus' },
    { id: 'Tartarus 7', parentId: 'Tartarus' },
    { id: 'Tartarus 8', parentId: 'Tartarus' },

    { id: 'Tartarus 1', parentId: 'Tartarus' },
    { id: 'Tartarus 2', parentId: 'Tartarus' },
    { id: 'Tartarus 3', parentId: 'Tartarus' },
    { id: 'Tartarus 4', parentId: 'Tartarus' },
    { id: 'Tartarus 5', parentId: 'Tartarus' },
    { id: 'Tartarus 6', parentId: 'Tartarus' },
    { id: 'Tartarus 7', parentId: 'Tartarus' },
    { id: 'Tartarus 8', parentId: 'Tartarus' },

    { id: 'Tartarus 1', parentId: 'Tartarus' },
    { id: 'Tartarus 2', parentId: 'Tartarus' },
    { id: 'Tartarus 3', parentId: 'Tartarus' },
    { id: 'Tartarus 4', parentId: 'Tartarus' },
    { id: 'Tartarus 5', parentId: 'Tartarus' },
    { id: 'Tartarus 6', parentId: 'Tartarus' },
    { id: 'Tartarus 7', parentId: 'Tartarus' },
    { id: 'Tartarus 8', parentId: 'Tartarus' },

    { id: 'Mountains', parentId: 'Gaia' },
    { id: 'Pontus', parentId: 'Gaia' },
    { id: 'Uranus', parentId: 'Gaia' },

    { id: 'Uranus 1', parentId: 'Uranus' },
    { id: 'Uranus 2', parentId: 'Uranus' },
    { id: 'Uranus 3', parentId: 'Uranus' },
    { id: 'Uranus 4', parentId: 'Uranus' },
    { id: 'Uranus 5', parentId: 'Uranus' },
    { id: 'Uranus 6', parentId: 'Uranus' },
    { id: 'Uranus 7', parentId: 'Uranus' },
    { id: 'Uranus 8', parentId: 'Uranus' },
];

type NodeDataEx = {
    idNumber: number;
    _children: TItem[] | undefined;
};

//type TItem = d3.HierarchyPointNode<Datum> & NodeDataEx;
//type MyNode = d3.HierarchyNode<Datum> & NodeDataEx;
type TItem = d3.HierarchyPointNode<Datum> & NodeDataEx;

// D3 extentions

//type D3Selection<T extends d3.BaseType> = d3.Selection<T, unknown, null, undefined>;
type D3Selection<T extends d3.BaseType> = d3.Selection<T, TItem, null, undefined>;

function getLeftRight<T>(root: d3.HierarchyPointNode<T>): readonly [number, number] {
    let x0 = Infinity; // left
    let x1 = -x0; // right
    root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });
    return [x0, x1] as const;
}

function HierarchyClassicRaw() {
    const ref = React.useRef(null);

    React.useEffect(() => {

        const width = 300;
        const nodeDX = 12;
        const nodeDY = 70;
        const tree = d3.tree<Datum>().nodeSize([nodeDX, nodeDY]);
        const treeLink = d3.linkHorizontal<d3.HierarchyPointLink<TItem>, d3.HierarchyPointNode<TItem>>().x((d: any) => d.y).y((d: any) => d.x);

        const svg = d3.select(ref.current)
            .style('--line-color', '#ffffff')
            .style('--text-color', '#00295d')
            .style('--circle-fill', '#0070ff')
            .style('overflow', 'visible');

        let gLinks: D3Selection<SVGGElement>;
        let gNodes: D3Selection<SVGGElement>;

        let mainG = svg.select<SVGGElement>('g'); // Hack to fix HMR problem
        if (mainG.empty()) {
            mainG = svg.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 8);

            gLinks = mainG.append('g')
                .classed('links', true)
                .attr('fill', 'none')
                .attr('stroke', 'var(--line-color)')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 1.2);

            gNodes = mainG.append('g')
                .classed('nodes', true)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-width', 3);
        } else {
            gLinks = mainG.selectChild(':nth-child(1)');
            gNodes = mainG.selectChild(':nth-child(2)');
        }

        function graph(rootData: TItem, { label = (d: TItem) => d.data.id, highlight = (d: TItem) => false, marginLeft = 40, } = {}) {
            const root: TItem = tree(rootData) as TItem;
            const nodes = root.descendants();
            const links = root.links();

            let [x0, x1] = getLeftRight(root);
            svg.attr('viewBox', [0, 0, width, x1 - x0 + nodeDX * 2] as any);
            mainG.attr('transform', `translate(${marginLeft},${nodeDX - x0})`);

            const margin = { top: 0, right: 0, bottom: 0, left: 0 };
            const height = x1 - x0 + margin.top + margin.bottom;

            const duration = 2500; //d3.event && d3.event.altKey ? 2500 : 250;
            const transition = svg.transition()
                .duration(duration)
                //.attr("viewBox", [-margin.left, x0 - margin.top, width, height] as any)
                .attr('viewBox', [0, 0, width, x1 - x0 + nodeDX * 2] as any)
                .tween("resize", (window.ResizeObserver ? null : () => () => svg.dispatch("toggle")) as any) as any;

            // lines
            const link = gLinks.selectAll('path').data(links) as any as d3.Selection<d3.BaseType, TItem, SVGGElement, unknown>;

            const linkEnter = link.enter().append('path');

            linkEnter
                .attr('stroke', (d) => highlight(d.source) && highlight(d.target) ? 'red' : null)
                .attr('stroke-opacity', (d) => highlight(d.source) && highlight(d.target) ? 1 : null)
                .attr('d', treeLink as any);

            // circle and text group
            const node = gNodes.selectAll<SVGGElement, TItem>('g').data(nodes);

            const nodeEnter = node.enter().append('g')
                .attr('transform', (d) => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .on("click", (event, d) => {
                    d.children = d.children ? null : d._children;
                    //graph(d);
                });

            // circle
            nodeEnter.append('circle')
                .attr('fill', (d) => highlight(d) ? 'red' : d.children ? 'var(--circle-fill)' : 'var(--circle-fill)')
                .attr('stroke', (d) => highlight(d) ? 'red' : d.children ? 'var(--line-color)' : 'var(--line-color)')
                .attr('stroke-width', (d) => d.children ? .7 : .7)
                .attr('r', 3);

            // text
            nodeEnter.append('text')
                .style('background-color', 'red')
                .attr('fill', (d: TItem) => highlight(d) ? 'red' : 'var(--text-color)')
                .attr('dy', '0.32em')
                .attr('x', (d: TItem) => d.children ? -6 : 6)
                .attr('text-anchor', (d: TItem) => d.children ? 'end' : 'start')
                .text(label);//.clone(true).lower().attr('stroke-width', 1.7).attr('stroke', '#4aff8780');

            // Transition nodes to their new position.
            const nodeUpdate = node.merge(nodeEnter).transition(transition)
                .attr("transform", d => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            const nodeExit = node.exit().transition(transition).remove()
                .attr("transform", d => `translate(${root.y},${root.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            return svg.node();
        }

        const chaos: TItem = d3.stratify<Datum>()(chaosData) as TItem || {};

        (chaos as any).x0 = nodeDY / 2;
        (chaos as any).y0 = 0;
        chaos.descendants().forEach((d, i) => {
            d.idNumber = i;
            d._children = d.children;
        });

        graph(chaos);
    }, []);

    return (
        <div className="w-full">
            <svg className="bg-blue-400 border-8 border-blue-200" ref={ref}>
            </svg>
        </div>
    );
}

function HierarchyClassic() {
    return (
        <HierarchyClassicRaw />
    );
}

export default HierarchyClassic;
