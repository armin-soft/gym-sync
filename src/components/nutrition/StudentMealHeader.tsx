
import React from "react";
import { Salad } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface StudentMealHeaderProps {
  studentName: string;
}

const StudentMealHeader: React.FC<StudentMealHeaderProps> = ({ studentName }) => {
  const { getGradientClass } = useBrandTheme();
  
  return (
    <div className="px-6 py-4 border-b bg-white dark:bg-gray-800/50 shadow-sm shrink-0 text-right">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${getGradientClass('primary')} flex items-center justify-center shadow-md`}>
              <Salad className="h-5 w-5 text-white" />
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-brand-dark dark:text-white">تخصیص برنامه</h2>
              <p className="text-sm font-medium text-brand-dark/60 dark:text-gray-300">{studentName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMealHeader;
