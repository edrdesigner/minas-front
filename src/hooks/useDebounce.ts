import { useState, useEffect } from 'react';

/**
 * Method to dalay a function
 * @param {Any} value
 * @param {Number} delay
 */
export default function useDebounce(value: any, delay: number): any {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
