
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Exercise, defaultExercises } from "@/types/exercise";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ExerciseTable } from "@/components/exercises/ExerciseTable";

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", category: "دلتوئید خلفی" as Exercise["category"] });

  useEffect(() => {
    const savedExercises = localStorage.getItem("exercises");
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(defaultExercises);
      localStorage.setItem("exercises", JSON.stringify(defaultExercises));
    }
  }, []);

  const handleAdd = () => {
    setSelectedExercise(undefined);
    setFormData({ name: "", category: "دلتوئید خلفی" });
    setIsDialogOpen(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setFormData({ name: exercise.name, category: exercise.category });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    toast({
      title: "حرکت با موفقیت حذف شد",
      description: "حرکت مورد نظر از لیست حذف شد.",
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
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
          ? { ...exercise, ...formData }
          : exercise
      );
      toast({
        title: "حرکت ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      const newExercise = {
        ...formData,
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
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
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
            onClick={handleAdd} 
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </Card>
      </div>

      <ExerciseDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedExercise={selectedExercise}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Exercises;
