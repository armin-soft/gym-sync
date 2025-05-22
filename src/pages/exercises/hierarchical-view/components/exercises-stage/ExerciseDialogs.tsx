
import React, { useEffect, useState } from "react";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Exercise } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useToast } from "@/hooks/use-toast";
import { useMicrophonePermission } from "@/hooks/speech/useMicrophonePermission";

interface ExerciseDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  selectedExercise?: Exercise;
  formData: { name: string; categoryId: number };
  setFormData: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onDelete: (id: number) => void;
  selectedExerciseIds: number[];
}

const ExerciseDialogs: React.FC<ExerciseDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  selectedExercise,
  formData,
  setFormData,
  onSave,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
  selectedExerciseIds
}) => {
  // Get categories from hook
  const { categories } = useExerciseData();
  const { toast } = useToast();
  const { requestMicrophonePermission, checkMicrophoneAvailability } = useMicrophonePermission();
  const [hasPromptedPermission, setHasPromptedPermission] = useState(false);
  
  // Request microphone permission when dialog opens with enhanced cross-platform handling
  useEffect(() => {
    if (isAddDialogOpen && !hasPromptedPermission) {
      const initiatePermissionRequest = async () => {
        try {
          // بررسی وجود میکروفون قبل از درخواست دسترسی
          const hasMicrophone = await checkMicrophoneAvailability();
          
          if (hasMicrophone === false) {
            // Don't show this message here since it will be shown by the AdvancedSpeechInput component
            return;
          }
          
          // Check user agent to adapt behavior
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
          
          if (isIOS) {
            // On iOS, show a message first to improve UX
            toast({
              title: "اجازه دسترسی به میکروفون",
              description: "لطفا در پنجره بعدی، به برنامه اجازه دسترسی به میکروفون را بدهید.",
              duration: 5000,
            });
            // Wait a moment to allow toast to be visible
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
          
          // Now request permission
          await requestMicrophonePermission();
          setHasPromptedPermission(true);
        } catch (error) {
          console.error("خطا در درخواست دسترسی به میکروفون:", error);
        }
      };
      
      initiatePermissionRequest();
    }
  }, [isAddDialogOpen, toast, requestMicrophonePermission, checkMicrophoneAvailability, hasPromptedPermission]);

  const handleDelete = () => {
    if (selectedExerciseIds.length === 1) {
      onDelete(selectedExerciseIds[0]);
    }
  };
  
  return (
    <>
      {/* Add/Edit Exercise Dialog */}
      <ExerciseDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        categories={categories}
        formData={formData}
        onFormChange={setFormData}
        onSave={onSave}
        isEditing={!!selectedExercise}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="حذف حرکت"
        description={
          selectedExerciseIds.length > 1
            ? `آیا از حذف ${toPersianNumbers(selectedExerciseIds.length)} حرکت انتخاب شده اطمینان دارید؟`
            : "آیا از حذف این حرکت اطمینان دارید؟"
        }
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </>
  );
};

export default ExerciseDialogs;
