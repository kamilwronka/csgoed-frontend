import { useEffect, useState } from "react";

const useDimensions = ({ debounce }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const setValues = (e) => {
      setDimensions({
        width: e.target.innerWidth,
        height: e.target.innerHeight,
      });
    };

    window.addEventListener("resize", setValues);

    return () => {
      window.removeEventListener("resize", setValues);
    };
  }, []);

  return dimensions;
};

export default useDimensions;
