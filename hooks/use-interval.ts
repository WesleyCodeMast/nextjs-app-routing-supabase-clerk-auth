import { useEffect, useRef } from "react";
export function useInterval(callback: Function, delay: number) {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () =>
        intervalRef.current !== null
          ? window.clearInterval(intervalRef.current)
          : void 0;
    }
  }, [delay]);
  return intervalRef;
}
