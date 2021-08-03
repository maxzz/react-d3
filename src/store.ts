import PreviousMap from 'postcss/lib/previous-map';
import create from 'zustand';
import { InputData } from './components/x-nun/XOrgLinePlayground';

namespace Global {
    const APPKEY = 'red3';
    let persist: Record<string, string> = {};

    (function loadAppKey() {
        try {
            const store = localStorage.getItem(APPKEY);
            let obj = JSON.parse(store || '');
            persist = { ...obj };
        } catch (error) {
        }
    })();

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
        randomN: boolean;
        setNBars: (v: number) => void;
        setSorted: (v: boolean) => void;
        setRandomN: (v: boolean) => void;
    };

    let initialState = {
        nBars: 14,
        sorted: false,
        randomN: true,
    };

    export const useStore = create<Store>((set, get) => ({
        ...Global.getKey(KEY, initialState),
        setNBars: (v: number) => set({ nBars: v }),
        setSorted: (v: boolean) => set({ sorted: v }),
        setRandomN: (v: boolean) => set({ randomN: v }),
    }));

    useStore.subscribe((state) => {
        Global.setKey(KEY, JSON.stringify(state));
    });
}

export namespace LinesPlay {
    const KEY = 'LinesPlay';

    export type Store = {
        inputData: InputData;
        setPoints: (v: [number, number][]) => void;
        setActivePoint: (v: number) => void;
    };

    const importedPoints: [number, number][] = [[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]];

    let initialState = {
        inputData: {
            points: importedPoints,
            active: importedPoints.length
        }
    };

    export const useStore = create<Store>((set, get) => ({
        ...Global.getKey(KEY, initialState),
        // setActivePoint: (v: number) => set(prev => ({...prev, ...{ inputData: { active: v } }})),
        setPoints: (v: [number, number][]) => {
            const store = get();
            store.inputData.points = v;
            set(store);
        },
        //setInputData: (v: InputData) => set({ inputData: { ...v } }),
        setActivePoint: (v: number) => {
            const store = get();
            store.inputData.active = v;
            set(store);
        },
    }));

    useStore.subscribe((state) => {
        Global.setKey(KEY, JSON.stringify(state));
    });
}

export default BarsChart;
