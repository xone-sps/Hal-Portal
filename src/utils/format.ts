import dayjs, { Dayjs } from "dayjs";

export function formatDate(date: Dayjs | string | Date | null | undefined, format = "YYYY-MM-DD") {
  if (!date) return "";
  return dayjs(date).format(format);
}
