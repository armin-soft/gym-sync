import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { SingleExerciseForm } from "./SingleExerciseForm";
import { GroupExerciseForm } from "./GroupExerciseForm";
import { ExerciseFormActions } from "./ExerciseFormActions";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  deviceInfo?: any; // Added deviceInfo prop
  fullScreen?: boolean; // Added fullScreen parameter
}

export function ExerciseDialogMain({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormDataChange,
  onSave,
  deviceInfo, // Added deviceInfo parameter
  fullScreen, // Added fullScreen parameter
}: ExerciseDialogProps) {
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
  }, [isOpen, selectedExercise]);

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
        
        for (let i = 0; i < exercises.length; i++) {
          const exercise = exercises[i];
          setCurrentSaveIndex(i);
          try {
            await new Promise(resolve => setTimeout(resolve, 1));
            await onSave({
              name: exercise,
              categoryId: formData.categoryId
            });
            savedCount++;
          } catch (error) {
            console.error(`خطا در ذخیره حرکت "${exercise}"`, error);
            setSkippedExercises(prev => [...prev, exercise]);
            continue;  // ادامه حلقه با حرکت بعدی
          }
        }

        // نمایش خلاصه نتایج
        if (skippedExercises.length > 0) {
          toast({
            title: "هشدار",
            description: `${toPersianNumbers(savedCount)} حرکت با موفقیت اضافه شد. ${toPersianNumbers(skippedExercises.length)} حرکت به دلیل تکراری بودن رد شد.`,
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

  // نمایش دیالوگ ویرایش برای حرکت انتخاب شده
  if (selectedExercise) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-w-[calc(100%-2rem)] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              ویرایش حرکت
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <SingleExerciseForm 
              value={formData.name}
              onChange={(value) => onFormDataChange({ ...formData, name: value })}
              categories={categories}
              categoryId={formData.categoryId}
              onCategoryChange={(id) => onFormDataChange({ ...formData, categoryId: id })}
            />
          </div>
          <ExerciseFormActions
            onCancel={() => onOpenChange(false)}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // نمایش دیالوگ افزودن حرکت جدید
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[calc(100%-2rem)] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            افزودن حرکت جدید
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">دسته‌بندی تمرین</Label>
            <select
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow"
              value={formData.categoryId}
              onChange={(e) => onFormDataChange({ ...formData, categoryId: Number(e.target.value) })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <Tabs 
            defaultValue="single" 
            className="w-full" 
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">تکی</TabsTrigger>
              <TabsTrigger value="group">چند حرکت</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single">
              <SingleExerciseForm 
                value={formData.name}
                onChange={(value) => onFormDataChange({ ...formData, name: value })}
                categories={categories}
                categoryId={formData.categoryId}
                onCategoryChange={(id) => onFormDataChange({ ...formData, categoryId: id })}
              />
            </TabsContent>
            
            <TabsContent value="group">
              <GroupExerciseForm 
                value={groupText}
                onChange={setGroupText}
                isSaving={isSaving}
                currentSaveIndex={currentSaveIndex}
                totalToSave={totalToSave}
                skippedExercises={skippedExercises}
              />
            </TabsContent>
          </Tabs>
        </div>
        <ExerciseFormActions
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
          isSaving={isSaving}
          isDisabled={activeTab === "group" && !groupText.trim()}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseDialogMain;
