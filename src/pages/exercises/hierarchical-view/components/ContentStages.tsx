
import React from "react";
import { ViewStage } from "../hooks/useHierarchicalView";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ContentStagesProps {
  currentStage: ViewStage;
  selectedTypeName?: string;
  selectedCategoryName?: string;
}

export const ContentStages: React.FC<ContentStagesProps> = ({
  currentStage,
  selectedTypeName,
  selectedCategoryName
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className={`flex items-center ${currentStage !== 'types' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{toPersianNumbers(1)}</span>
          <span className="mr-2">انواع تمرین</span>
          {selectedTypeName && <span className="mr-1 text-xs text-muted-foreground">({selectedTypeName})</span>}
        </div>
        
        <div className="mx-2 h-px w-6 bg-border"></div>
        
        <div className={`flex items-center ${currentStage === 'categories' ? 'text-primary' : currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'categories' || currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{toPersianNumbers(2)}</span>
          <span className="mr-2">دسته‌بندی‌ها</span>
          {selectedCategoryName && <span className="mr-1 text-xs text-muted-foreground">({selectedCategoryName})</span>}
        </div>
        
        <div className="mx-2 h-px w-6 bg-border"></div>
        
        <div className={`flex items-center ${currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{toPersianNumbers(3)}</span>
          <span className="mr-2">تمرینات</span>
        </div>
      </div>
    </div>
  );
};

export default ContentStages;
