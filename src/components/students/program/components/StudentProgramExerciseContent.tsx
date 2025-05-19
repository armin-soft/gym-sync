
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Edit2, Save, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[]; // Add exercises prop
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises, // Add exercises prop
}) => {
  const [dayLabels, setDayLabels] = useState<Record<number, string>>({
    1: "روز اول",
    2: "روز دوم",
    3: "روز سوم",
    4: "روز چهارم",
  });
  
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [tempDayLabel, setTempDayLabel] = useState("");
  const [days, setDays] = useState<number[]>([1, 2, 3, 4]);
  const [showAddDayDialog, setShowAddDayDialog] = useState(false);
  const [showDeleteDayDialog, setShowDeleteDayDialog] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);
  const [newDayLabel, setNewDayLabel] = useState("");
  
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
      setCurrentDay(nextDay);
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
          setCurrentDay(remainingDays[0]);
        }
      }
      
      setShowDeleteDayDialog(false);
      setDayToDelete(null);
    }
  };

  const maxDays = 10; // Maximum number of allowed days

  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col rtl">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center flex-wrap gap-2 rounded-md">
            <div className="flex items-center border rounded-md overflow-x-auto pb-1">
              {days.map(day => (
                <div key={day} className="relative">
                  {editingDay === day ? (
                    <div className="flex items-center px-2">
                      <Input
                        value={tempDayLabel}
                        onChange={(e) => setTempDayLabel(e.target.value)}
                        className="h-10 text-sm w-24"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSaveDayLabel}
                        className="ml-1 h-8 w-8"
                      >
                        <Save className="h-4 w-4" />
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
                        <Edit2
                          className="h-3 w-3 ml-2 opacity-50 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditDayLabel(day);
                          }}
                        />
                      </Button>
                      
                      {days.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteDay(day);
                          }}
                          className="h-8 w-8 ml-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {days.length < maxDays && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowAddDayDialog(true)}
                className="h-10 w-10 rounded-md border-dashed"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <StudentExerciseSelector 
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            dayNumber={currentDay}
            exercises={exercises} // Pass exercises down to the selector
            dayLabel={getDayLabel(currentDay)}
          />
        </div>
      </div>
      
      {/* Add Day Dialog */}
      <Dialog open={showAddDayDialog} onOpenChange={setShowAddDayDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">افزودن روز جدید</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                value={newDayLabel}
                onChange={(e) => setNewDayLabel(e.target.value)}
                placeholder="نام روز (مثال: روز پنجم)"
                className="text-right"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddDayDialog(false)}
            >
              انصراف
            </Button>
            <Button
              type="button"
              onClick={handleAddDay}
              disabled={!newDayLabel.trim()}
            >
              افزودن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Day Dialog */}
      <Dialog open={showDeleteDayDialog} onOpenChange={setShowDeleteDayDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">حذف روز</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              آیا از حذف {dayToDelete ? getDayLabel(dayToDelete) : ''} اطمینان دارید؟
            </p>
            <p className="text-center text-red-500 text-sm mt-2">
              تمام تمرین‌های این روز حذف خواهند شد.
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteDayDialog(false)}
            >
              انصراف
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteDay}
            >
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
