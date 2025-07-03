import React, { useState } from "react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { UserFormData, useForm, styles } from ".";
import { UpdateProfileDto } from "~/lib/api";
import { Upload } from "~/components/upload";
import { useUser } from "~/providers/user";

interface FieldConfig {
  name: keyof UserFormData;
  label: string;
  placeholder: string;
  type: string;
  suggestions?: string[];
}

export interface FormProps {
  defaultValues?: UpdateProfileDto;
  onFinish?: (data: UpdateProfileDto) => Promise<void>;
}

export const Form = ({ defaultValues, onFinish }: FormProps) => {
  console.log({ defaultValues });

  const { isSubmitting, register, handleSubmit, errors, setValue, watch } = useForm(
    defaultValues,
    onFinish,
  );

  const [uploading, setUploading] = useState(false);

  const { setUser, uploadProfilePicture } = useUser();

  const userFields: FieldConfig[] = [
    {
      name: "birthday",
      label: "Birthday",
      placeholder: "",
      type: "date",
    },
  ];

  const profile = watch("profile");

  const renderField = ({ name, label, placeholder, type, suggestions }: FieldConfig) => {
    const fieldValue = watch(name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputProps: any = {
      id: name,
      placeholder,
      type,
      step: type === "number" ? "any" : undefined,
      suggestions,
      value: fieldValue,
      ...register(name),
    };

    return (
      <div key={name}>
        <label htmlFor={name}>{label}</label>
        <Input {...inputProps} />
        {errors[name] && <span>{(errors[name] as { message?: string })?.message}</span>}
      </div>
    );
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {userFields.map(renderField)}

        <div>
          <label>Profile Picture</label>

          <Upload
            value={profile ?? undefined}
            placeholder="No profile picture uploaded"
            onChange={async (file) => {
              if (!file) {
                setValue("profile", null);
                setUser((prev) => (prev ? { ...prev, profile: null } : prev));
                return;
              }

              setUploading(true);
              const fileName = await uploadProfilePicture(file);
              setUploading(false);
              if (!fileName) return;
              setUser((prev) => (prev ? { ...prev, profile: fileName } : prev));

              setValue("profile", fileName);
            }}
          />
        </div>

        <Button disabled={uploading} loading={isSubmitting} type="submit">
          Finish
        </Button>
      </form>
    </>
  );
};
