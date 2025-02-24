
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Exercise {
  id: number;
  name: string;
  category: "دلتوئید خلفی" | "دلتوئید جلویی";
}

// حرکات پیش‌فرض سرشانه
const defaultExercises: Exercise[] = [
  // دلتوئید خلفی
  { id: 1, name: "بک فلای", category: "دلتوئید خلفی" },
  { id: 2, name: "بک فلای تک", category: "دلتوئید خلفی" },
  { id: 3, name: "بک فلای متناوب", category: "دلتوئید خلفی" },
  { id: 4, name: "نشر خم سیم کش تک", category: "دلتوئید خلفی" },
  { id: 5, name: "نشر خم سیم کش جفت", category: "دلتوئید خلفی" },
  { id: 6, name: "نشر سیم کش موازی ضربدری (فلای بک سیم کش)", category: "دلتوئید خلفی" },
  // ... و بقیه حرکات دلتوئید خلفی

  // دلتوئید جلویی
  { id: 30, name: "نشر از جلو سیم کش", category: "دلتوئید جلویی" },
  { id: 31, name: "نشر از جلو سیم کش مچ برعکس", category: "دلتوئید جلویی" },
  { id: 32, name: "نشر از جلو سیم کش طنابی", category: "دلتوئید جلویی" },
  { id: 33, name: "نشر از جلو سیم کش طنابی تک", category: "دلتوئید جلویی" },
  // ... و بقیه حرکات دلتوئید جلویی
];

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", category: "دلتوئید خلفی" as Exercise["category"] });

  // خواندن حرکات از localStorage یا استفاده از حرکات پیش‌فرض
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
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">حرکات سرشانه</h2>
            <p className="text-muted-foreground mt-2">
              مدیریت حرکات تمرینی بخش سرشانه
            </p>
          </div>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="ml-2 h-4 w-4" />
            افزودن حرکت
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نوع حرکت</TableHead>
                <TableHead>نام حرکت</TableHead>
                <TableHead className="w-28">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    هیچ حرکتی ثبت نشده است
                  </TableCell>
                </TableRow>
              ) : (
                exercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell className="font-medium">{exercise.category}</TableCell>
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(exercise)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(exercise.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedExercise ? "ویرایش حرکت" : "افزودن حرکت جدید"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>نوع حرکت</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Exercise["category"] })}
              >
                <option value="دلتوئید خلفی">دلتوئید خلفی</option>
                <option value="دلتوئید جلویی">دلتوئید جلویی</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>نام حرکت</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="نام حرکت را وارد کنید"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSave}>ذخیره</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exercises;
