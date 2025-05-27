
import React, { useEffect } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SingleExerciseForm } from "./SingleExerciseForm";
import { GroupExerciseForm } from "./GroupExerciseForm";
import { ExerciseFormActions } from "./ExerciseFormActions";
import { motion, AnimatePresence } from "framer-motion";
import { ExerciseCategory } from "@/types/exercise";

interface AddExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: () => void;
  isSaving: boolean;
  groupText: string;
  setGroupText: (text: string) => void;
  currentSaveIndex: number;
  totalToSave: number;
  skippedExercises: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  preselectedCategoryId?: number; // اضافه کردن پراپ جدید
}

export function AddExerciseDialog({
  isOpen,
  onOpenChange,
  categories,
  formData,
  onFormDataChange,
  onSave,
  isSaving,
  groupText,
  setGroupText,
  currentSaveIndex,
  totalToSave,
  skippedExercises,
  activeTab,
  setActiveTab,
  preselectedCategoryId,
}: AddExerciseDialogProps) {
  
  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      const defaultCategoryId = preselectedCategoryId || (categories.length > 0 ? categories[0].id : 0);
      onFormDataChange({ 
        name: "", 
        categoryId: defaultCategoryId
      });
      setGroupText("");
    }
  }, [isOpen, categories, onFormDataChange, setGroupText, preselectedCategoryId]);

  const handleClose = () => {
    if (!isSaving) {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-w-[calc(100%-2rem)] mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-indigo-100/50 dark:border-indigo-900/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            افزودن حرکت جدید
          </DialogTitle>
          <DialogClose className="absolute top-2 right-2" />
        </DialogHeader>
        
        <div className="space-y-6 py-4 text-right">
          <Tabs 
            defaultValue="single" 
            className="w-full" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="single"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                افزودن تکی
              </TabsTrigger>
              <TabsTrigger 
                value="group"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                افزودن گروهی
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent 
                value="single" 
                className="mt-0 border-0 p-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SingleExerciseForm
                    value={formData.name}
                    onChange={(value) => onFormDataChange({ ...formData, name: value })}
                    categories={categories}
                    categoryId={formData.categoryId}
                    onCategoryChange={(id) => onFormDataChange({ ...formData, categoryId: id })}
                    preselectedCategoryId={preselectedCategoryId}
                  />
                </motion.div>
              </TabsContent>
              
              <TabsContent 
                value="group" 
                className="mt-0 border-0 p-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      دسته‌بندی انتخاب شده: <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {categories.find(c => c.id === formData.categoryId)?.name}
                      </span>
                      {preselectedCategoryId && (
                        <span className="text-green-600 dark:text-green-400 mr-2">
                          (خودکار انتخاب شده)
                        </span>
                      )}
                    </p>
                    <select
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow text-right"
                      value={formData.categoryId}
                      onChange={(e) => onFormDataChange({ ...formData, categoryId: Number(e.target.value) })}
                      dir="rtl"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <GroupExerciseForm
                    value={groupText}
                    onChange={setGroupText}
                    isSaving={isSaving}
                    currentSaveIndex={currentSaveIndex}
                    totalToSave={totalToSave}
                    skippedExercises={skippedExercises}
                  />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
          
          <ExerciseFormActions
            onCancel={handleClose}
            onSave={onSave}
            isSaving={isSaving}
            isDisabled={
              activeTab === "single" 
                ? formData.name.trim() === "" 
                : groupText.trim() === ""
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddExerciseDialog;
