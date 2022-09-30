import React from 'react';
import './App.scss';
import Footer from './components/ui/Footer';
import Demo1_StarD3Interpolated from './components/Demo1_StarD3Interpolated';
import Demo2_FunPlotFunPlot from './components/Demo2_FunPlot';
import Demo3_FunBarsChart from './components/Demo3_FunBarsChart';
import Demo4_TransitionBall from './components/Demo4_TransitionBall';
import Demo5_LineChart from './components/Demo5_LineChart';
import Demo6_FunPieChart from './components/Demo6_FunPieChart';
import Demo7_LinePlayground from './components/x-nun/Demo7_XOrgLinePlayground';
import Demo8_HierarchyClassic from './components/HierarchyClassic';

function App() {
    return (
        <div className="h-screen">
            <div className="h-full overflow-y-auto bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
                <div className="w-full h-full flex flex-col justify-between items-center">
                    {/* Demos */}
                    <div className="mt-4 flex-auto space-y-4 max-w-5xl min-w-[30rem] flex flex-col flex-wrap items-center z-10">
                        <Demo1_StarD3Interpolated />
                        <Demo2_FunPlotFunPlot />

                        <Demo3_FunBarsChart />
                        <Demo4_TransitionBall />

                        <Demo5_LineChart />
                        <Demo6_FunPieChart />
                        <Demo7_LinePlayground />
                        <Demo8_HierarchyClassic />
                    </div>
                    {/* Footer */}
                    <div className="self-end">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
