import { transactionCategoryMap } from "@/constants";
import { TotalExpensePerCategory } from "@/data/get-dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

type ExpensesPerCategoryProps = {
  expenses: TotalExpensePerCategory[];
};

export const ExpensesPerCategory = ({ expenses }: ExpensesPerCategoryProps) => {
  return (
    <Card className="h">
      <CardHeader className="mb-4 border-b">
        <CardTitle className="font-bold">Gastos por categoria</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[25rem] rounded-md">
        <CardContent className="space-y-6">
          {expenses.map((expense, index) => (
            <div key={`${expense}-${index}`} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {transactionCategoryMap[expense.category]}
                </p>
                <p className="text-sm font-bold">
                  {expense.percentageOfTotal}%
                </p>
              </div>
              <Progress value={expense.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
