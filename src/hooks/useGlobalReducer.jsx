import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"

const StoreContext = createContext()

const STORAGE_KEY = "starwars_store";

const loadFromLocalStorage = () => {
    try {
        const savedStore = localStorage.getItem(STORAGE_KEY);
        if (savedStore) {
            return JSON.parse(savedStore);
        }
    } catch (error) {
        console.error("Error loading from localStorage:", error);
    }
    return initialStore();
};

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, null, loadFromLocalStorage);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [store]);

    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}