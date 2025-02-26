
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
}

export function ExerciseDialog({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormDataChange,
  onSave,
}: ExerciseDialogProps) {
  const { toast } = useToast();
  const [groupText, setGroupText] = useState("");
  const [activeTab, setActiveTab] = useState("single");
  const [isSaving, setIsSaving] = useState(false);
  const [currentSaveIndex, setCurrentSaveIndex] = useState(0);

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
        onFormDataChange({ name: "", categoryId: categories[0]?.id || 0 });
      }
    }
  }, [isOpen, selectedExercise]);

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
        setCurrentSaveIndex(0);
        
        // ذخیره حرکات یکی یکی
        for (let i = 0; i < exercises.length; i++) {
          setCurrentSaveIndex(i);
          try {
            await onSave({
              name: exercises[i],
              categoryId: formData.categoryId
            });
          } catch (error) {
            toast({
              variant: "destructive",
              title: "خطا",
              description: `خطا در ذخیره حرکت "${exercises[i]}"`
            });
            return;
          }
        }

        toast({
          title: "موفقیت",
          description: `${toPersianNumbers(exercises.length)} حرکت با موفقیت اضافه شد`
        });

        onOpenChange(false);
        setGroupText("");
      }
    } finally {
      setIsSaving(false);
      setCurrentSaveIndex(0);
    }
  };

  // اگر در حالت ویرایش هستیم، فقط تب تکی نمایش داده شود
  if (selectedExercise) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              ویرایش حرکت
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
            
            <div className="space-y-2">
              <Label className="text-base">نام حرکت</Label>
              <Input
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                placeholder="نام حرکت را وارد کنید"
                className="h-11 text-base focus-visible:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted/50 transition-colors"
            >
              انصراف
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
            >
              {isSaving ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
            
            <TabsContent value="single" className="space-y-2">
              <Label className="text-base">نام حرکت</Label>
              <Input
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                placeholder="نام حرکت را وارد کنید"
                className="h-11 text-base focus-visible:ring-blue-400"
              />
            </TabsContent>
            
            <TabsContent value="group" className="space-y-2">
              <Label className="text-base">نام حرکت‌ها (هر حرکت در یک خط)</Label>
              <Textarea
                value={groupText}
                placeholder="هر حرکت را در یک خط وارد کنید
مثال:
نشر از جلو دمبل
پرس سرشانه هالتر
نشر از جانب"
                className="min-h-[150px] focus-visible:ring-blue-400"
                onChange={(e) => setGroupText(e.target.value)}
                dir="rtl"
              />
              {isSaving && (
                <div className="text-sm text-gray-600">
                  در حال ذخیره حرکت {toPersianNumbers(currentSaveIndex + 1)}...
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/50 transition-colors"
          >
            انصراف
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            {isSaving ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
