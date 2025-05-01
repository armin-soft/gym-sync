
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { defaultExerciseTypes } from "@/types/exercise";

export const useExerciseTypes = () => {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);

  // بارگذاری اطلاعات از localStorage
  useEffect(() => {
    try {
      const savedTypes = localStorage.getItem("exerciseTypes");
      if (!savedTypes || savedTypes === "[]") {
        // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
        setExerciseTypes(defaultExerciseTypes);
        localStorage.setItem("exerciseTypes", JSON.stringify(defaultExerciseTypes));
        if (defaultExerciseTypes.length > 0) {
          setSelectedType(defaultExerciseTypes[0]);
        }
      } else {
        const types = JSON.parse(savedTypes);
        setExerciseTypes(types);
        if (types.length > 0) {
          setSelectedType(types[0]);
        }
      }
    } catch (error) {
      console.error("Error loading exercise types from localStorage:", error);
    }
  }, []);

  // ذخیره اطلاعات در localStorage
  useEffect(() => {
    try {
      localStorage.setItem("exerciseTypes", JSON.stringify(exerciseTypes));
    } catch (error) {
      console.error("Error saving exercise types to localStorage:", error);
    }
  }, [exerciseTypes]);

  // افزودن نوع جدید
  const handleAddType = useCallback(() => {
    setEditingType(null);
    setNewTypeName("");
    setIsTypeDialogOpen(true);
  }, []);

  // ویرایش نوع موجود
  const handleEditType = useCallback((type: string) => {
    setEditingType(type);
    setNewTypeName(type);
    setIsTypeDialogOpen(true);
  }, []);

  // ذخیره نوع جدید یا ویرایش شده
  const handleSaveType = useCallback(() => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع را وارد کنید"
      });
      return;
    }

    if (editingType) {
      // ویرایش نوع موجود
      if (exerciseTypes.includes(newTypeName) && newTypeName !== editingType) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این نوع قبلاً اضافه شده است"
        });
        return;
      }

      setExerciseTypes(prevTypes => {
        const newTypes = [...prevTypes];
        const index = newTypes.indexOf(editingType);
        if (index !== -1) {
          newTypes[index] = newTypeName;
        }
        return newTypes;
      });

      if (selectedType === editingType) {
        setSelectedType(newTypeName);
      }

      toast({
        title: "موفقیت",
        description: "نوع حرکت با موفقیت ویرایش شد"
      });
    } else {
      // افزودن نوع جدید
      if (exerciseTypes.includes(newTypeName)) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این نوع قبلاً اضافه شده است"
        });
        return;
      }

      setExerciseTypes(prev => [...prev, newTypeName]);
      
      // اگر هیچ نوعی انتخاب نشده باشد، نوع جدید را انتخاب کن
      if (selectedType === null) {
        setSelectedType(newTypeName);
      }
      
      toast({
        title: "موفقیت",
        description: "نوع جدید با موفقیت اضافه شد"
      });
    }

    setIsTypeDialogOpen(false);
    setEditingType(null);
    setNewTypeName("");
  }, [editingType, exerciseTypes, newTypeName, selectedType]);

  // حذف نوع
  const handleDeleteType = useCallback((type: string) => {
    setExerciseTypes(prev => prev.filter(t => t !== type));
    
    // اگر نوع حذف شده، انتخاب شده بود، نوع انتخاب شده را به اولین نوع موجود تغییر بده
    if (selectedType === type) {
      const remainingTypes = exerciseTypes.filter(t => t !== type);
      if (remainingTypes.length > 0) {
        setSelectedType(remainingTypes[0]);
      } else {
        setSelectedType(null);
      }
    }
    
    toast({
      title: "موفقیت",
      description: "نوع حرکت با موفقیت حذف شد"
    });
  }, [exerciseTypes, selectedType]);

  return {
    exerciseTypes,
    selectedType,
    setSelectedType,
    isTypeDialogOpen,
    setIsTypeDialogOpen,
    newTypeName,
    setNewTypeName,
    editingType,
    handleAddType,
    handleEditType,
    handleSaveType,
    handleDeleteType
  };
};

export default useExerciseTypes;
