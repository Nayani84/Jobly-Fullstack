import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
    const [storedvalue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.error("Error accessing localstorage", err);
            return initialValue;
        }
    });

    useEffect(() => {
        console.log("Stored value in localStorage:", storedvalue);
        try {
            if (storedvalue === null) {
                window.localStorage.removeItem(key);
            } else {
                window.localStorage.setItem(key, JSON.stringify(storedvalue));
            }
        } catch (err) {
            console.error("Error setting localstorage", err);
        }
    }, [key, storedvalue]);
    return [storedvalue, setStoredValue];
}

export default useLocalStorage;