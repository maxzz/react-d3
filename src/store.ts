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
