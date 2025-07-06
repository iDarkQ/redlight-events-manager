import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import z from "zod";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export const DATE_FORMAT = "DD/MM/YYYY HH:mm"
export const INPUT_DATE_FORMAT = "YYYY-MM-DD"
export const INPUT_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm"
export const GOOGLE_CALENDAR_FORMAT = "YYYYMMDDTHHmmss"
export const EVENT_CARD_DATE_FORMAT = "dddd Do MMMM | hh:mm a";

export const pastDateSchema = z.string()
    .refine(
        (dateString) => {
            const date = dayjs(dateString);
            const today = dayjs().startOf('day');
            return date.isValid() && date.isBefore(today);
        },
        { message: "Date must be a valid date in the past" }
    );

export const futureDateSchema = z.string()
    .refine(
        (dateString) => {
            const date = dayjs(dateString);
            const today = dayjs().startOf('day');
            return date.isValid() && date.isAfter(today);
        },
        { message: "Date must be a valid date in the future" }
    );