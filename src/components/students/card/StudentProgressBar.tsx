
import React from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgressBarProps {
  progress: number;
}

export const StudentProgressBar: React.FC<StudentProgressBarProps> = ({ progress }) => {
  const getProgressColor = (value: number) => {
    if (value < 25) return "bg-red-500";
    if (value < 50) return "bg-orange-500";
    if (value < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1 text-xs">
        <span className="text-muted-foreground">پیشرفت برنامه</span>
        <span className="font-medium">{toPersianNumbers(progress || 0)}٪</span>
      </div>
      <Progress 
        value={progress || 0} 
        className="h-2" 
        indicatorClassName={getProgressColor(progress || 0)} 
      />
    </div>
  );
};
