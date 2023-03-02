import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
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

/**
 * @description: 生成中文日期不包含年
 * @return {string} 三月初二 星期四
 */
export function getNowDateFormattedChineseDate() {
  const now = dayjs();
  const dayOfWeek = now.format("dddd");
  const month = cnNums[now.month() + 1];
  const date = cnDayNums[now.date()];
  const formattedDate = now.format(`${month}月${date}`).toUpperCase();
  return `${formattedDate} ${dayOfWeek}`;
}
