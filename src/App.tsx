import React, { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button className="bg-red-100">done</button>
        </div>
    );
}

export default App;
