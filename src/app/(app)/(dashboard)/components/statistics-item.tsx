import { ReactNode } from "react";

type StatisticsItemProps = {
  icon: ReactNode;
  label: string;
  percentage: number;
};

export const StatisticsItem = ({
  icon,
  label,
  percentage
}: StatisticsItemProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p>{label}</p>
      </div>
      <p className="font-bold">{percentage}%</p>
    </div>
  );
};
