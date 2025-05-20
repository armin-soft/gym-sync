import { useState } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface DayManagementProps {
  initialDays?: number[];
  initialDayLabels?: Record<number, string>;
  onDayChange?: (day: number) => void;
  maxDays?: number;
}

export const useDayManagement = ({
  initialDays = [1, 2, 3, 4, 5],
  initialDayLabels = {
    1: "روز اول",
    2: "روز دوم",
    3: "روز سوم",
    4: "روز چهارم",
    5: "روز پنجم",
  },
  onDayChange,
  maxDays = 5
}: DayManagementProps = {}) => {
  const [days] = useState<number[]>(initialDays);
  const [dayLabels] = useState<Record<number, string>>(initialDayLabels);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // Update external day state if provided
  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    if (onDayChange) {
      onDayChange(day);
    }
  };
  
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };

  return {
    days,
    dayLabels,
    currentDay,
    setCurrentDay: handleDayChange,
    getDayLabel,
    maxDays,
    
    // We're keeping these methods but they won't be used
    // They're here to maintain the interface compatibility
    editingDay: null,
    setEditingDay: () => {},
    tempDayLabel: "",
    setTempDayLabel: () => {},
    showAddDayDialog: false,
    setShowAddDayDialog: () => {},
    showDeleteDayDialog: false,
    setShowDeleteDayDialog: () => {},
    dayToDelete: null,
    newDayLabel: "",
    setNewDayLabel: () => {},
    
    handleEditDayLabel: () => {},
    handleSaveDayLabel: () => {},
    handleAddDay: () => {},
    confirmDeleteDay: () => {},
    handleDeleteDay: () => {},
  };
};

export default useDayManagement;
