
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpeechToText } from "@/components/ui/speech-to-text";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface EditExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: any;
  categories: any[];
}

export const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
  isOpen,
  onClose,
  exercise,
  categories
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetMuscle: "",
    categoryId: ""
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name || "",
        description: exercise.description || "",
        targetMuscle: exercise.targetMuscle || "",
        categoryId: exercise.categoryId?.toString() || ""
      });
    }
  }, [exercise]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید"
      });
      return;
    }

    if (!formData.categoryId) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً دسته‌بندی را انتخاب کنید"
      });
      return;
    }

    try {
      const exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
      const updatedExercises = exercises.map((ex: any) => 
        ex.id === exercise.id 
          ? { 
              ...ex, 
              name: formData.name.trim(),
              description: formData.description.trim(),
              targetMuscle: formData.targetMuscle.trim(),
              categoryId: parseInt(formData.categoryId)
            }
          : ex
      );
      
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: "موفقیت",
        description: "حرکت با موفقیت ویرایش شد"
      });
      
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ویرایش حرکت"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">ویرایش حرکت تمرینی</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-right block mb-2">نام حرکت</Label>
            <SpeechToText
              value={formData.name}
              onTranscriptChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              placeholder="نام حرکت را وارد کنید..."
              className="compact-speech"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-right block mb-2">دسته‌بندی</Label>
            <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-right block mb-2">توضیحات</Label>
            <SpeechToText
              value={formData.description}
              onTranscriptChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="توضیحات حرکت..."
              className="compact-speech"
            />
          </div>

          <div>
            <Label htmlFor="targetMuscle" className="text-right block mb-2">عضله هدف</Label>
            <SpeechToText
              value={formData.targetMuscle}
              onTranscriptChange={(value) => setFormData(prev => ({ ...prev, targetMuscle: value }))}
              placeholder="عضله هدف..."
              className="compact-speech"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600">
              ذخیره تغییرات
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
