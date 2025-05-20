
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import AddDayDialog from "./exercise/AddDayDialog";
import DeleteDayDialog from "./exercise/DeleteDayDialog";
import useDayManagement from "./exercise/useDayManagement";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[];
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises,
}) => {
  // Use our custom hook for day management
  const {
    days,
    dayLabels,
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
    getDayLabel,
    handleAddDay,
    confirmDeleteDay,
    handleDeleteDay,
  } = useDayManagement({
    initialDays: [1, 2, 3, 4],
    onDayChange: setCurrentDay
  });

  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col rtl">
        <DaySelector 
          days={days}
          dayLabels={dayLabels}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          editingDay={editingDay}
          setEditingDay={setEditingDay}
          tempDayLabel={tempDayLabel}
          setTempDayLabel={setTempDayLabel}
          setShowAddDayDialog={setShowAddDayDialog}
          confirmDeleteDay={confirmDeleteDay}
          maxDays={maxDays}
        />
        
        <div className="flex-1 overflow-auto">
          <StudentExerciseSelector 
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            dayNumber={currentDay}
            exercises={exercises}
            dayLabel={getDayLabel(currentDay)}
          />
        </div>
      </div>
      
      {/* Add Day Dialog */}
      <AddDayDialog
        open={showAddDayDialog}
        onOpenChange={setShowAddDayDialog}
        newDayLabel={newDayLabel}
        setNewDayLabel={setNewDayLabel}
        handleAddDay={handleAddDay}
      />
      
      {/* Delete Day Dialog */}
      <DeleteDayDialog
        open={showDeleteDayDialog}
        onOpenChange={setShowDeleteDayDialog}
        dayLabel={dayToDelete ? getDayLabel(dayToDelete) : ''}
        onDelete={handleDeleteDay}
      />
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
