
import { useState } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface DayManagementProps {
  initialDays?: number[];
  initialDayLabels?: Record<number, string>;
  onDayChange?: (day: number) => void;
  maxDays?: number;
}

export const useDayManagement = ({
  initialDays = [1, 2, 3, 4],
  initialDayLabels = {
    1: "روز اول",
    2: "روز دوم",
    3: "روز سوم",
    4: "روز چهارم",
  },
  onDayChange,
  maxDays = 10
}: DayManagementProps = {}) => {
  const [days, setDays] = useState<number[]>(initialDays);
  const [dayLabels, setDayLabels] = useState<Record<number, string>>(initialDayLabels);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [tempDayLabel, setTempDayLabel] = useState("");
  const [showAddDayDialog, setShowAddDayDialog] = useState(false);
  const [showDeleteDayDialog, setShowDeleteDayDialog] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);
  const [newDayLabel, setNewDayLabel] = useState("");
  
  // Update external day state if provided
  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    if (onDayChange) {
      onDayChange(day);
    }
  };
  
  const handleEditDayLabel = (day: number) => {
    setEditingDay(day);
    setTempDayLabel(dayLabels[day] || `روز ${toPersianNumbers(day)}`);
  };
  
  const handleSaveDayLabel = () => {
    if (editingDay !== null && tempDayLabel.trim()) {
      setDayLabels(prev => ({
        ...prev,
        [editingDay]: tempDayLabel.trim()
      }));
      setEditingDay(null);
    }
  };
  
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };

  const handleAddDay = () => {
    if (newDayLabel.trim()) {
      const nextDay = Math.max(...days) + 1;
      setDays(prev => [...prev, nextDay]);
      setDayLabels(prev => ({
        ...prev,
        [nextDay]: newDayLabel.trim()
      }));
      setShowAddDayDialog(false);
      setNewDayLabel("");
      // Set the newly added day as current
      handleDayChange(nextDay);
    }
  };

  const confirmDeleteDay = (day: number) => {
    setDayToDelete(day);
    setShowDeleteDayDialog(true);
  };

  const handleDeleteDay = () => {
    if (dayToDelete !== null) {
      // Remove day from days array
      setDays(prev => prev.filter(d => d !== dayToDelete));
      
      // Remove day label
      setDayLabels(prev => {
        const newLabels = {...prev};
        delete newLabels[dayToDelete];
        return newLabels;
      });
      
      // If the current day is deleted, switch to another day
      if (currentDay === dayToDelete) {
        const remainingDays = days.filter(d => d !== dayToDelete);
        if (remainingDays.length > 0) {
          handleDayChange(remainingDays[0]);
        }
      }
      
      setShowDeleteDayDialog(false);
      setDayToDelete(null);
    }
  };

  return {
    days,
    dayLabels,
    currentDay,
    setCurrentDay: handleDayChange,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    showAddDayDialog,
    setShowAddDayDialog,
    showDeleteDayDialog,
    setShowDeleteDayDialog,
    dayToDelete,
    newDayLabel,
    setNewDayLabel,
    maxDays,
    
    // Methods
    handleEditDayLabel,
    handleSaveDayLabel,
    getDayLabel,
    handleAddDay,
    confirmDeleteDay,
    handleDeleteDay,
  };
};

export default useDayManagement;
