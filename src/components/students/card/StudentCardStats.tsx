
import React from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCardStatsProps {
  height: string;
  weight: string;
}

export const StudentCardStats: React.FC<StudentCardStatsProps> = ({ height, weight }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
      <div className="text-right">
        <p className="text-muted-foreground text-xs">قد</p>
        <p className="font-medium">{toPersianNumbers(height)} سانتی‌متر</p>
      </div>
      <div className="text-right">
        <p className="text-muted-foreground text-xs">وزن</p>
        <p className="font-medium">{toPersianNumbers(weight)} کیلوگرم</p>
      </div>
    </div>
  );
};
