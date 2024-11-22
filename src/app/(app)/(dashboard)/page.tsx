import { redirect } from "next/navigation";

import { getDashboard } from "@/data/get-dashboard";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";

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
    <main className="space-y-6 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid w-full grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <SummaryCards {...dashboard} />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <TransactionsPieChart {...dashboard} />
            </div>
            <div className="col-span-2">
              <ExpensesPerCategory
                expenses={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </main>
  );
}
