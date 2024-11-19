import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";

import { SummaryCards } from "./components/summary-cards";
import { TimeSelect } from "./components/time-select";

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

  return (
    <main className="px-6">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
    </main>
  );
}
