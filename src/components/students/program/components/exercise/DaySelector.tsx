
import React from "react";
import DayTabList from "./DayTabList";
import AddDayButton from "./AddDayButton";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DaySelectorProps {
  days: number[];
  dayLabels: Record<number, string>;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  editingDay: number | null;
  setEditingDay: (day: number | null) => void;
  tempDayLabel: string;
  setTempDayLabel: (label: string) => void;
  setShowAddDayDialog: (show: boolean) => void;
  confirmDeleteDay: (day: number) => void;
  maxDays: number;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  dayLabels,
  currentDay,
  setCurrentDay,
  editingDay,
  setEditingDay,
  tempDayLabel,
  setTempDayLabel,
  setShowAddDayDialog,
  confirmDeleteDay,
  maxDays,
}) => {
  const handleEditDayLabel = (day: number) => {
    setEditingDay(day);
    setTempDayLabel(dayLabels[day] || `روز ${toPersianNumbers(day)}`);
  };
  
  const handleSaveDayLabel = () => {
    if (editingDay !== null && tempDayLabel.trim()) {
      setEditingDay(null);
    }
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center flex-wrap gap-2 rounded-md">
        <DayTabList
          days={days}
          dayLabels={dayLabels}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          editingDay={editingDay}
          tempDayLabel={tempDayLabel}
          setTempDayLabel={setTempDayLabel}
          handleEditDayLabel={handleEditDayLabel}
          handleSaveDayLabel={handleSaveDayLabel}
          confirmDeleteDay={confirmDeleteDay}
        />
        
        {days.length < maxDays && (
          <AddDayButton onClick={() => setShowAddDayDialog(true)} />
        )}
      </div>
    </div>
  );
};

export default DaySelector;
