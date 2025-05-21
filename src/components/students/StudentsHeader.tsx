
import React from "react";
import { Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShamsiDate } from "@/hooks/useShamsiDate";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  const { dateInfo, isLoading } = useShamsiDate();
  
  const formatLastRefreshTime = () => {
    if (!lastRefreshTime) return null;
    
    try {
      const hours = lastRefreshTime.getHours();
      const minutes = lastRefreshTime.getMinutes();
      const seconds = lastRefreshTime.getSeconds();
      
      const formattedTime = `${toPersianNumbers(hours.toString().padStart(2, '0'))}:${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(seconds.toString().padStart(2, '0'))}`;
      
      // Get time context (morning, noon, evening, night)
      let timeContext = "صبح";
      if (hours >= 12 && hours < 17) {
        timeContext = "ظهر";
      } else if (hours >= 17 && hours < 20) {
        timeContext = "عصر";
      } else if (hours >= 20 || hours < 4) {
        timeContext = "شب";
      }
      
      return (
        <div className="flex flex-col text-xs text-muted-foreground">
          {dateInfo && (
            <>
              <div className="flex items-center gap-1">
                <span>{dateInfo.Shamsi_Date}</span>
                <span>{dateInfo.Season}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{dateInfo.Season_Emoji}</span>
                <span>{formattedTime}</span>
                <span>{timeContext}</span>
              </div>
            </>
          )}
        </div>
      );
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
          <div className="text-sm text-muted-foreground mt-1">
            آخرین بروزرسانی: {formatLastRefreshTime()}
          </div>
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
