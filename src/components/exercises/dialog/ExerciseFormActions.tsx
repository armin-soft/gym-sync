
import React from "react";
import { Button } from "@/components/ui/button";

interface ExerciseFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isDisabled?: boolean;
}

export const ExerciseFormActions: React.FC<ExerciseFormActionsProps> = ({
  onCancel,
  onSave,
  isSaving,
  isDisabled = false,
}) => {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="hover:bg-muted/50 transition-colors"
      >
        انصراف
      </Button>
      <Button 
        onClick={onSave}
        disabled={isSaving || isDisabled}
        className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
      >
        {isSaving ? "در حال ذخیره..." : "ذخیره"}
      </Button>
    </div>
  );
};

export default ExerciseFormActions;
