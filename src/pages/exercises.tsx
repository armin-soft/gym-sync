import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ArrowUpDown, 
  Dumbbell, 
  Grip, 
  LayoutGrid,
  Activity, 
  GripHorizontal,
  Tag,
  FolderTree
} from "lucide-react";
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
import { toPersianNumbers } from "@/lib/utils/numbers";
import { PageContainer } from "@/components/ui/page-container";

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
    const loadData = () => {
      try {
        const savedTypes = localStorage.getItem("exerciseTypes");
        const savedCategories = localStorage.getItem("exerciseCategories");
        const savedExercises = localStorage.getItem("exercises");

        const types = savedTypes ? JSON.parse(savedTypes) : defaultExerciseTypes;
        const cats = savedCategories ? JSON.parse(savedCategories) : defaultCategories;
        const exs = savedExercises ? JSON.parse(savedExercises) : defaultExercises;

        setExerciseTypes(types);
        setCategories(cats);
        setExercises(exs);

        if (types.length > 0) {
          setSelectedType(types[0]);
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات"
        });
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("exerciseTypes", JSON.stringify(exerciseTypes));
      localStorage.setItem("exerciseCategories", JSON.stringify(categories));
      localStorage.setItem("exercises", JSON.stringify(exercises));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی اطلاعات"
      });
    }
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
      setSelectedType(newTypeName);
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
        description: "ابتدا باید تمام دسته بندی های این نوع حرکت را حذف کنید"
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
  const hasCategories = filteredCategories.length > 0;

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

  const handleExerciseSave = async (formData: { name: string; categoryId: number }) => {
    try {
      if (selectedExercise) {
        const updatedExercises = exercises.map(ex =>
          ex.id === selectedExercise.id ? { ...ex, ...formData } : ex
        );
        setExercises(updatedExercises);
        setIsExerciseDialogOpen(false);
        
        toast({
          title: "موفقیت",
          description: "حرکت با موفقیت ویرایش شد"
        });
      } else {
        const timestamp = Date.now();
        const newExercise: Exercise = {
          id: timestamp,
          ...formData
        };
        setExercises(prev => [...prev, newExercise]);
        setIsExerciseDialogOpen(false);
        
        toast({
          title: "موفقیت",
          description: "حرکت جدید با موفقیت اضافه شد"
        });
      }
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

  const handleDeleteExercises = (selectedIds: number[]) => {
    setExercises(prevExercises => prevExercises.filter(ex => !selectedIds.includes(ex.id)));
    toast({
      title: "موفقیت",
      description: selectedIds.length > 1 
        ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
        : "حرکت با موفقیت حذف شد"
    });
  };

  return (
    <PageContainer withBackground className="w-full h-full min-h-screen overflow-auto">
      <div className="w-full h-full container mx-auto py-10 space-y-12 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت حرکات تمرینی
              </h2>
              <p className="text-muted-foreground text-sm">
                مدیریت انواع، دسته بندی ها و حرکات تمرینی
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-xl">
                  <Tag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-muted-foreground">انواع حرکات</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {toPersianNumbers(exerciseTypes.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-xl">
                  <FolderTree className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-muted-foreground">دسته بندی ها</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {toPersianNumbers(categories.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-xl">
                  <Activity className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-muted-foreground">حرکات</p>
                  <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {toPersianNumbers(exercises.length)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-8">
          <ExerciseTypes
            types={exerciseTypes}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            onAddType={handleAddType}
            onEditType={handleEditType}
            onDeleteType={handleDeleteType}
          />
        </div>

        {exerciseTypes.length > 0 && (
          <div className="flex flex-col gap-8">
            <CategoryTable 
              categories={filteredCategories}
              onAdd={() => {
                if (exerciseTypes.length === 0) {
                  toast({
                    variant: "destructive",
                    title: "خطا",
                    description: "ابتدا باید یک نوع حرکت ایجاد کنید"
                  });
                  return;
                }
                setCategoryFormData({ name: "" });
                setIsCategoryDialogOpen(true);
              }}
              onEdit={(category) => {
                setCategoryFormData({ name: category.name });
                setIsCategoryDialogOpen(true);
              }}
              onDelete={(category) => {
                if (exercises.some(ex => ex.categoryId === category.id)) {
                  toast({
                    variant: "destructive",
                    title: "خطا",
                    description: "ابتدا باید تمام حرکات این دسته بندی را حذف کنید"
                  });
                  return;
                }
                setCategories(prevCategories => prevCategories.filter(c => c.id !== category.id));
                toast({
                  title: "موفقیت",
                  description: "دسته بندی با موفقیت حذف شد"
                });
              }}
            />

            {hasCategories && (
              <ExerciseTable 
                exercises={filteredExercises}
                categories={categories}
                onAdd={() => {
                  if (filteredCategories.length === 0) {
                    toast({
                      variant: "destructive",
                      title: "خطا",
                      description: "ابتدا باید یک دسته بندی ایجاد کنید"
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
                onDelete={handleDeleteExercises}
                onSort={handleSort}
                isAscending={isAscending}
              />
            )}
          </div>
        )}

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
                description: "لطفاً نام دسته بندی را وارد کنید"
              });
              return;
            }

            const newCategory: ExerciseCategory = {
              id: Math.max(0, ...categories.map(c => c.id)) + 1,
              name: categoryFormData.name,
              type: selectedType
            };

            setCategories(prevCategories => [...prevCategories, newCategory]);
            setIsCategoryDialogOpen(false);
            setCategoryFormData({ name: "" });
            
            toast({
              title: "موفقیت",
              description: "دسته بندی جدید با موفقیت اضافه شد"
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
    </PageContainer>
  );
};

export default ExercisesPage;
