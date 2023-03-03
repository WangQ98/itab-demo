import dayjs from "dayjs";
import { getNowDateFormattedChineseDate } from "@/utils/date";
export default function useDate() {
  const yearMonth = dayjs().format("YYYY年MM月");
  const currentDay = dayjs().format("DD");

  const currentDateString = getNowDateFormattedChineseDate();

  return {
    yearMonth,
    currentDay,
    currentDateString,
  };
}
