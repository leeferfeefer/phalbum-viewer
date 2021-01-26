import React, {useEffect, useRef} from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

//   Note: this was grabbed from https://codesandbox.io/s/l240mp2pm7?file=/src/index.js:742-1161