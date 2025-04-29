
import { useState, useEffect, useCallback } from "react";
import { ExerciseType } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

export const useExerciseTypes = () => {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType>("");
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);

  // بارگذاری انواع حرکات از localStorage
  useEffect(() => {
    try {
      const savedTypes = localStorage.getItem("exerciseTypes");
      const types = savedTypes ? JSON.parse(savedTypes) : [];
      setExerciseTypes(types);
      
      if (types.length > 0) {
        setSelectedType(types[0]);
      }
    } catch (error) {
      console.error("Error loading exercise types from localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بارگذاری انواع حرکات"
      });
    }
  }, []);

  // ذخیره انواع حرکات در localStorage
  useEffect(() => {
    try {
      localStorage.setItem("exerciseTypes", JSON.stringify(exerciseTypes));
    } catch (error) {
      console.error("Error saving exercise types to localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی انواع حرکات"
      });
    }
  }, [exerciseTypes]);

  const handleAddType = useCallback(() => {
    setIsTypeDialogOpen(true);
    setNewTypeName("");
    setEditingType(null);
  }, []);

  const handleEditType = useCallback((type: string) => {
    setIsTypeDialogOpen(true);
    setNewTypeName(type);
    setEditingType(type);
  }, []);

  const handleSaveType = useCallback(() => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع حرکت را وارد کنید"
      });
      return;
    }

    // بررسی تکراری بودن نوع تمرین جدید
    const typeExists = exerciseTypes.some(type => 
      type.toLowerCase() === newTypeName.toLowerCase() && type !== editingType
    );
    
    if (typeExists) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "این نوع حرکت قبلاً اضافه شده است"
      });
      return;
    }

    let updatedTypes: string[];
    if (editingType) {
      updatedTypes = exerciseTypes.map(type => 
        type === editingType ? newTypeName : type
      );
      
      if (selectedType === editingType) {
        setSelectedType(newTypeName);
      }
    } else {
      updatedTypes = [...exerciseTypes, newTypeName];
      setSelectedType(newTypeName);
    }

    setExerciseTypes(updatedTypes);
    setIsTypeDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: editingType 
        ? "نوع حرکت با موفقیت ویرایش شد"
        : "نوع حرکت جدید با موفقیت اضافه شد"
    });
  }, [editingType, exerciseTypes, newTypeName, selectedType]);

  const handleDeleteType = useCallback((type: string) => {
    const updatedTypes = exerciseTypes.filter(t => t !== type);
    setExerciseTypes(updatedTypes);

    if (selectedType === type && updatedTypes.length > 0) {
      setSelectedType(updatedTypes[0]);
    }

    toast({
      title: "موفقیت",
      description: "نوع حرکت با موفقیت حذف شد"
    });
  }, [exerciseTypes, selectedType]);

  return {
    exerciseTypes,
    setExerciseTypes,
    selectedType,
    setSelectedType,
    isTypeDialogOpen,
    setIsTypeDialogOpen,
    newTypeName,
    setNewTypeName,
    editingType,
    setEditingType,
    handleAddType,
    handleEditType,
    handleSaveType,
    handleDeleteType
  };
};

export default useExerciseTypes;
