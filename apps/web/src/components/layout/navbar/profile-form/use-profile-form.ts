import { useState } from "react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateProfileDto } from "~/lib/api";
import dayjs from "dayjs";
import { INPUT_DATE_FORMAT } from "~/utils/date";

const userFormSchema = z.object({
    birthday: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
        message: "A valid date is required",
    }),
    profile: z.string().nullable(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

const mapUserDtoToFormData = (user?: UpdateProfileDto): UserFormData | undefined => {
    if (!user) return;
    return {
        birthday: dayjs(user.birthday).format(INPUT_DATE_FORMAT), // ToISOString adds Z in the end /shrug
        profile: user.profile,
    };
}

export const useProfileForm = (
    defaultValues?: UpdateProfileDto,
    onFinish?: (data: UpdateProfileDto) => Promise<void>
) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit: rhfHandleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useHookForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: mapUserDtoToFormData(defaultValues),
    });

    const handleSubmit = rhfHandleSubmit(async (data) => {
        setSubmitting(true);

        const merged: UpdateProfileDto = {
            ...(defaultValues as UpdateProfileDto),
            ...data,
            birthday: dayjs(data.birthday).toISOString(),
        };

        if (onFinish) {
            await onFinish(merged);
        }

        setSubmitting(false);
    });

    return { isSubmitting, register, handleSubmit, errors, onSubmit: handleSubmit, setValue, watch };
};