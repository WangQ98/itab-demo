import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

// 定义一个数组来存储数字对应的中文大写字符
const cnNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
// 定义一个数组来存储日期的中文大写字符
const cnDayNums = [
  "初零",
  "初一",
  "初二",
  "初三",
  "初四",
  "初五",
  "初六",
  "初七",
  "初八",
  "初九",
  "初十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十",
  "廿一",
  "廿二",
  "廿三",
  "廿四",
  "廿五",
  "廿六",
  "廿七",
  "廿八",
  "廿九",
  "三十",
];

export default dayjs;

/**
 * @description: 获取指定日期的格式
 * @param {Date} new Date()
 * @param {string} 'YYYY-MM-DD'
 * @return {string}
 */
export function getFormatDate(format: string, date: Date = new Date()): string {
  return dayjs(date).format(format);
}

/**
 * @description: 生成中文日期不包含年
 * @return {string} 三月初二 星期四
 */
export function getNowDateFormattedChineseDate(): string {
  const now = dayjs();
  const dayOfWeek = now.format("dddd");
  const month = cnNums[now.month() + 1];
  const date = cnDayNums[now.date()];
  const formattedDate = now.format(`${month}月${date}`).toUpperCase();
  return `${formattedDate} ${dayOfWeek}`;
}

/**
 * @description: 获取本月有多少天
 * @return {number} 31
 */
export function getCurrentMonthDays(): number {
  return dayjs().daysInMonth();
}

/**
 * @description: 获取本月不是周末的日期
 * @return {number[]} [1,2,3,....]
 */
export function getWeekdayDates(): number[] {
  const dates: number[] = [];
  const daysInMonth = dayjs().daysInMonth();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = dayjs().date(i);
    if (date.day() !== 0 && date.day() !== 6) {
      dates.push(i);
    }
  }
  return dates;
}

/**
 * @description: 获取本月第一天是星期几
 * @return {string} 周三
 */
export function getFirstDayOfWeek(): string {
  const weekdaysShort = dayjs.localeData().weekdaysShort(); // 获取星期几的简短描述数组
  return weekdaysShort[dayjs().startOf("month").day()];
}

/**
 * @description: 获取本月第一距离上周日几天
 * @return {number} 今天是周三到上周日 => 3天
 */
export function getDaysFromFirstDayToLastSunday(): number {
  const firstDay = dayjs().startOf("month"); // 当前月份第一天
  const lastSunday = dayjs().startOf("week").subtract(1, "day"); // 上个周日
  return firstDay.diff(lastSunday, "day"); // 计算相差天数并加一
}

/**
 * @description: 获取上个月的最后几天
 * @param {number} 3
 * @return {number} [28,27,26]
 */
export function getLastMonthLastDays(num: number): number[] {
  const lastMonth = dayjs().subtract(1, "month"); // 上个月时间
  const lastMonthDays = lastMonth.daysInMonth(); // 上个月总天数
  const lastDays = Array.from({ length: num }, (_, i) => lastMonthDays - i); // 生成上个月最后 num 天的日期数组
  return lastDays;
}
