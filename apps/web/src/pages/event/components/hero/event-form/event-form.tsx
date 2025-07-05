import React from "react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { EventFormData, useEventForm, eventStatuses } from ".";
import { MapLocationPicker } from "../map";
import mbx from "@mapbox/mapbox-sdk";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { useEvent } from "~/providers/event";
import { EventDto } from "~/lib/api";
import { Dropdown } from "~/components/dropdown";
import { Upload } from "~/components/upload";
import { styles } from ".";

interface FieldConfig {
  name: keyof EventFormData;
  label: string;
  placeholder: string;
  type: string;
  field: "input" | "dropdown";
  suggestions?: string[];
  options?: string[];
}

export interface EventFormProps {
  defaultValues?: Partial<EventDto>;
  onFinish?: (data: EventDto) => Promise<void>;
}

export const EventForm = ({ defaultValues, onFinish }: EventFormProps) => {
  const { isSubmitting, register, handleSubmit, errors, setValue, watch } = useEventForm(
    defaultValues,
    onFinish,
  );

  const { events, uploadBanner, setSelectedEvent } = useEvent();
  const typeSuggestions = Array.from(new Set(events.map((e) => e.type).filter(Boolean)));

  const eventFields: FieldConfig[] = [
    {
      name: "title",
      label: "Event Title",
      placeholder: "e.g., Morning Football Match",
      type: "text",
      field: "input",
    },
    {
      name: "status",
      label: "Event Status",
      placeholder: "e.g., PLANNED",
      type: "text",
      field: "dropdown",
      options: eventStatuses,
    },
    {
      name: "date",
      label: "Date and Time",
      placeholder: "",
      type: "datetime-local",
      field: "input",
    },
    {
      name: "type",
      label: "Type of Sport",
      placeholder: "e.g., Football",
      type: "text",
      suggestions: typeSuggestions,
      field: "input",
    },
    {
      name: "maxParticipants",
      label: "Max Participants",
      placeholder: "e.g., 22",
      type: "number",
      field: "input",
    },
    {
      name: "location",
      label: "Location Name",
      placeholder: "e.g., Alma Coimbra Entrace A",
      type: "string",
      field: "input",
    },
  ];

  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const banner = watch("banner");

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
          {errors[name] && <span>{(errors[name] as { message?: string })?.message}</span>}
        </div>
      );
    }

    if (field === "input") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inputProps: any = {
        id: name,
        placeholder,
        type,
        step: type === "number" ? "any" : undefined,
        suggestions,
        ...register(name),
      };
      if (type !== "file") {
        inputProps.value = fieldValue ?? "";
      }
      return (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <Input
            {...inputProps}
            onChange={(e) => {
              setValue(name, e.target.value);
            }}
          />
          {errors[name] && <span>{(errors[name] as { message?: string })?.message}</span>}
        </div>
      );
    }
  };

  const fetchLocationName = async (longitude: number, latitude: number): Promise<string> => {
    const mapboxClient = mbx({ accessToken: import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN });
    const geocodingClient = mbxGeocoding(mapboxClient);
    const geoCode = await geocodingClient
      .reverseGeocode({
        query: [longitude, latitude],
      })
      .send();

    return geoCode.body.features[0].place_name;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {eventFields.map(renderField)}

        <div>
          <label>Banner Picture</label>

          <Upload
            value={banner ?? undefined}
            placeholder="No banner uploaded"
            onChange={async (file) => {
              if (!file) {
                setValue("banner", null);
                setSelectedEvent((prev) => (prev ? { ...prev, banner: null } : prev));
                return;
              }

              const fileName = await uploadBanner(file);
              if (!fileName) return;
              setValue("banner", fileName);
            }}
          />
        </div>

        <div>
          <label>Location</label>
          <MapLocationPicker
            initialCenter={
              latitude !== 0 && longitude !== 0
                ? [longitude, latitude]
                : defaultValues?.latitude &&
                    defaultValues?.latitude !== 0 &&
                    defaultValues?.longitude &&
                    defaultValues?.longitude !== 0
                  ? [defaultValues.longitude, defaultValues.latitude]
                  : undefined
            }
            initialZoom={17}
            onLocationSelect={async ({ lng, lat }) => {
              setValue("location", await fetchLocationName(lng, lat));
              setValue("latitude", lat, { shouldValidate: true });
              setValue("longitude", lng, { shouldValidate: true });
            }}
          />
          {(errors.latitude || errors.longitude) && (
            <span>{errors.latitude?.message || errors.longitude?.message}</span>
          )}
        </div>

        <Button loading={isSubmitting} type="submit">
          Finish
        </Button>
      </form>
    </>
  );
};
