import { useEffect, useState, useCallback, useRef } from "react";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdCheckbox,
  IoMdCheckboxOutline,
} from "react-icons/io";

import styles from "./DropdownSelect.module.css";

type CommonProps = {
  defaultTitle: string;
  options: string[];
  multiple?: boolean;
};

type MultipleProps =
  | {
      multiple?: false;
      selectedOption?: string;
      setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
      selectedOptions?: never;
      setSelectedOptions?: never;
    }
  | {
      multiple?: true;
      selectedOption?: never;
      setSelectedOption?: never;
      selectedOptions?: string[];
      setSelectedOptions?: React.Dispatch<React.SetStateAction<string[]>>;
    };

type DropdownProps = CommonProps & MultipleProps;

const DropdownSelect = ({
  defaultTitle = "Title",
  multiple = false,
  selectedOption = "",
  setSelectedOption,
  selectedOptions = [],
  setSelectedOptions,
  options,
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: { target: any }) => {
      if (
        (overlayRef.current && overlayRef.current.contains(e.target)) ||
        (listRef.current && listRef.current.contains(e.target))
      ) {
        return;
      }
      setOpen(false);
    },
    [setOpen]
  );

  const handleEscKey = useCallback(
    (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscKey, false);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscKey, false);
    };
  }, [handleClick, handleEscKey]);

  // single select option
  const selectOption = (option: string) => {
    if (setSelectedOption) {
      setSelectedOption(option);
      setOpen(false);
    }
  };

  // multiple select option
  const addOrRemoveOption = (option: string) => {
    if (setSelectedOptions) {
      if (selectedOptions.includes(option)) {
        let index = selectedOptions.indexOf(option);
        let temp = [...selectedOptions];
        if (index !== -1) {
          temp.splice(index, 1);
        }
        setSelectedOptions(temp);
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const notSelected =
    (multiple && selectedOptions.length) ||
    (!multiple && selectedOption.length);

  return (
    <div className={styles.container}>
      <button className={styles.selectorButton} onClick={() => setOpen(!open)}>
        <span className={styles.label}>{defaultTitle}</span>
        <span id={notSelected ? "" : styles.placeholder}>
          {multiple
            ? selectedOptions.length
              ? selectedOptions.map(
                  (option, i) =>
                    `${option}${i === selectedOptions.length - 1 ? "" : ","}`
                )
              : "Select..."
            : selectedOption
            ? selectedOption
            : "Select..."}
        </span>
        {open ? (
          <IoMdArrowDropup size={16} color="#000000" />
        ) : (
          <IoMdArrowDropdown size={16} color="#000000" />
        )}
      </button>
      {open ? (
        multiple ? (
          <div className={styles.optionsContainer} ref={listRef}>
            <ul>
              {options.map((option) => (
                <li
                  onClick={() => addOrRemoveOption(option)}
                  className={
                    option === selectedOption
                      ? styles.activeItem
                      : styles.defaultItem
                  }
                >
                  <span>
                    {selectedOptions.includes(option) ? (
                      <IoMdCheckbox size={16} color="#007fff" />
                    ) : (
                      <IoMdCheckboxOutline size={16} color="#007fff" />
                    )}
                    {option}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.optionsContainer} ref={listRef}>
            <ul>
              {options.map((option) => (
                <li
                  onClick={() => selectOption(option)}
                  className={
                    option === selectedOption
                      ? styles.activeItem
                      : styles.defaultItem
                  }
                >
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : null}
    </div>
  );
};

export default DropdownSelect;
