"use client";

import { TransactionPercentagePerType } from "@/data/get-dashboard";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

import { StatisticsItem } from "./statistics-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "var(--primary-foreground)"
  },
  [TransactionType.DEPOSIT]: {
    label: "Receitas",
    color: colors.green[500]
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: colors.red[500]
  }
} satisfies ChartConfig;

type TransactionsPieChartProps = {
  investmentsTotal: number;
  depositTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
};

export const TransactionsPieChart = (props: TransactionsPieChartProps) => {
  const { investmentsTotal, depositTotal, expensesTotal, typesPercentage } =
    props;

  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositTotal,
      fill: colors.green[500]
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: colors.red[500]
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "hsl(var(--primary))"
    }
  ];

  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={40}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col space-y-2 px-10">
        <StatisticsItem
          label="Ganhos"
          percentage={typesPercentage.DEPOSIT}
          icon={
            <TrendingUpIcon className="size-8 rounded-sm bg-muted p-2 text-green-500" />
          }
        />
        <StatisticsItem
          label="Gastos"
          percentage={typesPercentage.EXPENSE}
          icon={
            <TrendingDownIcon className="size-8 rounded-sm bg-muted p-2 text-red-500" />
          }
        />
        <StatisticsItem
          label="Investimentos"
          percentage={typesPercentage.INVESTMENT}
          icon={
            <PiggyBankIcon className="size-8 rounded-sm bg-muted p-2 text-muted-foreground" />
          }
        />
      </CardFooter>
    </Card>
  );
};
