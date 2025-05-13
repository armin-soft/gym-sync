
import { useState, useEffect } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export function useExerciseDialogLogic({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormDataChange,
  onSave,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: any[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
}) {
  const { toast } = useToast();
  const [groupText, setGroupText] = useState("");
  const [activeTab, setActiveTab] = useState("single");
  const [isSaving, setIsSaving] = useState(false);
  const [currentSaveIndex, setCurrentSaveIndex] = useState(0);
  const [totalToSave, setTotalToSave] = useState(0);
  const [skippedExercises, setSkippedExercises] = useState<string[]>([]);

  useEffect(() => {
    if (selectedExercise) {
      onFormDataChange({
        name: selectedExercise.name,
        categoryId: selectedExercise.categoryId
      });
      setActiveTab("single");
    } else {
      if (!isOpen) {
        setGroupText("");
        setActiveTab("single");
        setSkippedExercises([]);
        onFormDataChange({ name: "", categoryId: categories[0]?.id || 0 });
      }
    }
  }, [isOpen, selectedExercise, categories, onFormDataChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen) {
        if (activeTab === "single" && formData.name.trim()) {
          handleSave();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeTab, formData.name]);

  const handleSave = async () => {
    if (isSaving) return;
    
    try {
      if (activeTab === "single") {
        if (!formData.name.trim()) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "لطفاً نام حرکت را وارد کنید"
          });
          return;
        }
        setIsSaving(true);
        await onSave(formData);
        onOpenChange(false);
      } else {
        const exercises = groupText
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean);
        
        if (exercises.length === 0) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "لطفاً حداقل یک حرکت را وارد کنید"
          });
          return;
        }

        setIsSaving(true);
        setTotalToSave(exercises.length);
        setSkippedExercises([]);
        let savedCount = 0;
        let skipped: string[] = [];
        
        // ایجاد یک آرایه از وعده‌ها برای ذخیره همزمان حرکت‌ها
        const savePromises = exercises.map(async (exercise, i) => {
          try {
            setCurrentSaveIndex(i);
            // کمی تأخیر برای جلوگیری از مسدود شدن رابط کاربری
            await new Promise(resolve => setTimeout(resolve, 50));
            
            await onSave({
              name: exercise,
              categoryId: formData.categoryId
            });
            
            savedCount++;
            return { success: true, exercise };
          } catch (error) {
            console.error(`خطا در ذخیره حرکت "${exercise}"`, error);
            skipped.push(exercise);
            return { success: false, exercise };
          }
        });
        
        // انتظار برای تکمیل همه وعده‌ها
        await Promise.all(savePromises);
        
        setSkippedExercises(skipped);

        // نمایش خلاصه نتایج
        if (skipped.length > 0) {
          toast({
            title: "هشدار",
            description: `${toPersianNumbers(savedCount)} حرکت با موفقیت اضافه شد. ${toPersianNumbers(skipped.length)} حرکت به دلیل تکراری بودن رد شد.`,
          });
        } else {
          toast({
            title: "موفقیت",
            description: `${toPersianNumbers(savedCount)} حرکت با موفقیت اضافه شد`
          });
        }

        if (savedCount > 0) {
          onOpenChange(false);
          setGroupText("");
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    groupText,
    setGroupText,
    activeTab,
    setActiveTab,
    isSaving,
    currentSaveIndex,
    totalToSave,
    skippedExercises,
    handleSave
  };
}
