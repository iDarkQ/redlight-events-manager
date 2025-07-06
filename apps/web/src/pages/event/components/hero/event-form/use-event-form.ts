import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EventDto } from "~/lib/api";
import { EventStatus } from "~/lib/api";
import dayjs from "dayjs";
import { INPUT_DATETIME_FORMAT } from "~/utils/date";

export const eventStatuses = Object.values(EventStatus) as [EventStatus, ...EventStatus[]];

const eventFormSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    date: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
        message: "A valid date is required",
    }),
    status: z.enum(eventStatuses),
    type: z.string().min(3, { message: "Sport type must be at least 3 characters" }),
    maxParticipants: z.coerce.number({ invalid_type_error: "Please enter a number" }).int().positive({ message: "Maximum participants must be a positive number" }),
    latitude: z.coerce.number({ invalid_type_error: "Please enter a valid latitude" }).min(-90).max(90),
    longitude: z.coerce.number({ invalid_type_error: "Please enter a valid longitude" }).min(-180).max(180),
    location: z.string(),
    banner: z.string().nullable(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

const mapEventDtoToFormData = (event?: Partial<EventDto>): Partial<EventFormData> => {
    if (!event) return {};
    return {
        title: event.title,
        status: event.status,
        date: dayjs(event.date).format(INPUT_DATETIME_FORMAT), // ToISOString adds Z in the end /shrug
        type: event.type,
        maxParticipants: event.maxParticipants,
        latitude: event.latitude,
        longitude: event.longitude,
        location: event.location,
        banner: event.banner,
    };
}

export const useEventForm = (
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
        reset,
    } = useForm<EventFormData>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: mapEventDtoToFormData(defaultValues),
    });

    const handleSubmit = rhfHandleSubmit(async (data) => {
        setSubmitting(true);

        const merged: EventDto = {
            ...(defaultValues as EventDto),
            ...data,
        };

        if (onFinish) {
            await onFinish(merged);
        }

        setSubmitting(false);
    });

    return { isSubmitting, register, handleSubmit, errors, reset, onSubmit: handleSubmit, setValue, watch };
};