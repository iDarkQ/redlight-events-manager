import React, { useCallback, useRef } from "react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Dropdown } from "~/components/dropdown";
import { useEvent } from "~/providers/event";
import { styles, FilterFormData, useFilterForm, FilterFormMap, FilterFormMapRef } from ".";
import { defaultFilter, Filter } from "~/providers/filter";
import { ErrorMessage } from "~/components/error-message";

interface FieldConfig {
  name: keyof FilterFormData;
  label: string;
  placeholder: string;
  type: string;
  field: "input" | "dropdown";
  suggestions?: string[];
  options?: string[];
}

export interface HeroEditFormProps {
  defaultValues?: Partial<Filter>;
  onFinish?: (data: Filter) => Promise<void>;
  onReset?: () => Promise<void>;
}

export const FilterForm = ({ defaultValues, onFinish, onReset }: HeroEditFormProps) => {
  const { isSubmitting, register, reset, handleSubmit, errors, setValue, watch } = useFilterForm(
    defaultValues,
    onFinish,
  );

  const mapRef = useRef<FilterFormMapRef>(null);

  const { events } = useEvent();
  const typeSuggestions = Array.from(new Set(events.map((e) => e.type).filter(Boolean)));

  const filterFields: FieldConfig[] = [
    {
      name: "type",
      label: "Type of Sport",
      placeholder: "e.g., Football",
      type: "text",
      options: typeSuggestions,
      field: "dropdown",
    },
    {
      name: "dateFrom",
      label: "Date and Time (From)",
      placeholder: "",
      type: "datetime-local",
      field: "input",
    },
    {
      name: "dateTo",
      label: "Date and Time (To)",
      placeholder: "",
      type: "datetime-local",
      field: "input",
    },
  ];

  const renderField = ({
    name,
    label,
    placeholder,
    type,
    suggestions,
    options,
    field,
  }: FieldConfig) => {
    const fieldValue = watch(name);

    if (field === "dropdown") {
      const fieldValueString = String(fieldValue);

      return (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <Dropdown
            options={options!}
            value={fieldValueString}
            onChange={(value: string) => setValue(name, value, { shouldValidate: true })}
            defaultOption={fieldValueString}
          />
          {errors[name] && (
            <ErrorMessage>{(errors[name] as { message?: string })?.message}</ErrorMessage>
          )}
        </div>
      );
    }

    if (field === "input") {
      const fieldValueString = String(fieldValue);

      return (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <Input
            id={name}
            placeholder={placeholder}
            type={type}
            step={type === "number" ? "any" : undefined}
            suggestions={suggestions}
            {...register(name)}
            value={fieldValueString}
          />
          {errors[name] && (
            <ErrorMessage>{(errors[name] as { message?: string })?.message}</ErrorMessage>
          )}
        </div>
      );
    }
  };

  const updateArea = useCallback(
    (values: number[][][]) => {
      setValue("geomtry", values);
    },
    [setValue],
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {filterFields.map(renderField)}

        <div>
          <span>Area Of Search</span>
          <FilterFormMap ref={mapRef} updateArea={updateArea} />
        </div>

        <div className={styles.actions}>
          <Button
            onClick={() => {
              reset(defaultFilter);
              mapRef.current?.clearDraw();
              onReset?.();
            }}
            className={styles.action}
            color="brightRed"
          >
            Reset Filters
          </Button>
          <Button className={styles.action} loading={isSubmitting} type="submit">
            Save Filters
          </Button>
        </div>
      </form>
    </>
  );
};
