"use client";
import React, { useEffect, useState } from "react";
const TimerWrapper = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(23);
  const [mins, setMins] = useState(59);
  const [secs, setSecs] = useState(60);
  const [timesUp, setTimesUp] = useState(0);

  useEffect(() => {
    // set the time out actions
    setTimeout(() => {
      if (days >= 0) {
        setSecs(secs - 1);

        if (hours === 0) {
          setDays(days - 1);
        }
        if (mins === 0) {
          setHours(hours - 1);

          setMins(59);
        }
        if (secs === 0) {
          setMins(mins - 1);

          setSecs(59);
        }
      } else if (days < 0) {
        setTimesUp(1);
      }
    }, 1000);
  }, [days, hours, mins, secs]);

  return (
    <>
      {!timesUp ? (
        <>
          <div className="count_down">
            {days}
            <span>days</span>
          </div>
          :
          <div className="count_down">
            {" "}
            {hours} <span>hours</span>
          </div>
          :
          <div className="count_down">
            {" "}
            {mins} <span>minutes</span>
          </div>
          :
          <div className="count_down">
            {" "}
            {secs} <span>seconds</span>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default TimerWrapper;
