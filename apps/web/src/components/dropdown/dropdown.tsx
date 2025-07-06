import { useState } from "react";
import { styles } from ".";
import clsx from "clsx";
import { GrClear } from "react-icons/gr";
import { IconButton } from "~/components/icon-button";
import { Tooltip } from "~/components/tooltip";

interface DropdownProps {
  className?: string;
  options: string[];
  defaultOption: string;
  value?: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({ className, options, defaultOption, onChange, value }: DropdownProps) => {
  const [localValue, setLocalValue] = useState(defaultOption);

  const currentValue = value ?? localValue;

  return (
    <div className={clsx(styles.dropdown, className && className)}>
      <span className={styles.input}>
        {currentValue === "" ? "Select option" : currentValue}
        <Tooltip title="Clear" className={styles.tooltip}>
          <IconButton
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.("");
            }}
          >
            <GrClear className={styles.icon} />
          </IconButton>
        </Tooltip>
      </span>
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
