import React, { useState } from "react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { UserFormData, useProfileForm, styles } from ".";
import { UpdateProfileDto } from "~/lib/api";
import { Upload } from "~/components/upload";
import { useUser } from "~/providers/user";
import { ErrorMessage } from "~/components/error-message";

interface FieldConfig {
  name: keyof UserFormData;
  label: string;
  placeholder: string;
  type: string;
  suggestions?: string[];
}

export interface ProfileFormProps {
  defaultValues?: UpdateProfileDto;
  onFinish?: (data: UpdateProfileDto) => Promise<void>;
  onLogout?: () => void;
}

export const ProfileForm = ({ defaultValues, onFinish, onLogout }: ProfileFormProps) => {
  const { isSubmitting, register, handleSubmit, errors, setValue, watch } = useProfileForm(
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
        {errors[name] && (
          <ErrorMessage>{(errors[name] as { message?: string })?.message}</ErrorMessage>
        )}
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

        <div className={styles.buttons}>
          <Button onClick={onLogout} className={styles.button} disabled={uploading} loading={isSubmitting} type="button" color="brightRed">
            Logout
          </Button>
          <Button className={styles.button} disabled={uploading} loading={isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
