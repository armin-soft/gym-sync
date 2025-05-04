import React from "react";
import { ChevronLeft } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ContentStagesProps {
  currentStage: 'types' | 'categories' | 'exercises';
  selectedTypeName?: string;
  selectedCategoryName?: string;
  // حذف پراپ onAddClick
}

export const ContentStages: React.FC<ContentStagesProps> = ({
  currentStage,
  selectedTypeName,
  selectedCategoryName,
  // حذف پراپ onAddClick
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium hover:text-primary transition-colors">
            انواع تمرین
          </span>
          
          {(currentStage === 'categories' || currentStage === 'exercises') && (
            <>
              <ChevronLeft className="h-4 w-4 mx-1" />
              <span className={`font-medium ${currentStage === 'categories' ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
                {selectedTypeName}
              </span>
            </>
          )}
          
          {currentStage === 'exercises' && (
            <>
              <ChevronLeft className="h-4 w-4 mx-1" />
              <span className="font-medium text-primary">
                {selectedCategoryName}
              </span>
            </>
          )}
        </div>
        
        {/* حذف دکمه افزودن که قبلاً اینجا بوده */}
      </div>
    </div>
  );
};
