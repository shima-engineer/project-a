"use server";

import { getProductsByPeriod } from "../queries/getProduct";

export async function getProductsByPeriodAction(
  period: "daily" | "weekly" | "monthly",
) {
  return getProductsByPeriod(period);
}