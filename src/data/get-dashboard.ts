import { auth } from "@clerk/nextjs/server";
import { TransactionCategory, TransactionType } from "@prisma/client";

import { db } from "@/lib/prisma";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export type TotalExpensePerCategory = {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
};

export const getDashboard = async (month: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Não autorizado.");
  }

  const where = {
    userId,
    date: {
      gte: new Date(`${new Date().getFullYear()}-${month}-01`),
      lt: new Date(`${new Date().getFullYear()}-${month}-31`)
    }
  };
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true }
      })
    )?._sum.amount
  );
  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true }
      })
    )?._sum.amount
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true }
      })
    )?._sum.amount
  );

  const transactionTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true }
      })
    )?._sum?.amount
  );

  const balance = depositTotal - expensesTotal - investmentsTotal;

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositTotal || 0) / Number(transactionTotal)) * 100
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionTotal)) * 100
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionTotal)) * 100
    )
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE
      },
      _sum: {
        amount: true
      }
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100
    )
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10
  });

  const monthTransactions = await db.transaction.findMany({
    where
  });

  return {
    balance,
    depositTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
    monthTransactions
  };
};
