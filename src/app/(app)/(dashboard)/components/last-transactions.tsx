import Image from "next/image";
import Link from "next/link";

import {
  transactionPaymentMethodIconMap,
  transactionPaymentMethodMap
} from "@/constants";
import { currencyFormatter } from "@/utils/currency-formatter";
import { Transaction, TransactionType } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type LastTransactionsProps = {
  lastTransactions: Transaction[];
};

export const LastTransactions = ({
  lastTransactions
}: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "EXPENSE") {
      return "text-red-500";
    }
    if (transaction.type === "DEPOSIT") {
      return "text-green-500";
    }
    return "text-muted-foreground";
  };

  const getAmountPrefix = (type: keyof typeof TransactionType) => {
    return type === "EXPENSE" || type === "INVESTMENT" ? "- " : "";
  };

  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader className="mb-4 flex-row items-center justify-between border-b px-6 py-2">
        <CardTitle className="font-bold">Últimas transações</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <ScrollArea className="h-full">
        <CardContent className="space-y-6 px-6 py-4">
          {lastTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={
                    transactionPaymentMethodIconMap[transaction.paymentMethod]
                  }
                  width={36}
                  height={36}
                  alt={transactionPaymentMethodMap[transaction.paymentMethod]}
                  title={transactionPaymentMethodMap[transaction.paymentMethod]}
                  className="rounded-md bg-muted p-2"
                />
                <div>
                  <p className="font-semibold text-muted-foreground">
                    {transaction.name}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "text-lg font-semibold",
                    getAmountColor(transaction)
                  )}
                >
                  {getAmountPrefix(transaction.type)}
                  {currencyFormatter(Number(transaction.amount))}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
