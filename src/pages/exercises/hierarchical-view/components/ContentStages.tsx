
import React from "react";
import { ViewStage } from "../hooks/useHierarchicalView";

interface ContentStagesProps {
  currentStage: ViewStage;
  selectedCategoryName?: string;
  selectedTypeName?: string;
}

const ContentStages: React.FC<ContentStagesProps> = ({
  currentStage,
  selectedCategoryName,
  selectedTypeName
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className={`flex items-center ${currentStage !== 'categories' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">1</span>
          <span className="mr-2">دسته‌بندی‌ها</span>
          {selectedCategoryName && <span className="mr-1 text-xs text-muted-foreground">({selectedCategoryName})</span>}
        </div>
        
        <div className="mx-2 h-px w-6 bg-border"></div>
        
        <div className={`flex items-center ${currentStage === 'types' ? 'text-primary' : currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'types' || currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>2</span>
          <span className="mr-2">انواع تمرین</span>
          {selectedTypeName && <span className="mr-1 text-xs text-muted-foreground">({selectedTypeName})</span>}
        </div>
        
        <div className="mx-2 h-px w-6 bg-border"></div>
        
        <div className={`flex items-center ${currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>3</span>
          <span className="mr-2">تمرینات</span>
        </div>
      </div>
    </div>
  );
};

export default ContentStages;
