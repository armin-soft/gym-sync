
import React, { useState, useEffect } from "react";
import { Dumbbell, Plus, Grid3X3, ListOrdered, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
  onBack: () => void;
  onExerciseSelect: (exerciseId: string) => void;
}

export const ExercisesStage: React.FC<ExercisesStageProps> = ({
  categoryId,
  typeId,
  onBack,
  onExerciseSelect
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { exercises, categories, isLoading } = useExerciseData();
  
  // State برای مدیریت دیالوگ‌ها
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", categoryId: parseInt(categoryId) || 0 });

  useEffect(() => {
    setFormData(prev => ({ ...prev, categoryId: parseInt(categoryId) || 0 }));
  }, [categoryId]);
  
  // فیلتر کردن تمرین‌ها بر اساس دسته‌بندی انتخاب شده
  const filteredExercises = exercises.filter(ex => ex.categoryId.toString() === categoryId);
  
  // حذف تمرین‌ها
  const handleDeleteExercises = () => {
    try {
      const updatedExercises = exercises.filter(ex => !selectedExerciseIds.includes(ex.id));
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: "موفقیت",
        description: selectedExerciseIds.length > 1 
          ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
          : "حرکت با موفقیت حذف شد"
      });
      
      setSelectedExerciseIds([]);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting exercises:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف حرکت‌ها"
      });
    }
  };

  // ذخیره تمرین جدید یا ویرایش شده
  const handleSaveExercise = async (data: { name: string; categoryId: number }) => {
    try {
      // بررسی تکراری بودن نام حرکت
      const exerciseExists = exercises.some(ex => 
        ex.name.toLowerCase() === data.name.toLowerCase() && 
        (selectedExercise ? ex.id !== selectedExercise.id : true)
      );
      
      if (exerciseExists) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این حرکت قبلاً اضافه شده است"
        });
        return Promise.reject("نام تکراری");
      }

      let updatedExercises;
      
      if (selectedExercise) {
        // ویرایش حرکت موجود
        updatedExercises = exercises.map(ex =>
          ex.id === selectedExercise.id ? { ...ex, ...data } : ex
        );
        
        toast({
          title: "موفقیت",
          description: "حرکت با موفقیت ویرایش شد"
        });
      } else {
        // افزودن حرکت جدید
        const timestamp = Date.now();
        const newExercise: Exercise = {
          id: timestamp,
          ...data
        };
        updatedExercises = [...exercises, newExercise];
        
        toast({
          title: "موفقیت",
          description: "حرکت جدید با موفقیت اضافه شد"
        });
      }
      
      // ذخیره در localStorage و به‌روزرسانی کش react-query
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      setIsAddDialogOpen(false);
      setSelectedExercise(undefined);
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی حرکت"
      });
      return Promise.reject(error);
    }
  };

  // ویرایش تمرین
  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    setIsAddDialogOpen(true);
  };

  // افزودن تمرین جدید
  const handleAddExercise = () => {
    setSelectedExercise(undefined);
    setFormData({
      name: "",
      categoryId: parseInt(categoryId) || 0
    });
    setIsAddDialogOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری تمرین‌ها...</p>
        </div>
      </div>
    );
  }

  // پیدا کردن دسته‌بندی انتخاب شده
  const selectedCategory = categories.find(cat => cat.id.toString() === categoryId);

  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          بازگشت به دسته‌بندی‌ها
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            حرکات تمرینی ({toPersianNumbers(filteredExercises.length)})
          </h3>
          
          {selectedExerciseIds.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="mr-2"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              حذف ({toPersianNumbers(selectedExerciseIds.length)})
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleAddExercise}
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            افزودن حرکت
          </Button>
          
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <ListOrdered className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className={`grid gap-3 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
              : "grid-cols-1"
          }`}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => {
              const isSelected = selectedExerciseIds.includes(exercise.id);
              
              return (
                <motion.div 
                  key={exercise.id} 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <ExerciseCard 
                    exercise={exercise}
                    category={selectedCategory}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => {
                      setSelectedExerciseIds(prev => 
                        isSelected 
                          ? prev.filter(id => id !== exercise.id)
                          : [...prev, exercise.id]
                      );
                    }}
                    onEdit={() => handleEditExercise(exercise)}
                    onDelete={() => {
                      setSelectedExerciseIds([exercise.id]);
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                در این دسته‌بندی هنوز حرکتی تعریف نشده است.
              </p>
              <Button 
                onClick={handleAddExercise}
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
              >
                <Plus className="h-4 w-4 ml-2" />
                افزودن حرکت جدید
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* دیالوگ افزودن/ویرایش تمرین */}
      <ExerciseDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        categories={categories}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSaveExercise}
        isEditing={!!selectedExercise}
      />

      {/* دیالوگ تایید حذف */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteExercises}
        title="حذف حرکت"
        description={
          selectedExerciseIds.length > 1
            ? `آیا از حذف ${toPersianNumbers(selectedExerciseIds.length)} حرکت انتخاب شده اطمینان دارید؟`
            : "آیا از حذف این حرکت اطمینان دارید؟"
        }
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </motion.div>
  );
};

export default ExercisesStage;
