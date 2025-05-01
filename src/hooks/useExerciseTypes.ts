
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useExerciseTypes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);

  // بارگذاری اطلاعات از localStorage با استفاده از React Query
  const { data: exerciseTypes = [], isLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      try {
        console.log("Loading exercise types");
        const savedTypes = localStorage.getItem("exerciseTypes");
        if (!savedTypes) {
          console.log("No exercise types found in localStorage");
          return [];
        }
        const types = JSON.parse(savedTypes);
        console.log("Loaded exercise types:", types);
        return types;
      } catch (error) {
        console.error("Error loading exercise types from localStorage:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری انواع تمرین‌ها"
        });
        return [];
      }
    }
  });

  // تنظیم نوع انتخاب شده اولیه هنگامی که داده‌ها بارگذاری می‌شوند
  useEffect(() => {
    if (exerciseTypes.length > 0 && !selectedType) {
      console.log("Setting initial selected type:", exerciseTypes[0]);
      setSelectedType(exerciseTypes[0]);
    }
  }, [exerciseTypes, selectedType]);

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

    try {
      let updatedTypes;
      
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

        updatedTypes = [...exerciseTypes];
        const index = updatedTypes.indexOf(editingType);
        if (index !== -1) {
          updatedTypes[index] = newTypeName;
        }

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

        updatedTypes = [...exerciseTypes, newTypeName];
        
        // اگر هیچ نوعی انتخاب نشده باشد، نوع جدید را انتخاب کن
        if (selectedType === null) {
          setSelectedType(newTypeName);
        }
        
        toast({
          title: "موفقیت",
          description: "نوع جدید با موفقیت اضافه شد"
        });
      }

      // ذخیره در localStorage و به‌روزرسانی کش react-query
      localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
      queryClient.setQueryData(["exerciseTypes"], updatedTypes);
      
      setIsTypeDialogOpen(false);
      setEditingType(null);
      setNewTypeName("");
      
      console.log("Updated exercise types:", updatedTypes);
    } catch (error) {
      console.error("Error saving exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی نوع حرکت"
      });
    }
  }, [editingType, exerciseTypes, newTypeName, selectedType, queryClient, toast]);

  // حذف نوع
  const handleDeleteType = useCallback((type: string) => {
    try {
      const updatedTypes = exerciseTypes.filter(t => t !== type);
      
      // اگر نوع حذف شده، انتخاب شده بود، نوع انتخاب شده را به اولین نوع موجود تغییر بده
      if (selectedType === type) {
        if (updatedTypes.length > 0) {
          setSelectedType(updatedTypes[0]);
        } else {
          setSelectedType(null);
        }
      }
      
      // ذخیره در localStorage و به‌روزرسانی کش react-query
      localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
      queryClient.setQueryData(["exerciseTypes"], updatedTypes);
      
      toast({
        title: "موفقیت",
        description: "نوع حرکت با موفقیت حذف شد"
      });
      
      console.log("Updated exercise types after deletion:", updatedTypes);
    } catch (error) {
      console.error("Error deleting exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف نوع حرکت"
      });
    }
  }, [exerciseTypes, selectedType, queryClient, toast]);

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
    handleDeleteType,
    isLoading
  };
};

export default useExerciseTypes;
