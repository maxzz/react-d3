import create from 'zustand';

const APPKEY = 'red3';
let persist: Record<string, string> = {};
loadAppKey();

function loadAppKey() {
    try {
        const store = localStorage.getItem(APPKEY);
        let obj = JSON.parse(store || '');
        persist = { ...obj };
    } catch (error) {
    }
}

function storeAppKey() {
    localStorage.setItem(APPKEY, JSON.stringify(persist));
}

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
    loadFrom(persist[KEY] || '');

    export const useStore = create<Store>((set, get) => ({
        ...initialState,
        setNBars: (v: number) => set({ nBars: v }),
        setSorted: (v: boolean) => set({ sorted: v }),
    }));

    function loadFrom(store: string) {
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
        persist[KEY] = data;
        storeAppKey();
    });
}

// if (import.meta.env.MODE === 'development') { /* This code wont be in production!!! */ }

export default BarsChart;
