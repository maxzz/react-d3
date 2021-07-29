import create from 'zustand';

namespace BarsChart {
    type BarsChartStore = {
        nBars: number;
        sorted: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
    }

    export const useStore = create<BarsChartStore>((set, get) => ({
        nBars: 14,
        sorted: false,
        setNBars: (v: number) => set(state => ({nBars: v})),
        setSorted: (v: boolean) => set(state => ({sorted: v})),
    }));
}

export default BarsChart;
