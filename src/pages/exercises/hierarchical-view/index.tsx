
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useHierarchicalView } from "./hooks/useHierarchicalView";
import { ContentStages } from "./components/ContentStages";
import TypeSelectionStage from "./components/TypeSelectionStage";
import CategoriesStage from "./components/CategoriesStage";
import ExercisesStage from "./components/ExercisesStage";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useQueryClient } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { PageContainer } from "@/components/ui/page-container";

const HierarchicalExercisesView = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { 
    currentStage, 
    selectedTypeId, 
    selectedCategoryId,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect
  } = useHierarchicalView();
  
  const { exerciseTypes, categories } = useExerciseData();
  
  // State for dialog management
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [categoryFormData, setCategoryFormData] = useState({ name: "", type: "" });
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<ExerciseCategory | null>(null);

  // Selected type and category data
  const selectedTypeName = selectedTypeId ? selectedTypeId : undefined;
  const selectedCategory = selectedCategoryId ? categories.find(cat => cat.id.toString() === selectedCategoryId) : undefined;
  
  // Handle add button click based on the current stage
  const handleAddClick = () => {
    if (currentStage === 'types') {
      setNewTypeName("");
      setEditingType(null);
      setIsTypeDialogOpen(true);
    } else if (currentStage === 'categories' && selectedTypeId) {
      setCategoryFormData({ name: "", type: selectedTypeId });
      setEditingCategory(null);
      setIsCategoryDialogOpen(true);
    } else {
      // Exercise stage will be handled within the component
    }
  };
  
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
      
      setIsTypeDialogOpen(false);
      setNewTypeName("");
      setEditingType(null);
    } catch (error) {
      console.error("Error saving exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی نوع تمرین"
      });
    }
  };
  
  // Handle save category
  const handleSaveCategory = async (data?: { name: string; type: string }) => {
    try {
      const formData = data || categoryFormData;
      
      if (!formData.name.trim() || !formData.type) {
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
          c.name.toLowerCase() === formData.name.toLowerCase() && 
          c.type === formData.type
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
            ? { ...c, name: formData.name, type: formData.type } 
            : c
        );
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ویرایش شد"
        });
      } else {
        // Check for duplicate names
        if (existingCategories.some(c => 
          c.name.toLowerCase() === formData.name.toLowerCase() && 
          c.type === formData.type
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
          name: formData.name,
          type: formData.type
        };
        
        updatedCategories = [...existingCategories, newCategory];
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }
      
      localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
      queryClient.setQueryData(["exerciseCategories"], updatedCategories);
      
      setIsCategoryDialogOpen(false);
      setCategoryFormData({ name: "", type: "" });
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی دسته‌بندی"
      });
    }
  };
  
  // Function to handle editing a type
  const handleEditType = (type: string) => {
    setNewTypeName(type);
    setEditingType(type);
    setIsTypeDialogOpen(true);
  };
  
  // Function to handle editing a category
  const handleEditCategory = (category: ExerciseCategory) => {
    setCategoryFormData({ name: category.name, type: category.type });
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };
  
  return (
    <PageContainer fullWidth>
      <div className="h-full flex flex-col p-4 md:p-6">
        {/* Content stages display */}
        <ContentStages 
          currentStage={currentStage} 
          selectedTypeName={selectedTypeName} 
          selectedCategoryName={selectedCategory?.name} 
          onAddClick={handleAddClick}
        />
        
        <Card className="flex-1 overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-indigo-50/30">
          <div className="h-full p-4 md:p-6 overflow-y-auto">
            {/* Render the appropriate stage based on the current state */}
            {currentStage === 'types' && (
              <TypeSelectionStage 
                onTypeSelect={handleTypeSelect} 
                onEditType={handleEditType} 
              />
            )}
            
            {currentStage === 'categories' && selectedTypeId && (
              <CategoriesStage 
                typeId={selectedTypeId} 
                onCategorySelect={handleCategorySelect} 
                onBack={handleBackToTypes} 
                onEditCategory={handleEditCategory}
              />
            )}
            
            {currentStage === 'exercises' && selectedTypeId && selectedCategoryId && (
              <ExercisesStage 
                typeId={selectedTypeId} 
                categoryId={selectedCategoryId} 
                onBack={handleBackToCategories} 
                onExerciseSelect={handleExerciseSelect} 
              />
            )}
          </div>
        </Card>
        
        {/* Type Dialog */}
        <TypeDialog
          isOpen={isTypeDialogOpen}
          onOpenChange={setIsTypeDialogOpen}
          typeName={newTypeName}
          onTypeNameChange={setNewTypeName}
          onSave={handleSaveType}
          isEditing={!!editingType}
        />
        
        {/* Category Dialog */}
        <CategoryDialog
          isOpen={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
          exerciseTypes={exerciseTypes}
          selectedType={categoryFormData.type || (selectedTypeId || exerciseTypes[0] || "")}
          formData={categoryFormData}
          onFormDataChange={setCategoryFormData}
          onTypeChange={(type) => setCategoryFormData(prev => ({ ...prev, type }))}
          onSave={handleSaveCategory}
        />
      </div>
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
