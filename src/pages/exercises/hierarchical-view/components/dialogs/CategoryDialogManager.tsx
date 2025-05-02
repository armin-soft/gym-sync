
import React, { useState, useEffect } from "react";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { ExerciseCategory } from "@/types/exercise";

interface CategoryDialogManagerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: ExerciseCategory | null;
  selectedTypeId: string | null;
  onComplete: () => void;
}

export const CategoryDialogManager: React.FC<CategoryDialogManagerProps> = ({
  isOpen,
  onOpenChange,
  editingCategory,
  selectedTypeId,
  onComplete
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { exerciseTypes, categories } = useExerciseData();
  const [formData, setFormData] = useState({ name: "", type: selectedTypeId || "" });
  
  // Update form data when editing category or selected type changes
  useEffect(() => {
    if (editingCategory) {
      setFormData({ 
        name: editingCategory.name, 
        type: editingCategory.type 
      });
    } else {
      setFormData({ 
        name: "", 
        type: selectedTypeId || (exerciseTypes.length > 0 ? exerciseTypes[0] : "")
      });
    }
  }, [editingCategory, selectedTypeId, exerciseTypes, isOpen]);

  // Handle save category
  const handleSaveCategory = async (data?: { name: string; type: string }) => {
    try {
      const formToSave = data || formData;
      
      if (!formToSave.name.trim() || !formToSave.type) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "لطفاً نام دسته‌بندی و نوع تمرین را وارد کنید"
        });
        return;
      }
      
      let updatedCategories;
      const existingCategories = categories || [];
      
      if (editingCategory) {
        // Check for duplicate names except the editing one
        if (existingCategories.some(c => 
          c.id !== editingCategory.id && 
          c.name.toLowerCase() === formToSave.name.toLowerCase() && 
          c.type === formToSave.type
        )) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این دسته‌بندی قبلاً برای این نوع تمرین اضافه شده است"
          });
          return;
        }
        
        updatedCategories = existingCategories.map(c => 
          c.id === editingCategory.id 
            ? { ...c, name: formToSave.name, type: formToSave.type } 
            : c
        );
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ویرایش شد"
        });
      } else {
        // Check for duplicate names
        if (existingCategories.some(c => 
          c.name.toLowerCase() === formToSave.name.toLowerCase() && 
          c.type === formToSave.type
        )) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این دسته‌بندی قبلاً برای این نوع تمرین اضافه شده است"
          });
          return;
        }
        
        const newCategoryId = Date.now(); // Use timestamp as ID
        const newCategory: ExerciseCategory = {
          id: newCategoryId,
          name: formToSave.name,
          type: formToSave.type
        };
        
        updatedCategories = [...existingCategories, newCategory];
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }
      
      localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
      queryClient.setQueryData(["exerciseCategories"], updatedCategories);
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی دسته‌بندی"
      });
    }
  };

  return (
    <CategoryDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      exerciseTypes={exerciseTypes}
      selectedType={formData.type || (selectedTypeId || exerciseTypes[0] || "")}
      formData={formData}
      onFormDataChange={setFormData}
      onTypeChange={(type) => setFormData(prev => ({ ...prev, type }))}
      onSave={handleSaveCategory}
    />
  );
};
