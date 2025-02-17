
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  category: string;
  sets: string;
  reps: string;
  description: string;
}

const initialExercises: Exercise[] = [
  {
    id: 1,
    name: "نشر از جلو",
    category: "سرشانه",
    sets: "۳",
    reps: "۱۲",
    description: "با دمبل از جلو شانه‌ها را بالا می‌بریم",
  },
  {
    id: 2,
    name: "نشر از طرفین",
    category: "سرشانه",
    sets: "۴",
    reps: "۱۰",
    description: "با دمبل از طرفین شانه‌ها را بالا می‌بریم",
  },
];

const categories = [
  "سرشانه",
  "سینه",
  "پشت",
  "بازو",
  "ساعد",
  "پا",
  "شکم",
];

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [selectedCategory, setSelectedCategory] = useState<string>("سرشانه");

  const filteredExercises = exercises.filter(
    (exercise) => exercise.category === selectedCategory
  );

  const handleDelete = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
    toast({
      title: "حذف حرکت",
      description: "حرکت مورد نظر با موفقیت حذف شد.",
    });
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
        <Button>
          <Plus className="ml-2 h-4 w-4" /> افزودن حرکت
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">فیلتر بر اساس گروه عضلانی</h3>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="انتخاب گروه عضلانی" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام حرکت</TableHead>
                <TableHead>گروه عضلانی</TableHead>
                <TableHead>تعداد ست</TableHead>
                <TableHead>تعداد تکرار</TableHead>
                <TableHead>توضیحات</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.category}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {exercise.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(exercise.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Exercises;
