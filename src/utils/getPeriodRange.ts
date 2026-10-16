import dayjs from "dayjs";
import type { Period } from "@/types/period";

export function getPeriodRange(period: Period) {
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
