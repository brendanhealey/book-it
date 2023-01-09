import { useIsMounted } from '.';
import { useState, useEffect } from 'react';

/**
 * I've enhanced this decent implementation of a useFetch-hook-with-AbortController and
 * enhanced it to not try to update state if the component is ummounted.
 *
 * Avoiding Race Conditions and Memory Leaks in React useEffect
 * https://javascript.plainenglish.io/avoiding-race-conditions-and-memory-leaks-in-react-useeffect-2034b8a0a3c7
 */

interface IUseFetchResponse {
  fetchedData: unknown;
  isLoading: boolean;
  error: Error | null;
}

export const useFetch = (endpoint: string, options?: ResponseInit): IUseFetchResponse => {
  const isComponentMounted = useIsMounted();
  const [fetchedData, setFetchedData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          ...options,
          signal: abortController.signal,
        });
        const newData = await response.json();
        if (isComponentMounted()) {
          setIsLoading(false);
          setFetchedData(newData);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          if (isComponentMounted()) {
            setError(error);
            setIsLoading(false);
          }
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { fetchedData, isLoading, error };
};
