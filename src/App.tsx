import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';

function App() {
    return (
        <div className="h-screen">
            <div className="h-full overflow-y-auto bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
                <div className="w-full h-full flex flex-col justify-between z-10">
                    <div className="flex flex-col items-center">
                        <StarD3Interpolated />
                        <HierarchyClassic />
                    </div>
                    <div className="">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
