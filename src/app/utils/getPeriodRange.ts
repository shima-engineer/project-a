import dayjs from "dayjs";

export function getPeriodRange(period: "daily" | "weekly" | "monthly") {
  const ranges = {
    daily: {
      gte: dayjs().startOf("day").toDate(),
      lte: dayjs().endOf("day").toDate(),
    },
    weekly: {
      gte: dayjs().startOf("isoWeek").toDate(),
      lte: dayjs().endOf("isoWeek").toDate(),
    },
    monthly: {
      gte: dayjs().startOf("month").toDate(),
      lte: dayjs().endOf("month").toDate(),
    },
  };

  return ranges[period];
}
