import { Button } from "@/components/ui/button";
import { Plus, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import { TypeDialog } from "@/components/exercises/TypeDialog";

const ExercisesPage = () => {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({ name: "" });
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", categoryId: 0 });
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const savedTypes = localStorage.getItem("exerciseTypes");
    const savedCategories = localStorage.getItem("exerciseCategories");
    const savedExercises = localStorage.getItem("exercises");

    if (savedTypes) {
      const types = JSON.parse(savedTypes);
      setExerciseTypes(types);
      if (types.length > 0) {
        setSelectedType(types[0]);
      }
    } else {
      setExerciseTypes(defaultExerciseTypes);
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
    }

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(defaultExercises);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exerciseTypes", JSON.stringify(exerciseTypes));
    localStorage.setItem("exerciseCategories", JSON.stringify(categories));
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exerciseTypes, categories, exercises]);

  const handleAddType = () => {
    setIsTypeDialogOpen(true);
    setNewTypeName("");
    setEditingType(null);
  };

  const handleEditType = (type: string) => {
    setIsTypeDialogOpen(true);
    setNewTypeName(type);
    setEditingType(type);
  };

  const handleSaveType = () => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع حرکت را وارد کنید"
      });
      return;
    }

    let updatedTypes: string[];
    if (editingType) {
      updatedTypes = exerciseTypes.map(type => 
        type === editingType ? newTypeName : type
      );
      
      const updatedCategories = categories.map(cat =>
        cat.type === editingType ? { ...cat, type: newTypeName } : cat
      );
      setCategories(updatedCategories);
      
      if (selectedType === editingType) {
        setSelectedType(newTypeName);
      }
    } else {
      if (exerciseTypes.includes(newTypeName)) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این نوع حرکت قبلاً اضافه شده است"
        });
        return;
      }
      updatedTypes = [...exerciseTypes, newTypeName];
    }

    setExerciseTypes(updatedTypes);
    setIsTypeDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: editingType 
        ? "نوع حرکت با موفقیت ویرایش شد"
        : "نوع حرکت جدید با موفقیت اضافه شد"
    });
  };

  const handleDeleteType = (type: string) => {
    if (categories.some(cat => cat.type === type)) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید تمام دسته‌بندی‌های این نوع حرکت را حذف کنید"
      });
      return;
    }

    const updatedTypes = exerciseTypes.filter(t => t !== type);
    setExerciseTypes(updatedTypes);

    if (selectedType === type && updatedTypes.length > 0) {
      setSelectedType(updatedTypes[0]);
    }

    toast({
      title: "موفقیت",
      description: "نوع حرکت با موفقیت حذف شد"
    });
  };

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

  const handleExerciseSave = async () => {
    if (selectedExercise) {
      setExercises(exercises.map(ex =>
        ex.id === selectedExercise.id
          ? { ...ex, ...exerciseFormData }
          : ex
      ));
      toast({
        title: "موفقیت",
        description: "حرکت با موفقیت ویرایش شد"
      });
    } else {
      const newExercise: Exercise = {
        id: Math.max(...exercises.map(ex => ex.id), 0) + 1,
        ...exerciseFormData
      };
      setExercises(prev => [...prev, newExercise]);
      toast({
        title: "موفقیت",
        description: "حرکت جدید با موفقیت اضافه شد"
      });
    }
    return Promise.resolve();
  };

  const handleDeleteSelected = (selectedIds: number[]) => {
    setExercises(exercises.filter(ex => !selectedIds.includes(ex.id)));
    toast({
      title: "موفقیت",
      description: selectedIds.length > 1 
        ? "حرکت‌های انتخاب شده با موفقیت حذف شدند" 
        : "حرکت با موفقیت حذف شد"
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">مدیریت حرکات تمرینی</h2>
      </div>

      <ExerciseTypes
        types={exerciseTypes}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        onAddType={handleAddType}
        onEditType={handleEditType}
        onDeleteType={handleDeleteType}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <CategoryTable 
          categories={filteredCategories}
          onAdd={() => setIsCategoryDialogOpen(true)}
          onEdit={(category) => {
            setCategoryFormData({ name: category.name });
            setIsCategoryDialogOpen(true);
          }}
          onDelete={(category) => {
            if (exercises.some(ex => ex.categoryId === category.id)) {
              toast({
                variant: "destructive",
                title: "خطا",
                description: "ابتدا باید تمام حرکات این دسته‌بندی را حذف کنید"
              });
              return;
            }
            setCategories(categories.filter(c => c.id !== category.id));
            toast({
              title: "موفقیت",
              description: "دسته‌بندی با موفقیت حذف شد"
            });
          }}
        />

        <ExerciseTable 
          exercises={filteredExercises}
          categories={categories}
          onAdd={() => {
            if (filteredCategories.length === 0) {
              toast({
                variant: "destructive",
                title: "خطا",
                description: "ابتدا باید یک دسته‌بندی ایجاد کنید"
              });
              return;
            }
            setSelectedExercise(undefined);
            setExerciseFormData({ name: "", categoryId: filteredCategories[0].id });
            setIsExerciseDialogOpen(true);
          }}
          onEdit={(exercise) => {
            setSelectedExercise(exercise);
            setExerciseFormData({
              name: exercise.name,
              categoryId: exercise.categoryId
            });
            setIsExerciseDialogOpen(true);
          }}
          onDelete={handleDeleteSelected}
          onSort={handleSort}
          isAscending={isAscending}
        />
      </div>

      <TypeDialog
        isOpen={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        typeName={newTypeName}
        onTypeNameChange={setNewTypeName}
        onSave={handleSaveType}
        isEditing={!!editingType}
      />

      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        exerciseTypes={exerciseTypes}
        selectedType={selectedType}
        formData={categoryFormData}
        onFormDataChange={setCategoryFormData}
        onTypeChange={setSelectedType}
        onSave={() => {
          if (!categoryFormData.name) {
            toast({
              variant: "destructive",
              title: "خطا",
              description: "لطفاً نام دسته‌بندی را وارد کنید"
            });
            return;
          }

          const newCategory: ExerciseCategory = {
            id: Math.max(...categories.map(c => c.id), 0) + 1,
            name: categoryFormData.name,
            type: selectedType
          };

          setCategories([...categories, newCategory]);
          setIsCategoryDialogOpen(false);
          toast({
            title: "موفقیت",
            description: "دسته‌بندی جدید با موفقیت اضافه شد"
          });
        }}
      />

      <ExerciseDialog
        isOpen={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        selectedExercise={selectedExercise}
        categories={filteredCategories}
        formData={exerciseFormData}
        onFormDataChange={setExerciseFormData}
        onSave={handleExerciseSave}
      />
    </div>
  );
};

export default ExercisesPage;
