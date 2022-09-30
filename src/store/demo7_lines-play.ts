import create from 'zustand';
import { InputData } from '@/components/x-nun/Demo7_XOrgLinePlayground';
import { Global } from '.';

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
            active: importedPoints.length,
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
