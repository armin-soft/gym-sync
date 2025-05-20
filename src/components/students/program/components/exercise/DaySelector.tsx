
import React from "react";
import DayTabList from "./DayTabList";

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
          handleEditDayLabel={() => {}}
          handleSaveDayLabel={() => {}}
          confirmDeleteDay={() => {}}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default DaySelector;
