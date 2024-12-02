import { getUserDetails } from "@/utils/get-user-details";
import { endOfMonth, startOfMonth } from "date-fns";

import { db } from "@/lib/prisma";

export const countCurrentMonthTransactions = async () => {
  const { userId } = await getUserDetails();

  return db.transaction.count({
    where: {
      userId: userId!,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date())
      }
    }
  });
};
