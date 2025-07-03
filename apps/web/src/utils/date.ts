import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export const DATE_FORMAT = "DD/MM/YYYY HH:mm"
export const eventCardDateFormat = (date: string) => {
    return dayjs(date).format("dddd Do MMMM | hh:mm a")
} 