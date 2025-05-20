
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DayTabListProps {
  days: number[];
  dayLabels: Record<number, string>;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  editingDay: number | null;
  tempDayLabel: string;
  setTempDayLabel: (label: string) => void;
  handleEditDayLabel: (day: number) => void;
  handleSaveDayLabel: () => void;
  confirmDeleteDay: (day: number) => void;
  readOnly?: boolean;
}

const DayTabList: React.FC<DayTabListProps> = ({
  days,
  dayLabels,
  currentDay,
  setCurrentDay,
  editingDay,
  tempDayLabel,
  setTempDayLabel,
  handleEditDayLabel,
  handleSaveDayLabel,
  confirmDeleteDay,
  readOnly = false
}) => {
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };
  
  return (
    <div className="flex items-center border rounded-md overflow-x-auto pb-1">
      {days.map(day => (
        <div key={day} className="relative">
          {editingDay === day && !readOnly ? (
            <div className="flex items-center px-2">
              <input
                value={tempDayLabel}
                onChange={(e) => setTempDayLabel(e.target.value)}
                className="h-10 text-sm w-24 px-2 border rounded"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveDayLabel}
                className="ml-1 h-8 w-8"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <Button 
                variant={currentDay === day ? "default" : "ghost"}
                className={cn(
                  "h-10 rounded-md px-5",
                  currentDay === day ? "bg-indigo-600 hover:bg-indigo-700" : ""
                )}
                onClick={() => setCurrentDay(day)}
              >
                {getDayLabel(day)}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DayTabList;
