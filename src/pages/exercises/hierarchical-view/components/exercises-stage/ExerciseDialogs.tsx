
import React, { useEffect } from "react";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Exercise } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useToast } from "@/hooks/use-toast";
import { VoiceRecognitionDialog } from "@/components/ui/speech-to-text/voice-recognition-dialog";

interface ExerciseDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  selectedExercise?: Exercise;
  formData: { name: string; categoryId: number };
  setFormData: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onDelete: () => void;
  selectedExerciseIds: number[];
  isVoiceRecognitionOpen: boolean;
  setIsVoiceRecognitionOpen: (open: boolean) => void;
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
  selectedExerciseIds,
  isVoiceRecognitionOpen,
  setIsVoiceRecognitionOpen
}) => {
  // Get categories from hook
  const { categories } = useExerciseData();
  const { toast } = useToast();
  
  // اضافه کردن درخواست مجوز میکروفون هنگام باز شدن دیالوگ
  useEffect(() => {
    const requestMicrophonePermission = async () => {
      if (isAddDialogOpen || isVoiceRecognitionOpen) {
        try {
          // درخواست دسترسی به میکروفون
          await navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
              // پس از دریافت دسترسی، منابع را آزاد کنید
              stream.getTracks().forEach(track => track.stop());
              console.log("دسترسی به میکروفون با موفقیت انجام شد");
            });
        } catch (error) {
          console.error("خطا در دسترسی به میکروفون:", error);
          toast({
            title: "خطا در دسترسی به میکروفون",
            description: "لطفاً دسترسی به میکروفون را در تنظیمات مرورگر خود فعال کنید.",
            variant: "destructive",
          });
        }
      }
    };
    
    requestMicrophonePermission();
  }, [isAddDialogOpen, isVoiceRecognitionOpen, toast]);

  // دریافت متن از دیالوگ گفتار به نوشتار
  const handleTranscriptChange = (transcript: string) => {
    if (transcript) {
      setFormData({
        ...formData,
        name: transcript
      });
    }
  };

  // زمانی که دیالوگ بسته می‌شود، اگر متن وجود داشته باشد دیالوگ افزودن را باز کنید
  const handleVoiceDialogChange = (open: boolean) => {
    setIsVoiceRecognitionOpen(open);
    if (!open && formData.name) {
      setTimeout(() => {
        setIsAddDialogOpen(true);
      }, 100);
    }
  };
  
  return (
    <>
      {/* دیالوگ گفتار به نوشتار */}
      <VoiceRecognitionDialog
        isOpen={isVoiceRecognitionOpen}
        onOpenChange={handleVoiceDialogChange}
        onTranscriptChange={handleTranscriptChange}
        initialValue=""
        title="افزودن حرکت با گفتار"
      />

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
        onConfirm={onDelete}
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
