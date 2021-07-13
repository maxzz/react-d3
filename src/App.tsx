import React from 'react';
import './App.scss';
import HierarchyClassic from './components/HierarchyClassic';
import StarD3Interpolated from './components/StarD3Interpolated';

function App() {
    return (
        <div className="h-screen bg-green-50">
            {/* <StarD3Interpolated /> */}
            <HierarchyClassic />
        </div>
    );
}

export default App;
