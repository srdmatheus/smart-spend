import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddTransactionButton } from "@/components/add-transaction-button";

import { transactionColumns } from "./columns";

export default async function TransactionsPage() {
  const { userId } = auth();

  if (!userId) return;

  const transactions = await db.transaction.findMany({ where: { userId } });

  return (
    <div className="flex flex-col space-y-6 overflow-hidden p-6">
      {/* TÍTULO E BOTÃO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <ScrollArea className="h-full">
        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </ScrollArea>
    </div>
  );
}
