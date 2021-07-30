import create from 'zustand';

namespace BarsChart {
    export type Store = {
        nBars: number;
        sorted: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
    };

    export const useStore = create<Store>((set, get) => ({
        nBars: 14,
        sorted: false,
        setNBars: (v: number) => set({ nBars: v }),
        setSorted: (v: boolean) => set({ sorted: v }),
    }));
}

BarsChart.useStore.subscribe((state, prevState) => {
    //console.log('store', state, prevState);
});

export default BarsChart;

// console.log('import.meta.env.MODE', import.meta);
// console.log('import.meta.env.MODE', import.meta.env);
// console.log('import.meta.env.MODE', import.meta.env.BASE_URL);
// console.log('import. meta. env.MODE', import.meta.env.MODE);

console.log('a5a1');
if (import.meta.env.MODE === 'development') {
    console.log('a5a2'); // This code wont be in production!!!
}
console.log('a5a3');