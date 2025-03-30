
import React from "react";
import { Student } from "@/components/Students/StudentTypes";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/Students/StudentDialogManager";

interface StudentDialogManagerWrapperProps {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exerciseIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export class StudentDialogManagerWrapper extends React.Component<StudentDialogManagerWrapperProps> {
  dialogManagerRef = React.createRef<StudentDialogManagerRef>();
  
  handleAdd = () => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleAdd();
    }
  };

  handleEdit = (student: Student) => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleEdit(student);
    }
  };

  handleAddExercise = (student: Student) => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleAddExercise(student);
    }
  };

  handleAddDiet = (student: Student) => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleAddDiet(student);
    }
  };

  handleAddSupplement = (student: Student) => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleAddSupplement(student);
    }
  };

  handleDownload = (student: Student) => {
    if (this.dialogManagerRef.current) {
      this.dialogManagerRef.current.handleDownload(student);
    }
  };

  render() {
    return (
      <div data-dialog-manager>
        <StudentDialogManager 
          ref={this.dialogManagerRef}
          onSave={this.props.onSave}
          onSaveExercises={this.props.onSaveExercises}
          onSaveDiet={this.props.onSaveDiet}
          onSaveSupplements={this.props.onSaveSupplements}
          exercises={this.props.exercises}
          meals={this.props.meals}
          supplements={this.props.supplements}
        />
      </div>
    );
  }
}
