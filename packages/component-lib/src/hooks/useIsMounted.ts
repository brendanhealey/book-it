import { useCallback, useEffect, useRef } from "react";

/*
 ** Useage:
 **
 ** const isMounted = useIsMounted()
 ** if(isMounted()) { ... }
 */

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};
