import { useState } from "react";
import { styles } from ".";
import clsx from "clsx";

interface DropdownProps {
  className?: string;
  options: string[];
  defaultOption: string;
  value?: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({ className, options, defaultOption, onChange, value }: DropdownProps) => {
  const [localValue, setLocalValue] = useState(defaultOption);

  return (
    <div className={clsx(styles.dropdown, className && className)}>
      <span className={styles.input}>{value ?? localValue}</span>
      <ul className={styles.options}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              setLocalValue(option);
              onChange(option);
            }}
            className={styles.option}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
