
import React from "react";
import { Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRelative } from 'date-fns-jalali';

interface StudentsHeaderProps {
  onAddStudent: () => void;
  onRefresh?: () => void;
  lastRefreshTime?: Date;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ 
  onAddStudent,
  onRefresh,
  lastRefreshTime
}) => {
  const formatLastRefreshTime = () => {
    if (!lastRefreshTime) return "";
    
    try {
      return formatRelative(lastRefreshTime, new Date());
    } catch (error) {
      console.error('Error formatting date:', error);
      return "";
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">شاگردان</h1>
        {lastRefreshTime && (
          <p className="text-sm text-muted-foreground mt-1">
            آخرین بروزرسانی: {formatLastRefreshTime()}
          </p>
        )}
      </div>
      
      <div className="flex gap-2 mt-3 sm:mt-0">
        {onRefresh && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            className="flex items-center"
          >
            <RotateCw className="h-4 w-4 mr-2" />
            <span>بروزرسانی</span>
          </Button>
        )}
        
        <Button
          size="sm"
          onClick={onAddStudent}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>افزودن شاگرد</span>
        </Button>
      </div>
    </div>
  );
};
