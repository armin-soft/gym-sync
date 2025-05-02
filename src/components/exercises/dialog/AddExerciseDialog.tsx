
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { SingleExerciseForm } from "./SingleExerciseForm";
import { GroupExerciseForm } from "./GroupExerciseForm";
import { ExerciseFormActions } from "./ExerciseFormActions";

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
}: AddExerciseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[calc(100%-2rem)] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            افزودن حرکت جدید
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <Tabs 
            defaultValue="single" 
            className="w-full" 
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">تکی</TabsTrigger>
              <TabsTrigger value="group">چند حرکت</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single">
              <SingleExerciseForm 
                value={formData.name}
                onChange={(value) => onFormDataChange({ ...formData, name: value })}
                categories={categories}
                categoryId={formData.categoryId}
                onCategoryChange={(id) => onFormDataChange({ ...formData, categoryId: id })}
              />
            </TabsContent>
            
            <TabsContent value="group">
              <GroupExerciseForm 
                value={groupText}
                onChange={setGroupText}
                isSaving={isSaving}
                currentSaveIndex={currentSaveIndex}
                totalToSave={totalToSave}
                skippedExercises={skippedExercises}
              />
            </TabsContent>
          </Tabs>
        </div>
        <ExerciseFormActions
          onCancel={() => onOpenChange(false)}
          onSave={onSave}
          isSaving={isSaving}
          isDisabled={activeTab === "group" && !groupText.trim()}
        />
      </DialogContent>
    </Dialog>
  );
}
