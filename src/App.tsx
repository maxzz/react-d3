import React from 'react';
import './App.scss';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';

function App() {
    return (
        <div className="h-screen bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500">
        {/* <div className="h-screen bg-green-50" style={{backgroundColor: '#defeff', backgroundImage: 'linear-gradient(347deg, #defeff 0%, #D2FFE2 100%)'}}> */}
            <StarD3Interpolated />
            <HierarchyClassic />
        </div>
    );
}

export default App;
