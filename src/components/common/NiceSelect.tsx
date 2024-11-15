import React, { useState, useCallback, useRef, KeyboardEvent, MouseEvent } from "react";
import { useClickAway } from "react-use";

interface Option {
  id: number;
  text: string;
  api: string;
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

const NiceSelect: React.FC<NiceSelectProps> = ({
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
    setapiEndPoint(item?.api)
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
      <span className="current mr-20">{current?.text || placeholder}</span>
      <ul className="list" role="menubar" onClick={stopPropagation} onKeyPress={stopPropagation}>
        {options?.map((item) => (
          <li
            key={item.id}
            data-value={item.id}
            className={`option ${item.id === current?.id ? "selected focus" : ""}`}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
              stopPropagation(e);
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;


