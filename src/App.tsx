import React from 'react';
import './App.scss';
import Footer from './components/ui/Footer';
import FunPlot from './components/FunPlot/FunPlot';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';

function App() {
    return (
        <div className="h-screen">
            <div className="h-full overflow-y-auto bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
                <div className="w-full h-full flex flex-col justify-between items-center">
                    {/* Demos */}
                    <div className="mt-4 space-y-4 max-w-5xl flex flex-col items-center">
                        <StarD3Interpolated />
                        {/* <HierarchyClassic /> */}
                        <FunPlot />
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
