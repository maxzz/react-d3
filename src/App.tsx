import React from 'react';
import './App.scss';
import Footer from './components/ui/Footer';
import FunPlot from './components/FunPlot';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';
import FunPieChart from './components/FunPieChart';
import LinePlayground from './components/x-nun/XOrgLinePlayground';
import LineChart from './components/LineChart';
import MotionBallTransition from './components/MotionBallTransition';

function App() {
    return (
        <div className="h-screen">
            <div className="h-full overflow-y-auto bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
                <div className="w-full h-full flex flex-col justify-between items-center">
                    {/* Demos */}
                    <div className="mt-4 flex-auto space-y-4 max-w-5xl min-w-[30rem] flex flex-col flex-wrap items-center z-10">
                        {/* <StarD3Interpolated /> */}
                        {/* <FunPlot /> */}
                        <MotionBallTransition />
                        {/* <LineChart /> */}
                        {/* <FunPieChart /> */}
                        {/* <LinePlayground /> */}
                        {/* <HierarchyClassic /> */}
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
