import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] =
    useState <
    T >
    (() => {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default useLocalStorage;
