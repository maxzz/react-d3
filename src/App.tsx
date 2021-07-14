import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';
//import BgLines from './components/XtraBgLines';

type LineProps = {
    angle?: string;
    offset?: string;
    color?: string;
};

const Line = ({ angle = '0deg', offset = '0px, 0px', color }: LineProps) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 'calc(200vw + 200vh)',
                height: '1px',
                transform: `translate(${offset}) rotate(${angle}) translate(-50%, -50%)`,
                transformOrigin: 'top left',
                backgroundColor: color,
            }}
        />
    );
};

function App() {
    return (
        <div className="h-screen bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
            <div className="w-full h-full flex flex-col justify-between z-10">
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
