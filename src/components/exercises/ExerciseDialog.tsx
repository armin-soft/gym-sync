
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

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: () => void;
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
  const [groupText, setGroupText] = useState("");
  const [activeTab, setActiveTab] = useState("single");

  // Update formData.name when switching tabs or when groupText changes
  useEffect(() => {
    if (activeTab === "group") {
      const firstExercise = groupText.split('\n').find(line => line.trim());
      if (firstExercise) {
        onFormDataChange({ ...formData, name: firstExercise.trim() });
      }
    }
  }, [activeTab, groupText]);

  const handleSave = () => {
    if (activeTab === "single") {
      onSave();
    } else {
      // Handle group save
      const exercises = groupText.split('\n').filter(line => line.trim());
      
      if (exercises.length === 0) return;

      // Save each exercise with a small delay
      exercises.forEach((exerciseName, index) => {
        setTimeout(() => {
          onFormDataChange({
            name: exerciseName.trim(),
            categoryId: formData.categoryId
          });
          onSave();
          
          // Close dialog after last exercise is saved
          if (index === exercises.length - 1) {
            onOpenChange(false);
            setGroupText(""); // Reset group text after saving
          }
        }, index * 100);
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {selectedExercise ? "ویرایش حرکت" : "افزودن حرکت جدید"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">دسته‌بندی</Label>
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
          
          <Tabs defaultValue="single" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">تکی</TabsTrigger>
              <TabsTrigger value="group">گروهی</TabsTrigger>
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
بک فلای
بک فلای تک
بک فلای متناوب"
                className="min-h-[150px] focus-visible:ring-blue-400"
                onChange={(e) => setGroupText(e.target.value)}
              />
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
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
