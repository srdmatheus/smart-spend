import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { AddTransactionButton } from "@/components/add-transaction-button";

import { transactionColumns } from "./columns";

export default async function TransactionsPage() {
  const { userId } = auth();

  if (!userId) return;

  const transactions = await db.transaction.findMany({ where: { userId } });

  return (
    <main className="px-6">
      <div className="flex w-full items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </main>
  );
}
