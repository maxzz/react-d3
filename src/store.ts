import create from 'zustand';

namespace BarsChart {
    export type Store = {
        nBars: number;
        sorted: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
    }

    export const useStore = create<Store>((set, get) => ({
        nBars: 14,
        sorted: false,
        setNBars: (v: number) => set(state => ({nBars: v})),
        setSorted: (v: boolean) => set(state => ({sorted: v})),
    }));
}

export default BarsChart;
