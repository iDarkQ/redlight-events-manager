import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EventDto } from "@redlight-events-manager/constants/event.dto";

const eventFormSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    date: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
        message: "A valid date is required",
    }),
    type: z.string().min(3, { message: "Sport type must be at least 3 characters" }),
    maxParticipants: z.coerce.number({ invalid_type_error: "Please enter a number" }).int().positive({ message: "Maximum participants must be a positive number" }),
    latitude: z.coerce.number({ invalid_type_error: "Please enter a valid latitude" }).min(-90).max(90),
    longitude: z.coerce.number({ invalid_type_error: "Please enter a valid longitude" }).min(-180).max(180),
    location: z.string(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

const mapEventDtoToFormData = (event?: Partial<EventDto>): Partial<EventFormData> => {
    if (!event) return {};
    return {
        title: event.title,
        date: event.date instanceof Date ? event.date.toISOString().slice(0, 16) : event.date, // for datetime-local
        type: event.type,
        maxParticipants: event.maxParticipants,
        latitude: event.latitude,
        longitude: event.longitude,
    };
}

export const useHeroEditForm = (
    defaultValues?: Partial<EventDto>,
    onFinish?: (data: EventDto) => Promise<void>
) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit: rhfHandleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<EventFormData>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: mapEventDtoToFormData(defaultValues),
    });

    const handleSubmit = rhfHandleSubmit(async (data) => {
        setSubmitting(true);

        const merged: EventDto = {
            ...(defaultValues as EventDto),
            ...data,
            date: new Date(data.date),
        };

        if (onFinish) {
            await onFinish(merged);
        }

        setSubmitting(false);
    });

    return { isSubmitting, register, handleSubmit, errors, onSubmit: handleSubmit, setValue, watch };
};