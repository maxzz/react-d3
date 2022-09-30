import create from 'zustand';
import { Global } from '.';

export namespace BarsChart {
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
