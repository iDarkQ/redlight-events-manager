import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Filter } from "~/providers/filter";
import { INPUT_DATETIME_FORMAT } from "~/utils/date";

const filterFormSchema = z.object({
    type: z.string(),
    dateFrom: z.string().refine(
        (val) => val === "" || (!isNaN(Date.parse(val))),
        { message: "A valid date is required" }
    ),
    dateTo: z.string().refine(
        (val) => val === "" || (!isNaN(Date.parse(val))),
        { message: "A valid date is required" }
    ),
    geomtry: z.number().array().array().array()
});

export type FilterFormData = z.infer<typeof filterFormSchema>;

const mapFilterToFormData = (filter?: Partial<Filter>): Partial<FilterFormData> => {
    if (!filter) return {};
    return {
        type: filter.type,
        dateFrom: dayjs(filter.dateFrom).format(INPUT_DATETIME_FORMAT), // ToISOString adds Z in the end /shrug
        dateTo: dayjs(filter.dateTo).format(INPUT_DATETIME_FORMAT), // ToISOString adds Z in the end /shrug
    };
}

export const useFilterForm = (
    defaultValues?: Partial<Filter>,
    onFinish?: (data: Filter) => Promise<void>
) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit: rhfHandleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<FilterFormData>({
        resolver: zodResolver(filterFormSchema),
        defaultValues: mapFilterToFormData(defaultValues),
    });

    const handleSubmit = rhfHandleSubmit(async (data) => {
        setSubmitting(true);

        const merged: Filter = {
            ...(defaultValues as Filter),
            ...data,
        };

        if (onFinish) {
            await onFinish(merged);
        }

        setSubmitting(false);
    });

    return { isSubmitting, register, handleSubmit, errors, reset, onSubmit: handleSubmit, setValue, watch };
};