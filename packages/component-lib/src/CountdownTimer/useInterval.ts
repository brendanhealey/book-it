import { useEffect, useRef } from 'react';

/*
 ** This custom hook is lifted straight from Dan Abramov's blog on
 ** https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 ** and typescript'ised.
 */

export type IUseIntervalCallback = () => void;

export const useInterval = (callback: IUseIntervalCallback, delay: number | null) => {
  const savedCallback = useRef<IUseIntervalCallback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const timerId = setInterval(tick, delay);
      return () => clearInterval(timerId); // this is like componentWillUnmount
    }
  }, [delay]);
};
