import { useEffect, useRef } from 'react';

type DebouncedSaveCallback = (value: string) => void;

export const useDetailsDebouncedSave = (value: string, callback: DebouncedSaveCallback, delay: number = 500) => {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [value, callback, delay]);
};