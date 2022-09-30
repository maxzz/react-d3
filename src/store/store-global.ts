import PreviousMap from 'postcss/lib/previous-map';
import create from 'zustand';

export namespace Global {
    const APPKEY = 'red3';

    let persist: Record<string, string> = {};

    (function loadAppData() {
        try {
            const store = localStorage.getItem(APPKEY);
            let obj = JSON.parse(store || '');
            persist = { ...obj };
        } catch (error) {
        }
    })();

    function storeAppData() {
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
        storeAppData();
    }

    // if (import.meta.env.MODE === 'development') { /* This code wont be in production!!! */ }
}
