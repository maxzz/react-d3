import React from 'react';
import { CheckboxProps } from '../ui-props';

//https://tailwindcss.com/docs/hover-focus-and-other-states#checked

/*
//https://github.com/tailwindlabs/tailwindcss-forms
    //https://tailwindcss-forms.vercel.app/
    //https://github.com/tailwindlabs/tailwindcss-forms/blob/master/src/index.js#L176
[type=checkbox]:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
*/

function CheckboxTw(props: CheckboxProps) {
    return (
        <label className="flex items-center select-none cursor-pointer" title={props.title}>
            <input type="checkbox"
                className={`h-5 w-5 appearance-none rounded-md
                    text-green-600 border border-[#006f94]
                    bg-[#ffffff70] 
                    checked:bg-blue-600 checked:border-transparent 
                    checked:bg-ui-check
                    focus:outline-none`
                }
                checked={props.checked}
                onChange={(event) => props.onChange(event.target.checked)}
            />
            <span className="ml-1 text-sm text-gray-900">{props.label}</span>
        </label>
    );
}

export default CheckboxTw;
