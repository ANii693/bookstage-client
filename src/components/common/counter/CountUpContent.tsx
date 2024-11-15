"use client"

import { useState } from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";

interface CountUpContentProps {
  number: number;
  text?: string;
  add_style?: boolean;
}

const CountUpContent: React.FC<CountUpContentProps> = ({
  number,
  text,
  add_style = true,
}) => {
  const [focus, setFocus] = useState(false);

  const visibleChangeHandler = (isVisible: boolean) => {
    if (isVisible && !focus) {
      setFocus(true);
    }
  };

  return (
    <CountUp start={focus ? 0 : number} end={number} duration={5}>
      {({ countUpRef }) => (
        <div
          className={`bd-promotion-counter-number ${
            add_style ? "align-items-center justify-content-center" : ""
          }`}
        >
          <span className="counter mb-0" ref={countUpRef} />
          <InView as="span" onChange={visibleChangeHandler}>
            {text && <span className="counter-text">{text}</span>}
          </InView>
        </div>
      )}
    </CountUp>
  );
};

export default CountUpContent;
