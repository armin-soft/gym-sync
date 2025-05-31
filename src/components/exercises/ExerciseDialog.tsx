
import React from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useBrandTheme } from "@/hooks/use-brand-theme";
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
  isEditing
}: ExerciseDialogProps) => {
  const deviceInfo = useDeviceInfo();
  const { getGradientClass } = useBrandTheme();
  
  return (
    <div className={`${getGradientClass('accent')} bg-opacity-5`}>
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
      />
    </div>
  );
};

export { ResponsiveExerciseDialog as ExerciseDialog };
export default ResponsiveExerciseDialog;
