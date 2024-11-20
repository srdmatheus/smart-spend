import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon
} from "lucide-react";

import { SummaryCard } from "./summary-card";

type SummaryCardsProps = {
  balance: number;
  investmentsTotal: number;
  depositTotal: number;
  expensesTotal: number;
};

export const SummaryCards = async ({
  depositTotal,
  balance,
  investmentsTotal,
  expensesTotal
}: SummaryCardsProps) => {
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
          icon={
            <PiggyBankIcon className="size-8 rounded-sm bg-muted p-2 text-primary" />
          }
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
