import React from "react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { EventFormData, useHeroEditForm, styles } from "..";
import { EventDto } from "@redlight-events-manager/constants/event.dto";
import { MapLocationPicker } from "../map";
import mbx from "@mapbox/mapbox-sdk";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

interface FieldConfig {
  name: keyof EventFormData;
  label: string;
  placeholder: string;
  type: string;
  renderAs?: "input" | "textarea";
}

const eventFields: FieldConfig[] = [
  {
    name: "title",
    label: "Event Title",
    placeholder: "e.g., Morning Football Match",
    type: "text",
    renderAs: "input",
  },
  {
    name: "date",
    label: "Date and Time",
    placeholder: "",
    type: "datetime-local",
    renderAs: "input",
  },
  {
    name: "type",
    label: "Type of Sport",
    placeholder: "e.g., Football",
    type: "text",
    renderAs: "input",
  },
  {
    name: "maxParticipants",
    label: "Max Participants",
    placeholder: "e.g., 22",
    type: "number",
    renderAs: "input",
  },
  {
    name: "location",
    label: "Location Name",
    placeholder: "e.g., Alma Coimbra Entrace A",
    type: "string",
    renderAs: "input",
  },
];

export interface HeroEditFormProps {
  defaultValues?: Partial<EventDto>;
  onFinish?: (data: EventDto) => Promise<void>;
}

export const HeroEditForm = ({ defaultValues, onFinish }: HeroEditFormProps) => {
  const { isSubmitting, register, handleSubmit, errors, setValue, watch } = useHeroEditForm(
    defaultValues,
    onFinish,
  );

  // Watch current lat/lng for default value in picker
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const renderField = ({ name, label, placeholder, type }: FieldConfig) => {
    const Component = Input;
    return (
      <div key={name}>
        <label htmlFor={name}>{label}</label>
        <Component
          id={name}
          placeholder={placeholder}
          type={type}
          step={type === "number" ? "any" : undefined}
          {...register(name)}
        />
        {errors[name] && <span>{(errors[name] as { message?: string })?.message}</span>}
      </div>
    );
  };

  const fetchLocationName = async (longitude: number, latitude: number): Promise<string> => {
    const mapboxClient = mbx({ accessToken: import.meta.env.VITE_MAPBOX_SECRET });
    const geocodingClient = mbxGeocoding(mapboxClient);
    const geoCode = await geocodingClient
      .reverseGeocode({
        query: [longitude, latitude],
      })
      .send();

      console.log({feature: geoCode.body.features[0]})
    return geoCode.body.features[0].place_name;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {eventFields.map(renderField)}

        <div>
          <label>Location</label>
          <MapLocationPicker
            initialCenter={
              latitude !== undefined && longitude !== undefined
                ? [longitude, latitude]
                : defaultValues?.latitude && defaultValues?.longitude
                  ? [defaultValues.longitude, defaultValues.latitude]
                  : [0, 0] // fallback to world center
            }
            initialZoom={latitude && longitude ? 14 : 2}
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
