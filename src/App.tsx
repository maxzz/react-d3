import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';
//import BgLines from './components/XtraBgLines';

function App() {
    return (
        <div className="h-screen bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
            <div className="w-full h-full flex flex-col z-10">
                {/* <div className="h-screen bg-green-50" style={{backgroundColor: '#defeff', backgroundImage: 'linear-gradient(347deg, #defeff 0%, #D2FFE2 100%)'}}> */}
                {/* <BgLines /> */}

                <div className="flex flex-col items-center">
                    <StarD3Interpolated />
                    <HierarchyClassic />
                </div>

                <div className="">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
