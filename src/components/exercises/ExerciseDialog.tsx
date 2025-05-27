
import React from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import ExerciseDialogMain from "./dialog/ExerciseDialogMain";

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: any;
  categories: any[];
  formData: { name: string; categoryId: number };
  onFormChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  isEditing?: boolean;
  preselectedCategoryId?: number; // اضافه کردن پراپ جدید
}

// Create a higher-order component to add responsive props
const ResponsiveExerciseDialog = ({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormChange,
  onSave,
  isEditing,
  preselectedCategoryId
}: ExerciseDialogProps) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <ExerciseDialogMain 
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      selectedExercise={selectedExercise}
      categories={categories}
      formData={formData}
      onFormDataChange={onFormChange}
      onSave={onSave}
      deviceInfo={deviceInfo} 
      fullScreen={true} // Always use fullscreen mode
      preselectedCategoryId={preselectedCategoryId}
    />
  );
};

export { ResponsiveExerciseDialog as ExerciseDialog };
export default ResponsiveExerciseDialog;
