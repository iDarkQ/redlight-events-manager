import { InputHTMLAttributes, useState, useRef, useEffect, ReactNode, forwardRef } from "react";
import { styles } from ".";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  rootClassName?: string;
  type?: string;
  placeholder?: string;
  suggestions?: string[];
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      rootClassName,
      type = "text",
      placeholder = "Search event",
      suggestions,
      suffix,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState(props.value?.toString() ?? "");
    const [focused, setFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filtered, setFiltered] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (suggestions && value && focused) {
        const filteredSuggestions = suggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase()),
        );
        setFiltered(filteredSuggestions);
        setShowDropdown(filteredSuggestions.length > 0);
      } else {
        setShowDropdown(false);
        setFiltered([]);
      }
    }, [value, suggestions, focused]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        setShowDropdown(false);
        setFocused(false);
      }, 100);

      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    const handleSuggestionClick = (suggestion: string) => {
      setValue(suggestion);
      setShowDropdown(false);
      onChange?.({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...({} as any),
        target: { value: suggestion },
      });

      (inputRef.current ?? (ref as React.RefObject<HTMLInputElement>)?.current)?.focus();
    };

    return (
      <div style={{ position: "relative", width: "100%" }} className={rootClassName && rootClassName}>
        <input
          ref={ref ?? inputRef}
          className={clsx(styles.input, className && className)}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setShowDropdown(filtered.length > 0);
            setFocused(true);
          }}
          onBlur={handleBlur}
          autoComplete="off"
          {...props}
        />
        {suffix && <div className={styles.suffix}>{suffix}</div>}
        {suggestions && showDropdown && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #eee",
              borderTop: "none",
              zIndex: 10,
              margin: 0,
              padding: 0,
              listStyle: "none",
              maxHeight: 180,
              overflowY: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {filtered.map((s, i) => (
              <li
                key={s + i}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  borderBottom: i === filtered.length - 1 ? "none" : "1px solid #f0f0f0",
                  background: "#fff",
                }}
                onMouseDown={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
