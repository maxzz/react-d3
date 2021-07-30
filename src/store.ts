import create from 'zustand';

namespace BarsChart {
    const KEY = 'BarsChart';

    export type Store = {
        nBars: number;
        sorted: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
    };

    let initialState = {
        nBars: 14,
        sorted: false,
    };
    loadFrom(localStorage.getItem(KEY));

    export const useStore = create<Store>((set, get) => ({
        ...initialState,
        setNBars: (v: number) => set({ nBars: v }),
        setSorted: (v: boolean) => set({ sorted: v }),
    }));

    function loadFrom(store: string | null) {
        try {
            let obj = JSON.parse(store || '');
            initialState = { ...obj };
        } catch (error) {
        }
    }

    export function storeTo(state: Store): string {
        return JSON.stringify(state);
    }

    useStore.subscribe((state, prevState) => {
        let data = BarsChart.storeTo(state);
        localStorage.setItem(KEY, data);
    });
}

// if (import.meta.env.MODE === 'development') { /* This code wont be in production!!! */ }

export default BarsChart;
