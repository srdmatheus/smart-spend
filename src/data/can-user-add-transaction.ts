import { PLAN_FREE_TRANSACTION_LIMIT, PlanType } from "@/constants";
import { getUserDetails } from "@/utils/get-user-details";

import { countCurrentMonthTransactions } from "./get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId, user } = await getUserDetails();
  if (!userId) return false;

  const { subscriptionPlan } = user.publicMetadata;

  if (subscriptionPlan === PlanType.PRO) {
    return true;
  }

  const transactionCount = await countCurrentMonthTransactions();
  return transactionCount < PLAN_FREE_TRANSACTION_LIMIT;
};
