
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  image: string;
}

const mockExercises: Exercise[] = [
  {
    id: 1,
    name: "پرس سینه",
    muscleGroup: "سینه",
    equipment: "هالتر، نیمکت",
    description: "این حرکت برای تقویت عضلات سینه و سه‌سر بازو مناسب است.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "اسکوات",
    muscleGroup: "پا",
    equipment: "هالتر",
    description: "حرکت اسکوات یکی از بهترین حرکات برای تقویت عضلات پا است.",
    image: "/placeholder.svg",
  },
];

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
    toast({
      title: "حرکت با موفقیت حذف شد",
      description: "اطلاعات حرکت مورد نظر از سیستم حذف شد.",
    });
  };

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedExercise(undefined);
    setIsDialogOpen(true);
  };

  const handleSave = (data: Omit<Exercise, "id">) => {
    if (selectedExercise) {
      setExercises(
        exercises.map((e) =>
          e.id === selectedExercise.id ? { ...data, id: e.id } : e
        )
      );
      toast({
        title: "اطلاعات حرکت ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      const newExercise = {
        ...data,
        id: Math.max(...exercises.map((e) => e.id)) + 1,
      };
      setExercises([...exercises, newExercise]);
      toast({
        title: "حرکت جدید اضافه شد",
        description: "اطلاعات حرکت جدید با موفقیت ثبت شد.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">حرکات تمرینی</h2>
          <p className="text-muted-foreground">
            در این بخش می‌توانید حرکات تمرینی را مدیریت کنید
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="ml-2 h-4 w-4" /> افزودن حرکت
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ExerciseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        exercise={selectedExercise}
      />
    </div>
  );
};

export default Exercises;
