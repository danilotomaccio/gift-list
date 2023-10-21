import { atom } from "recoil";

const localStorageEffect = (key: string) => ({ setSelf, onSet }: { setSelf: (selfValue: string) => void, onSet: (fun: (newValue: string, _: any, isReset: boolean) => void) => void }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: string, _: any, isReset: boolean) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const currentPageState = atom({
    key: 'currentPage',
    default: '/',
    effects: [
        localStorageEffect('currentPage')
    ]
});