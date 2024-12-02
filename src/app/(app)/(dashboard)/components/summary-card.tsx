import { ReactNode } from "react";

import { canUserAddTransaction } from "@/data/can-user-add-transaction";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddTransactionButton } from "@/components/add-transaction-button";

type SummaryCardProps = {
  icon: ReactNode;
  label: string;
  amount: number;
  size?: "small" | "large";
};

export const SummaryCard = async ({
  icon,
  label,
  amount,
  size = "small"
}: SummaryCardProps) => {
  const userCanAddTransactions = await canUserAddTransaction();

  return (
    <Card className={cn(size === "large" && "bg-muted")}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={cn(
            size === "small"
              ? "text-muted-foreground"
              : "font-semibold text-primary"
          )}
        >
          {label}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={cn(
            size === "small" ? "text-2xl font-semibold" : "text-4xl font-bold"
          )}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransactions}
          />
        )}
      </CardContent>
    </Card>
  );
};
