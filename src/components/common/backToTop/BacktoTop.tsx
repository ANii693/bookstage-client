
import useScrollDirection from "@/hooks/sticky-header";
import CircleIcon from "@/svg/Circle";
import React, { useRef, useEffect } from "react";
const BacktoTop = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection(elementRef.current);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div
        ref={elementRef}
        className={`progress-wrap ${
          scrollDirection === "down" ? "active-progress" : ""
        }`}
      >
        <CircleIcon />
      </div>
    </>
  );
};

export default BacktoTop;
