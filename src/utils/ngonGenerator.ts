import { curveCatmullRomClosed, curveLinearClosed, lineRadial, randomUniform } from 'd3';
import { reduceIndentByLast } from './indentation';

export type ShapeParams = {
    nRays: number;
    iRadius: number;
    oRadius: number;
    smooth: boolean;
};

export type RandomizeParams = {
    inner: boolean;
    outer: boolean;
    update: number; // any new number will update the shape.
};

export function viewboxCentered(size: number): string {
    return `${-size / 2} ${-size / 2} ${size} ${size}`;
}

export function generateSVG({ path, outerPoints, size }: { path: string; outerPoints: [number, number][]; size: number; }): string {
    const viewbox = viewboxCentered(size);
    const circles = () => outerPoints.map(([x, y]) => `            <circle r="5" cx="${x}" cy="${y}" />`).join('\n');
    let s =
        `<svg viewBox="${viewbox}" width="256px" height="256px" stroke="#8c00ff" strokeWidth="2" fill="#9494e4" xmlns="http://www.w3.org/2000/svg">
        <path
            d="${path}"
        />${outerPoints.length ? `\n        <g stroke="#7c82ff80" strokeWidth=".5" fill="none">\n${circles()}\n        </g>` : ''}
    </svg>
    `;
    return reduceIndentByLast(s);
}

// const seed = 0.25160386911120525; // a number in [0,1)
// const source = randomLcg(seed);

// function random(min: number, max: number) {
//     const randomRes = randomNormal.source(source)(min, max);
//     return randomRes;
// }

export function generatePath(shape: ShapeParams, randomize: RandomizeParams): readonly [string, [number, number][]] {
    const { nRays, iRadius, oRadius, smooth } = shape;
    const { inner, outer, } = randomize;

    const step = 2 * Math.PI / (nRays * 2);
    const points: [number, number][] = [];
    for (let i = 0; i < nRays * 2; i++) {
        if (inner && outer) {
            points.push([i * step, randomUniform(oRadius, iRadius)()]);
            //points.push([i * step, random(oRadius, iRadius)()]);
        } else if (outer) {
            //points.push([i * step, i % 2 === 0 ? random(iRadius, oRadius)() : iRadius]);
            points.push([i * step, i % 2 === 0 ? randomUniform(iRadius, oRadius)() : iRadius]);
        } else {
            points.push([i * step, i % 2 === 0 ? oRadius : iRadius]);
        }
    }

    const outerPts: [number, number][] = points.filter((_, idx) => idx % 2 === 0).map(([a, r]) => {
        return [r * Math.sin(a), r * -Math.cos(a)];
    });

    let gen = lineRadial();
    gen = smooth ? gen.curve(curveCatmullRomClosed) : gen.curve(curveLinearClosed);
    return [gen(points) || '', outerPts] as const;

    // gen = smooth ? gen.curve(curveStepAfter) : gen.curve(curveLinearClosed);
    // return [`${gen(points)}${smooth ? 'z': ''}` || '', outerPts] as const;
}
