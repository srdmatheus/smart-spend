import { redirect } from "next/navigation";

import { getDashboard } from "@/data/get-dashboard";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ExpensesPerCategory } from "./components/expenses-per-category";
import { LastTransactions } from "./components/last-transactions";
import { SummaryCards } from "./components/summary-cards";
import { TimeSelect } from "./components/time-select";
import { TransactionsPieChart } from "./components/transactions-pie-chart";

type DashboardPageProps = {
  searchParams: {
    month: string;
  };
};

export default async function DashboardPage({
  searchParams: { month }
}: DashboardPageProps) {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <main className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button>
            Relatório com IA <SparklesIcon />
          </Button>
          <TimeSelect />
        </div>
      </div>

      <div className="grid h-full grid-cols-3 gap-6 overflow-hidden">
        <div className="col-span-2 flex flex-col gap-6 overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory expenses={dashboard.totalExpensePerCategory} />
          </div>
        </div>
        <div className="overflow-hidden">
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </main>
  );
}
