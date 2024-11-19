import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon
} from "lucide-react";

import { db } from "@/lib/prisma";

import { SummaryCard } from "./summary-card";

type SummaryCardsProps = {
  month: string;
};

export const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
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
  const balance = depositTotal - expensesTotal - investmentsTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        label="Saldo"
        amount={balance}
        icon={<WalletIcon className="size-8 rounded-sm bg-background p-2" />}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          label="Investimentos"
          amount={investmentsTotal}
          icon={<PiggyBankIcon className="size-8 rounded-sm bg-muted p-2" />}
        />
        <SummaryCard
          label="Ganhos"
          amount={depositTotal}
          icon={
            <TrendingUpIcon className="size-8 rounded-sm bg-muted p-2 text-green-500" />
          }
        />
        <SummaryCard
          label="Gastos"
          amount={expensesTotal}
          icon={
            <TrendingDownIcon className="size-8 rounded-sm bg-muted p-2 text-red-500" />
          }
        />
      </div>
    </div>
  );
};
