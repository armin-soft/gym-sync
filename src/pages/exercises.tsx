
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { 
  Exercise, 
  ExerciseCategory, 
  ExerciseType,
  defaultExercises, 
  defaultCategories,
  defaultExerciseTypes
} from "@/types/exercise";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseTable } from "@/components/exercises/ExerciseTable";
import { CategoryTable } from "@/components/exercises/CategoryTable";

const Exercises = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<ExerciseType>("سرشانه");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: "" });
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", categoryId: 0 });
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    const savedExercises = localStorage.getItem("exercises");

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem("categories", JSON.stringify(defaultCategories));
    }

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(defaultExercises);
      localStorage.setItem("exercises", JSON.stringify(defaultExercises));
    }
  }, []);

  const filteredCategories = categories.filter(cat => cat.type === selectedType);

  const filteredExercises = exercises
    .filter(ex => filteredCategories.some(cat => cat.id === ex.categoryId))
    .sort((a, b) => {
      if (isAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  const handleAddCategory = () => {
    setIsCategoryDialogOpen(true);
    setCategoryFormData({ name: "" });
  };

  const handleEditCategory = (category: ExerciseCategory) => {
    setIsCategoryDialogOpen(true);
    setCategoryFormData({ name: category.name });
  };

  const handleSaveCategory = () => {
    if (!categoryFormData.name) {
      toast({
        title: "خطا",
        description: "لطفاً نام دسته‌بندی را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    const newCategory: ExerciseCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: categoryFormData.name,
      type: selectedType
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setIsCategoryDialogOpen(false);

    toast({
      title: "موفقیت",
      description: "دسته‌بندی جدید با موفقیت اضافه شد"
    });
  };

  const handleDeleteCategory = (category: ExerciseCategory) => {
    if (exercises.some(ex => ex.categoryId === category.id)) {
      toast({
        title: "خطا",
        description: "ابتدا باید تمام حرکات این دسته‌بندی را حذف کنید",
        variant: "destructive"
      });
      return;
    }

    const updatedCategories = categories.filter(c => c.id !== category.id);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    toast({
      title: "موفقیت",
      description: "دسته‌بندی با موفقیت حذف شد"
    });
  };

  // Exercise handlers
  const handleAddExercise = () => {
    if (filteredCategories.length === 0) {
      toast({
        title: "خطا",
        description: "ابتدا باید یک دسته‌بندی ایجاد کنید",
        variant: "destructive"
      });
      return;
    }

    setIsExerciseDialogOpen(true);
    setSelectedExercise(undefined);
    setExerciseFormData({ name: "", categoryId: filteredCategories[0].id });
  };

  const handleEditExercise = (exercise: Exercise) => {
    setIsExerciseDialogOpen(true);
    setSelectedExercise(exercise);
    setExerciseFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
  };

  const handleSaveExercise = () => {
    if (!exerciseFormData.name) {
      toast({
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    let updatedExercises: Exercise[];

    if (selectedExercise) {
      updatedExercises = exercises.map(ex =>
        ex.id === selectedExercise.id
          ? { ...ex, ...exerciseFormData }
          : ex
      );
    } else {
      const newExercise: Exercise = {
        id: Math.max(...exercises.map(ex => ex.id), 0) + 1,
        ...exerciseFormData
      };
      updatedExercises = [...exercises, newExercise];
    }

    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    setIsExerciseDialogOpen(false);

    toast({
      title: "موفقیت",
      description: selectedExercise
        ? "حرکت با موفقیت ویرایش شد"
        : "حرکت جدید با موفقیت اضافه شد"
    });
  };

  const handleDeleteExercise = (exerciseId: number) => {
    const updatedExercises = exercises.filter(ex => ex.id !== exerciseId);
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));

    toast({
      title: "موفقیت",
      description: "حرکت با موفقیت حذف شد"
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-4">
        {defaultExerciseTypes.map(type => (
          <Button
            key={type}
            onClick={() => setSelectedType(type)}
            variant={selectedType === type ? "default" : "outline"}
            className={`min-w-max ${
              selectedType === type 
                ? "bg-gradient-to-r from-blue-600 to-blue-400" 
                : ""
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">دسته‌بندی‌های {selectedType}</h3>
            <Button onClick={handleAddCategory} size="sm">
              <Plus className="w-4 h-4 ml-1" />
              افزودن دسته‌بندی
            </Button>
          </div>
          <Card className="p-4">
            <div className="overflow-x-auto">
              <CategoryTable 
                categories={filteredCategories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">حرکات {selectedType}</h3>
            <Button onClick={handleAddExercise} size="sm">
              <Plus className="w-4 h-4 ml-1" />
              افزودن حرکت
            </Button>
          </div>
          <Card className="p-4">
            <div className="overflow-x-auto">
              <ExerciseTable 
                exercises={filteredExercises}
                categories={categories}
                onSort={handleSort}
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
        selectedType={selectedType}
        formData={categoryFormData}
        onFormDataChange={setCategoryFormData}
        onSave={handleSaveCategory}
      />

      <ExerciseDialog
        isOpen={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        selectedExercise={selectedExercise}
        categories={filteredCategories}
        formData={exerciseFormData}
        onFormDataChange={setExerciseFormData}
        onSave={handleSaveExercise}
      />
    </div>
  );
};

export default Exercises;
