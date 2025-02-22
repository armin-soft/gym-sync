
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Dumbbell, BarChart, Activity } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    id: 3,
    name: "جلو بازو لاری",
    muscleGroup: "بازو",
    equipment: "دمبل",
    description: "این حرکت برای تقویت عضلات جلو بازو مناسب است.",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "زیر بغل سیمکش",
    muscleGroup: "پشت",
    equipment: "دستگاه سیمکش",
    description: "حرکتی موثر برای عضلات پشت و تقویت عرض شانه‌ها.",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "پرس شانه دمبل",
    muscleGroup: "شانه",
    equipment: "دمبل",
    description: "حرکتی عالی برای رشد عضلات شانه و سرشانه.",
    image: "/placeholder.svg",
  },
];

const muscleGroups = [
  "همه",
  "سینه",
  "پشت",
  "پا",
  "شانه",
  "بازو",
  "ساعد",
  "شکم",
];

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("همه");

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
    setIsDialogOpen(false);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.includes(searchQuery) ||
      exercise.description.includes(searchQuery);
    const matchesMuscleGroup = selectedMuscleGroup === "همه" || 
      exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesMuscleGroup;
  });

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">حرکات تمرینی</h2>
              <Badge variant="secondary" className="rounded-full">
                {exercises.length} حرکت
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              در این بخش می‌توانید حرکات تمرینی را مدیریت کنید
            </p>
          </div>
          <Button 
            onClick={handleAdd} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن حرکت
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-5">
          <div className="relative md:col-span-3">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در حرکات..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedMuscleGroup}
            onValueChange={setSelectedMuscleGroup}
          >
            <SelectTrigger className="md:col-span-2">
              <SelectValue placeholder="گروه عضلانی" />
            </SelectTrigger>
            <SelectContent>
              {muscleGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Dumbbell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">تعداد حرکات</p>
              <p className="text-2xl font-bold">{exercises.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <BarChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">گروه‌های عضلانی</p>
              <p className="text-2xl font-bold">{muscleGroups.length - 1}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">حرکات فعال</p>
              <p className="text-2xl font-bold">{exercises.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">حرکتی یافت نشد</h3>
          <p className="text-muted-foreground mt-2">
            با معیارهای جستجوی فعلی حرکتی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </div>
      )}

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
