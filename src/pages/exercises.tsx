
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Exercise, ExerciseCategory, defaultExercises, defaultCategories } from "@/types/exercise";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ExerciseTable } from "@/components/exercises/ExerciseTable";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { CategoryTable } from "@/components/exercises/CategoryTable";

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | undefined>();
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", category: "دلتوئید خلفی" as ExerciseCategory });
  const [categoryFormData, setCategoryFormData] = useState({ name: "" });

  useEffect(() => {
    // Load exercises
    const savedExercises = localStorage.getItem("exercises");
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(defaultExercises);
      localStorage.setItem("exercises", JSON.stringify(defaultExercises));
    }

    // Load categories
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem("categories", JSON.stringify(defaultCategories));
    }
  }, []);

  // Exercise handlers
  const handleAddExercise = () => {
    setSelectedExercise(undefined);
    setExerciseFormData({ name: "", category: categories[0] || "دلتوئید خلفی" });
    setIsExerciseDialogOpen(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseFormData({ name: exercise.name, category: exercise.category });
    setIsExerciseDialogOpen(true);
  };

  const handleDeleteExercise = (id: number) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    toast({
      title: "حرکت با موفقیت حذف شد",
      description: "حرکت مورد نظر از لیست حذف شد.",
    });
  };

  const handleSaveExercise = () => {
    if (!exerciseFormData.name.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    let updatedExercises: Exercise[];
    
    if (selectedExercise) {
      updatedExercises = exercises.map((exercise) =>
        exercise.id === selectedExercise.id
          ? { ...exercise, ...exerciseFormData }
          : exercise
      );
      toast({
        title: "حرکت ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      const newExercise = {
        ...exerciseFormData,
        id: Math.max(...exercises.map((e) => e.id), 0) + 1,
      };
      updatedExercises = [...exercises, newExercise];
      toast({
        title: "حرکت جدید اضافه شد",
        description: "حرکت جدید با موفقیت به لیست اضافه شد.",
      });
    }

    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    setIsExerciseDialogOpen(false);
  };

  // Category handlers
  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    setCategoryFormData({ name: "" });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: ExerciseCategory) => {
    setSelectedCategory(category);
    setCategoryFormData({ name: category });
    setIsCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category: ExerciseCategory) => {
    // Check if category is being used by any exercise
    const isUsed = exercises.some((exercise) => exercise.category === category);
    if (isUsed) {
      toast({
        title: "خطا",
        description: "این دسته‌بندی در حال استفاده است و نمی‌تواند حذف شود.",
        variant: "destructive",
      });
      return;
    }

    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast({
      title: "دسته‌بندی با موفقیت حذف شد",
      description: "دسته‌بندی مورد نظر از لیست حذف شد.",
    });
  };

  const handleSaveCategory = () => {
    if (!categoryFormData.name.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً نام دسته‌بندی را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    let updatedCategories: ExerciseCategory[];
    const newCategory = categoryFormData.name as ExerciseCategory;
    
    if (selectedCategory) {
      // Update exercises with old category
      const updatedExercises = exercises.map((exercise) =>
        exercise.category === selectedCategory
          ? { ...exercise, category: newCategory }
          : exercise
      );
      setExercises(updatedExercises);
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));

      // Update category
      updatedCategories = categories.map((c) =>
        c === selectedCategory ? newCategory : c
      );
      toast({
        title: "دسته‌بندی ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      if (categories.includes(newCategory)) {
        toast({
          title: "خطا",
          description: "این دسته‌بندی قبلاً اضافه شده است.",
          variant: "destructive",
        });
        return;
      }
      updatedCategories = [...categories, newCategory];
      toast({
        title: "دسته‌بندی جدید اضافه شد",
        description: "دسته‌بندی جدید با موفقیت به لیست اضافه شد.",
      });
    }

    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setIsCategoryDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-8">
        {/* Categories Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                دسته‌بندی‌های سرشانه
              </h2>
              <p className="text-muted-foreground">
                مدیریت دسته‌بندی‌های تمرینی بخش سرشانه
              </p>
            </div>
            <Button 
              onClick={handleAddCategory} 
              className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-200/50"
            >
              <Plus className="ml-2 h-5 w-5 animate-pulse" />
              افزودن دسته‌بندی جدید
            </Button>
          </div>

          <Card className="overflow-hidden border-t-4 border-t-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="overflow-x-auto">
              <CategoryTable 
                categories={categories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            </div>
          </Card>
        </div>

        {/* Exercises Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                حرکات سرشانه
              </h2>
              <p className="text-muted-foreground">
                مدیریت حرکات تمرینی بخش سرشانه
              </p>
            </div>
            <Button 
              onClick={handleAddExercise} 
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-200/50"
            >
              <Plus className="ml-2 h-5 w-5 animate-pulse" />
              افزودن حرکت جدید
            </Button>
          </div>

          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="overflow-x-auto">
              <ExerciseTable 
                exercises={exercises}
                onEdit={handleEditExercise}
                onDelete={handleDeleteExercise}
              />
            </div>
          </Card>
        </div>
      </div>

      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        selectedCategory={selectedCategory}
        formData={categoryFormData}
        onFormDataChange={setCategoryFormData}
        onSave={handleSaveCategory}
      />

      <ExerciseDialog 
        isOpen={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        selectedExercise={selectedExercise}
        formData={exerciseFormData}
        onFormDataChange={setExerciseFormData}
        onSave={handleSaveExercise}
      />
    </div>
  );
};

export default Exercises;
