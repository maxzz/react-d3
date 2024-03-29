import React, { forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { generatePath, generateSVG, RandomizeParams, ShapeParams, viewboxCentered } from '@/utils/ngonGenerator';
import { FrameOfDemo } from '@ui/FrameOfDemo';
import { ButtonQuick } from '@ui/ButtonQuick';
import { Slider } from '@ui/Slider';
import { Checkbox } from '@ui/Checkbox';
import { IconRefresh, IconSave } from '@ui/UIIcons';
import { downloadTextAsFile } from '@/utils/download-data';

const VIEWBOX_SIZE = 200;

type InterpolatedShapeProps = {
    shape: ShapeParams;
    randomize: RandomizeParams;
    showOuter: boolean;
};

type InterpolatedShapeActions = {
    save: () => void;
};

function InterpolatedShapeRaw({ shape, randomize, showOuter }: InterpolatedShapeProps, ref: Ref<InterpolatedShapeActions>) {
    const { nRays, iRadius, oRadius, smooth } = shape;
    const { inner, outer, update, } = randomize;

    const path = useMemo(() => {
        return generatePath(shape, randomize);
    }, [nRays, iRadius, oRadius, smooth, inner, outer, update,]);

    useImperativeHandle(ref, () => ({
        save: () => {
            downloadTextAsFile(generateSVG({ path: path[0], outerPoints: showOuter ? path[1] : [], size: VIEWBOX_SIZE }), 'red3.svg');
        }
    }));

    return (
        <svg className="" stroke="white" strokeWidth="2" fill="currentColor" viewBox={`${viewboxCentered(VIEWBOX_SIZE)}`}>
            <path className="" d={path[0]} />

            {showOuter &&
                <g stroke="white" strokeWidth=".5" fill="none">
                    {path[1].map(([x, y], idx) => <circle cx={x} cy={y} r={5} key={idx} />)}
                </g>
            }
        </svg>
    );
}

const InterpolatedShape = forwardRef(InterpolatedShapeRaw);

export function Demo1_StarD3Interpolated() {
    const [nRays, setURays] = useState(21);
    const [iRadius, setIRadius] = useState(89);
    const [oRadius, setORadius] = useState(7);
    const [smooth, setSmooth] = useState(true);
    const shape = {
        nRays,
        iRadius,
        oRadius,
        smooth,
    };

    const [iRandom, setIRandom] = useState(true);
    const [oRandom, setORandom] = useState(true);
    const [update, setUpdate] = useState(0);
    const randomize: RandomizeParams = {
        inner: iRandom,
        outer: oRandom,
        update,
    };

    const [showOuter, setShowOuter] = useState(false);

    function onRandomBoth(v: boolean) {
        setIRandom(v);
        v && setORandom(v);
    }

    function onRandomOuter(v: boolean) {
        setIRandom(false);
        setORandom(v);
    }

    const genCb = useRef<InterpolatedShapeActions>(null);

    return (
        <FrameOfDemo>
            <div className="flex justify-between space-x-1 select-none">
                {/* Shape */}
                <div className="w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200" style={{ boxShadow: '#0000001f 0px 0px 3px 1px' }}>
                    <InterpolatedShape shape={shape} randomize={randomize} showOuter={showOuter} ref={genCb} />
                </div>

                {/* Controls */}
                <div className="flex-1 p-2 bg-white/10 rounded flex flex-col justify-between">
                    {/* Sliders */}
                    <div className="">
                        <Slider labelWidth="6rem" label="# Rays" value={nRays} onChange={(v) => setURays(v)} />
                        <Slider labelWidth="6rem" label="Inner radius" value={iRadius} min={-100} onChange={(v) => setIRadius(v)} />
                        <Slider labelWidth="6rem" label="Outer radius" value={oRadius} onChange={(v) => setORadius(v)} />
                    </div>
                    {/* Options */}
                    <div className="relative">
                        {/* <Checkbox2 label={'Smooth lines'} /> */}
                        <Checkbox label="Smooth lines" checked={smooth} onChange={setSmooth} />
                        <Checkbox label="Randomize outer and inner radius" checked={iRandom} onChange={onRandomBoth} />
                        <Checkbox label="Randomize outer radius" checked={oRandom} onChange={onRandomOuter} />
                        <Checkbox label="Show outer points" checked={showOuter} onChange={setShowOuter} />
                        
                        {/* Actions */}
                        <div className="absolute text-sm bottom-0 right-0 space-x-1">
                            <ButtonQuick className="w-7 h-7" title="Save SVG" onClick={() => genCb?.current?.save()}><IconSave /></ButtonQuick>
                            <ButtonQuick className="w-7 h-7" title="Update view" onClick={() => setUpdate(v => v + 1)}><IconRefresh /></ButtonQuick>
                        </div>
                    </div>
                </div>
            </div>
        </FrameOfDemo>
    );
}
