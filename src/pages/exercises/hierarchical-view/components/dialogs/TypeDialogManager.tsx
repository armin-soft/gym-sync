
import React, { useState } from "react";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface TypeDialogManagerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingType: string | null;
  onComplete: () => void;
}

export const TypeDialogManager: React.FC<TypeDialogManagerProps> = ({
  isOpen,
  onOpenChange,
  editingType,
  onComplete
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { exerciseTypes, categories } = useExerciseData();
  const [newTypeName, setNewTypeName] = useState("");
  
  // Set initial type name when editing
  React.useEffect(() => {
    if (editingType) {
      setNewTypeName(editingType);
    } else {
      setNewTypeName("");
    }
  }, [editingType, isOpen]);

  // Handle save type
  const handleSaveType = async () => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع تمرین را وارد کنید"
      });
      return;
    }
    
    try {
      let updatedTypes;
      const existingTypes = exerciseTypes || [];
      
      if (editingType) {
        // Check for duplicate names except the editing one
        if (existingTypes.some(t => t !== editingType && t.toLowerCase() === newTypeName.toLowerCase())) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این نوع تمرین قبلاً اضافه شده است"
          });
          return;
        }
        
        updatedTypes = existingTypes.map(t => t === editingType ? newTypeName : t);
        
        toast({
          title: "موفقیت",
          description: "نوع تمرین با موفقیت ویرایش شد"
        });
      } else {
        // Check for duplicate names
        if (existingTypes.some(t => t.toLowerCase() === newTypeName.toLowerCase())) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این نوع تمرین قبلاً اضافه شده است"
          });
          return;
        }
        
        updatedTypes = [...existingTypes, newTypeName];
        
        toast({
          title: "موفقیت",
          description: "نوع تمرین جدید با موفقیت اضافه شد"
        });
      }
      
      localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
      queryClient.setQueryData(["exerciseTypes"], updatedTypes);
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error saving exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی نوع تمرین"
      });
    }
  };

  return (
    <TypeDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      typeName={newTypeName}
      onTypeNameChange={setNewTypeName}
      onSave={handleSaveType}
      isEditing={!!editingType}
    />
  );
};
