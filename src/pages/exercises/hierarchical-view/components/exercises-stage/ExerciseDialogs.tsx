
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
  const { requestMicrophonePermission, checkMicrophoneAvailability } = useMicrophonePermission();
  
  // Request microphone permission when dialog opens with enhanced cross-platform handling
  useEffect(() => {
    if (isAddDialogOpen) {
      const initiatePermissionRequest = async () => {
        try {
          // بررسی وجود میکروفون قبل از درخواست دسترسی
          const hasMicrophone = await checkMicrophoneAvailability();
          
          if (hasMicrophone === false) {
            toast({
              title: "میکروفون یافت نشد",
              description: "هیچ میکروفونی به دستگاه متصل نیست یا توسط سیستم‌عامل شناسایی نشده است. می‌توانید از ورودی متنی استفاده کنید.",
              variant: "destructive",
              duration: 6000,
            });
            return;
          }
          
          // Check user agent to adapt behavior
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
          const isAndroid = /android/i.test(navigator.userAgent);
          const isChrome = typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
          const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          
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
            // راهنمایی‌های مخصوص هر مرورگر
            if (isAndroid && isChrome) {
              toast({
                title: "راهنمایی کاربران Android با Chrome",
                description: "لطفا روی آیکون قفل در نوار آدرس کلیک کرده و دسترسی میکروفون را فعال کنید.",
                duration: 6000,
              });
            } else if (isIOS && isSafari) {
              toast({
                title: "راهنمایی کاربران iOS با Safari",
                description: "در تنظیمات Safari > بخش دسترسی‌های وب‌سایت، دسترسی به میکروفون را برای این سایت فعال کنید.",
                duration: 6000,
              });
            } else if (isChrome) {
              toast({
                title: "راهنمایی کاربران Chrome",
                description: "برای فعال کردن میکروفون، روی آیکون دوربین/میکروفون در نوار آدرس کلیک کنید.",
                duration: 6000,
              });
            }
          }
        } catch (error) {
          console.error("خطا در درخواست دسترسی به میکروفون:", error);
        }
      };
      
      initiatePermissionRequest();
    }
  }, [isAddDialogOpen, toast, requestMicrophonePermission, checkMicrophoneAvailability]);

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
