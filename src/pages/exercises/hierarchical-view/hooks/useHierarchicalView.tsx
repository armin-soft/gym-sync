
import { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ExerciseCategory } from "@/types/exercise";

interface UseHierarchicalViewProps {
  selectedType: string | null;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  setSelectedType: (type: string | null) => void;
  selectedCategoryId: number | null;
  filteredCategories: ExerciseCategory[];
  exercises: any[];
  handleDeleteCategory: (category: ExerciseCategory, exercises: any[]) => void;
  handleDeleteType: (type: string) => void;
}

export const useHierarchicalView = ({
  selectedType,
  selectedExerciseType,
  setSelectedExerciseType,
  setSelectedType,
  selectedCategoryId,
  filteredCategories,
  exercises,
  handleDeleteCategory,
  handleDeleteType,
}: UseHierarchicalViewProps) => {
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: "category" | "type", value: any} | null>(null);
  
  // همگام‌سازی بین حالت انتخاب شده در دو جا
  useEffect(() => {
    if (selectedType && selectedType !== selectedExerciseType) {
      console.log("Syncing selectedType to selectedExerciseType:", selectedType);
      setSelectedExerciseType(selectedType);
    } else if (selectedExerciseType && selectedExerciseType !== selectedType) {
      console.log("Syncing selectedExerciseType to selectedType:", selectedExerciseType);
      setSelectedType(selectedExerciseType);
    }
  }, [selectedType, selectedExerciseType, setSelectedExerciseType, setSelectedType]);

  // تنظیم حالت نمایش براساس اندازه صفحه
  useEffect(() => {
    if (deviceInfo.isMobile) {
      setViewMode("grid");
    }
  }, [deviceInfo.isMobile]);

  // عملیات‌های مورد نیاز برای افزودن/ویرایش دسته‌بندی
  const handleOpenCategoryDialog = () => {
    return {
      name: "",
      type: selectedType || ""
    };
  };

  const handleEditCategoryDialog = (category: ExerciseCategory) => {
    return {
      name: category.name,
      type: category.type
    };
  };

  // عملیات‌های مورد نیاز برای افزودن/ویرایش حرکت
  const handleOpenExerciseDialog = () => {
    return {
      name: "",
      categoryId: selectedCategoryId || 0
    };
  };

  const handleEditExercise = (exercise: any) => {
    return {
      name: exercise.name,
      categoryId: exercise.categoryId,
      ...exercise
    };
  };

  // تایید حذف آیتم
  const confirmDelete = (type: "category" | "type", value: any) => {
    setItemToDelete({ type, value });
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "category") {
      handleDeleteCategory(itemToDelete.value, exercises);
    } else if (itemToDelete.type === "type") {
      handleDeleteType(itemToDelete.value);
    }

    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  // هدایت کاربر در مسیر انتخاب سلسله مراتبی
  const getSelectionStage = (): "type" | "category" | "exercises" => {
    if (!selectedExerciseType) return "type";
    if (!selectedCategoryId && filteredCategories.length > 0) return "category";
    return "exercises";
  };

  const selectionStage = getSelectionStage();
  console.log("Current selection stage:", selectionStage, "Type:", selectedExerciseType, "Category:", selectedCategoryId);

  return {
    viewMode,
    setViewMode,
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    itemToDelete,
    setItemToDelete,
    selectionStage,
    handleOpenCategoryDialog,
    handleEditCategoryDialog,
    handleOpenExerciseDialog,
    handleEditExercise,
    confirmDelete,
    handleConfirmDelete,
  };
};
