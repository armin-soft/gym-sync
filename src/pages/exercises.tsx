
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Exercises = () => {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType>("سرشانه");
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
    const savedCategories = localStorage.getItem("categories");
    const savedExercises = localStorage.getItem("exercises");

    if (savedTypes) {
      const types = JSON.parse(savedTypes);
      setExerciseTypes(types);
      if (types.length > 0) {
        setSelectedType(types[0]);
      }
    } else {
      setExerciseTypes(defaultExerciseTypes);
      localStorage.setItem("exerciseTypes", JSON.stringify(defaultExerciseTypes));
    }

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
        title: "خطا",
        description: "لطفاً نام نوع حرکت را وارد کنید",
        variant: "destructive"
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
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      
      if (selectedType === editingType) {
        setSelectedType(newTypeName);
      }
    } else {
      if (exerciseTypes.includes(newTypeName)) {
        toast({
          title: "خطا",
          description: "این نوع حرکت قبلاً اضافه شده است",
          variant: "destructive"
        });
        return;
      }
      updatedTypes = [...exerciseTypes, newTypeName];
    }

    setExerciseTypes(updatedTypes);
    localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
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
        title: "خطا",
        description: "ابتدا باید تمام دسته‌بندی‌های این نوع حرکت را حذف کنید",
        variant: "destructive"
      });
      return;
    }

    const updatedTypes = exerciseTypes.filter(t => t !== type);
    setExerciseTypes(updatedTypes);
    localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));

    if (selectedType === type && updatedTypes.length > 0) {
      setSelectedType(updatedTypes[0]);
    }

    toast({
      title: "موفقیت",
      description: "نوع حرکت با موفقیت حذف شد"
    });
  };

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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">انواع حرکت</h3>
          <Button onClick={handleAddType} size="sm">
            <Plus className="w-4 h-4 ml-1" />
            افزودن نوع حرکت
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {exerciseTypes.map(type => (
            <div key={type} className="flex items-center gap-2 group">
              <Button
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
              <div className="hidden group-hover:flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditType(type);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteType(type);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

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

      <Dialog open={isTypeDialogOpen} onOpenChange={setIsTypeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {editingType ? "ویرایش نوع حرکت" : "افزودن نوع حرکت جدید"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-base">نام نوع حرکت</Label>
              <Input
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                placeholder="نام نوع حرکت را وارد کنید"
                className="h-11 text-base focus-visible:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsTypeDialogOpen(false)}
              className="hover:bg-muted/50 transition-colors"
            >
              انصراف
            </Button>
            <Button 
              onClick={handleSaveType}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
            >
              ذخیره
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exercises;
