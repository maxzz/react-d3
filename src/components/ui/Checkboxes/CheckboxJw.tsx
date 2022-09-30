import React from 'react';

//https://www.joshwcomeau.com/react/demystifying-styled-components

export function CheckboxJw() {
    const [checked, setChecked] = React.useState(true);
    return (
        <div className="flex">
            <div className="relative" > {/* onClick={() => setChecked((prev) => !prev)} */}
                {/* Real checkbox */}
                <input className="absolute inset-0 w-full h-full opacity-0 z-20" type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
                {/* Visible content */}
                <div className="flex items-center z-10">
                    {/* Checkbox visible box */}
                    <div className={`w-[18px] h-[18px] relative border rounded border-gray-700 bg-[#ffffffb0] ${checked ? "scale-[.9]" : "scale-100"}`}
                        style={{transition: 'transform .2s cubic-bezier(.25,1.01,.25,1.01)'}}
                    >
                        {/* Filler */}
                        <div className={`absolute ${checked ? "scale-100" : "scale-0"} inset-[3px] rounded-[2px] bg-gray-800 opacity-50`}
                            style={{transition: 'transform .2s cubic-bezier(.25,1.01,.25,1.01)'}}
                        >
                        </div>
                    </div>
                    <div className="ml-2 text-sm">Reorder</div>
                </div>
            </div>
        </div>
    );
}
