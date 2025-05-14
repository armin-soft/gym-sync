
import React, { useEffect } from "react";
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
  const { requestMicrophonePermission } = useMicrophonePermission();
  
  // Request microphone permission when dialog opens with enhanced cross-platform handling
  useEffect(() => {
    if (isAddDialogOpen) {
      const initiatePermissionRequest = async () => {
        try {
          // Check user agent to adapt behavior
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
          const isAndroid = /android/i.test(navigator.userAgent);
          
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
          const hasPermission = await requestMicrophonePermission();
          
          if (!hasPermission) {
            if (isAndroid) {
              toast({
                title: "کاربران اندروید",
                description: "اگر گزینه‌ای برای دسترسی به میکروفون ندیدید، ممکن است نیاز به بررسی مجوزهای برنامه در تنظیمات مرورگر داشته باشید.",
                duration: 6000,
              });
            } else if (isIOS) {
              toast({
                title: "کاربران iOS",
                description: "در صورت عدم نمایش گزینه دسترسی، به تنظیمات Safari در دستگاه خود بروید و دسترسی میکروفون را فعال کنید.",
                duration: 6000,
              });
            }
          }
        } catch (error) {
          console.error("Error requesting microphone permission:", error);
        }
      };
      
      initiatePermissionRequest();
    }
  }, [isAddDialogOpen, toast, requestMicrophonePermission]);

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
