import create from 'zustand';

namespace Global {
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

    export function getKey<T>(key: string, initialData: T): T {
        let data = persist[key];
        if (data !== null) {
            try {
                initialData = JSON.parse(data);
            } catch (error) {
            }
        }
        return initialData;
    }

    export function setKey(key: string, data: string) {
        persist[key] = data;
        storeAppKey();
    }

    // if (import.meta.env.MODE === 'development') { /* This code wont be in production!!! */ }
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

    export const useStore = create<Store>((set, get) => ({
        ...Global.getKey(KEY, initialState),
        setNBars: (v: number) => set({ nBars: v }),
        setSorted: (v: boolean) => set({ sorted: v }),
    }));

    useStore.subscribe((state) => {
        Global.setKey(KEY, JSON.stringify(state));
    });
}

export default BarsChart;
