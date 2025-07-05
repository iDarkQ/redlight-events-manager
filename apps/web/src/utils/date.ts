import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export const DATE_FORMAT = "DD/MM/YYYY HH:mm"
export const INPUT_DATE_FORMAT = "YYYY-MM-DD"
export const INPUT_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm"
export const GOOGLE_CALENDAR_FORMAT = "YYYYMMDDTHHmmss"
export const EVENT_CARD_DATE_FORMAT = "dddd Do MMMM | hh:mm a";