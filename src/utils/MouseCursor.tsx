"use client"
import React, { useState, useEffect } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const MouseCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isBigCursor, setBigCursor] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    setBigCursor(true);
  };

  const handleMouseLeave = () => {
    setBigCursor(false);
  };


  return (
    <>
      {cursorPosition && (
        <div className={`mouseCursor cursor-outer ${isBigCursor ? "cursor-big" : ""}`} style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`, visibility: "visible" }}>
          <div className={`mouseCursor cursor-inner ${isBigCursor ? "cursor-big" : ""}`} style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}><span>Drag</span></div>
        </div>
      )}
    </>
  );
};

export default MouseCursor;
