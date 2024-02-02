import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [watched, setWatched] = useState(() => {
    const json = localStorage.getItem(key);
    const watched = JSON.parse(json) || initialState;

    return watched;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [key, watched]);

  return [watched, setWatched];
}
