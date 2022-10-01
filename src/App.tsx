import React from 'react';
import { Demo1_StarD3Interpolated } from '@/components/Demo1_StarD3Interpolated';
import { Demo2_FunPlotFunPlot } from '@/components/Demo2_FunPlot';
import { Demo3_FunBarsChart } from '@/components/Demo3_FunBarsChart';
import { Demo4_TransitionBall } from '@/components/Demo4_TransitionBall';
import { Demo5_LineChart } from '@/components/Demo5_LineChart';
import { Demo6_FunPieChart } from '@/components/Demo6_FunPieChart';
import { Demo7_LinePlayground } from '@/components/x-nun/Demo7_LinePlaygroundOrg';
import { Demo8_HierarchyClassic } from '@/components/Demo8_HierarchyClassic';
import { FrameOfDemo } from '@ui/FrameOfDemo';
import { AppFooter } from '@ui/AppFooter';
import './App.scss';

function AppHeader() {
    return <div className="px-4 pt-2 text-sm text-white/50">D3 on React's way</div>; // TODO: Add header and explanation
}

function App() {
    return (
        <div className="min-h-screen"> {/* no h-screen which prevents screencaptures */}
            <div className="h-full overflow-y-auto bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
                <div className="w-full h-full flex flex-col justify-between items-center">
                    {/* Header */}
                    <div className="self-end">
                        <AppHeader />
                    </div>
                    {/* Demos */}
                    <div className="mt-2 mb-4 flex-auto space-y-4 max-w-5xl min-w-[30rem] flex flex-col flex-wrap items-center z-10">
                        <Demo1_StarD3Interpolated />
                        <Demo2_FunPlotFunPlot />

                        <Demo3_FunBarsChart />

                        <Demo5_LineChart />
                        <Demo6_FunPieChart />
                        <Demo7_LinePlayground />
                        <Demo8_HierarchyClassic />

                        <Demo4_TransitionBall />

                        <FrameOfDemo>
                            <div className="text-slate-900/50">That's all for now</div>
                        </FrameOfDemo>
                    </div>
                    {/* Footer */}
                    <div className="self-end">
                        <AppFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
