import create from 'zustand';
import { devtools } from 'zustand/middleware';

namespace BarsChart {
    export type Store = {
        nBars: number;
        sorted: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
    };

    export const useStore = create<Store>(devtools((set, get) => ({
        nBars: 14,
        sorted: false,
        setNBars: (v: number) => set(state => ({ nBars: v })),
        setSorted: (v: boolean) => set(state => ({ sorted: v })),
    })));
}

BarsChart.useStore.subscribe((state, prevState) => {
    //console.log('store', state, prevState);
});

export default BarsChart;
