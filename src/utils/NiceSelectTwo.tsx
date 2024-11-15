import React, { useState, useCallback, useRef, KeyboardEvent, MouseEvent } from "react";
import { useClickAway } from "react-use";

interface Option {
  categoryName: string;
} 

interface NiceSelectProps {
  options: Option[];
  defaultCurrent: number;
  placeholder?: string;
  className?: string;
  onChange: (item: Option, name: string) => void;
  name: string;
  setapiEndPoint:any
}

const NiceSelectTwo: React.FC<NiceSelectProps> = ({
  options,
  defaultCurrent,
  placeholder,
  className,
  onChange,
  name,
  setapiEndPoint
}) => { 
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Option>(options[defaultCurrent]);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent(item);
    onChange(item, name);
    onClose();
    setapiEndPoint(item?.categoryName)
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setOpen((prev) => !prev);
    }
  };

  const stopPropagation = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`nice-select ${className || ""} ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      ref={ref}
    >
      <span className="current mr-20 capitalize">{current?.categoryName || placeholder}</span>
      <ul className="list" role="menubar" onClick={stopPropagation} onKeyPress={stopPropagation}>
        {options?.map((item,index) => (
          <li
            key={index}
            data-value={index}
            className={`option capitalize ${item.categoryName == current?.categoryName ? "selected focus" : ""}`}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
              stopPropagation(e);
            }}
          >
            {item.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelectTwo;


