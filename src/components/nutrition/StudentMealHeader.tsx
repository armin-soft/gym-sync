
import React from "react";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, X } from "lucide-react";

interface StudentMealHeaderProps {
  studentName: string;
  onClose?: () => void;
}

const StudentMealHeader: React.FC<StudentMealHeaderProps> = ({ 
  studentName,
  onClose 
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
          <UtensilsCrossed className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            برنامه غذایی {studentName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            انتخاب وعده‌های غذایی
          </p>
        </div>
      </div>
      
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StudentMealHeader;
