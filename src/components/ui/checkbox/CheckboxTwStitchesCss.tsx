import React from 'react';
import { css } from '@stitches/react';
import { CheckboxProps } from '../ui-props';

const twCheckboxTick = css({
    '&:checked': {
        'backgroundImage': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`,
        'borderColor': 'transparent',
        'backgroundColor': 'currentColor',
        'backgroundSize': '100% 100%',
        'backgroundPosition': '50%',
        'backgroundRepeat': 'no-repeat',
    }
});

function CheckboxTwStitchesCss(props: CheckboxProps) {
    return (
        <label className="flex items-center space-x-3">
            <input type="checkbox"
                className={`
                    ${twCheckboxTick()} form-tick appearance-none h-6 w-6 border rounded-md
                    border-gray-300 checked:bg-blue-600 checked:border-transparent
                    focus:outline-none`
                }
                checked={props.checked}
                onChange={(event) => props.onChange(event.target.checked)}
            />
            <span className="text-gray-900 font-medium">Sorted</span>
        </label>
    );
}

export default CheckboxTwStitchesCss;
