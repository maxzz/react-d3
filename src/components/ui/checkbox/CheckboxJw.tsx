import React from 'react';

//https://www.joshwcomeau.com/react/demystifying-styled-components

function CheckboxJw() {
    const [checked, setChecked] = React.useState(true);
    return (
        <div className="flex">
            <div className="relative" onClick={() => setChecked((prev) => !prev)}>
                {/* Real checkbox */}
                <input className="absolute inset-0 w-full h-full opacity-0 z-20" type="checkbox" />
                {/* Visible content */}
                <div className="flex items-center z-10">
                    {/* Checkbox visible box */}
                    <div className={`w-[18px] h-[18px] relative border-2 rounded border-gray-700 ${checked ? "scale-75" : "scale-100"}`}>
                        {/* Filler */}
                        <div className={`absolute ${checked ? "scale-100" : "scale-0"} inset-[2px] rounded-[2px] bg-purple-800`}></div>
                    </div>
                    <span>Reorder</span>
                </div>
            </div>
        </div>
    );
}

export default CheckboxJw;
