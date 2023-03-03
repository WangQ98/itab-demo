import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";

//时区插件
dayjs.extend(timezone);
//计算年中第几天
dayjs.extend(dayOfYear);
//计算年中第几周
dayjs.extend(weekOfYear);

export default dayjs;
