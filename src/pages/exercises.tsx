
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const exerciseFormSchema = z.object({
  name: z.string().min(2, "نام حرکت باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب گروه عضلانی الزامی است"),
  sets: z.string().min(1, "تعداد ست نمی‌تواند خالی باشد"),
  reps: z.string().min(1, "تعداد تکرار نمی‌تواند خالی باشد"),
  description: z.string().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
});

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      category: "",
      sets: "",
      reps: "",
      description: "",
    },
  });

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

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    form.reset({
      name: exercise.name,
      category: exercise.category,
      sets: exercise.sets,
      reps: exercise.reps,
      description: exercise.description,
    });
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingExercise(null);
    form.reset({
      name: "",
      category: selectedCategory,
      sets: "",
      reps: "",
      description: "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof exerciseFormSchema>) => {
    if (editingExercise) {
      setExercises(
        exercises.map((exercise) =>
          exercise.id === editingExercise.id
            ? { 
                id: exercise.id,
                name: data.name,
                category: data.category,
                sets: data.sets,
                reps: data.reps,
                description: data.description
              }
            : exercise
        )
      );
      toast({
        title: "ویرایش حرکت",
        description: "حرکت مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newExercise: Exercise = {
        id: exercises.length + 1,
        name: data.name,
        category: data.category,
        sets: data.sets,
        reps: data.reps,
        description: data.description
      };
      setExercises([...exercises, newExercise]);
      toast({
        title: "افزودن حرکت",
        description: "حرکت جدید با موفقیت اضافه شد.",
      });
    }
    setDialogOpen(false);
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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(exercise)}
                      >
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingExercise ? "ویرایش حرکت" : "افزودن حرکت جدید"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام حرکت</FormLabel>
                    <FormControl>
                      <Input placeholder="نام حرکت را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>گروه عضلانی</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="گروه عضلانی را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تعداد ست</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۳" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تعداد تکرار</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۱۲" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="توضیحات حرکت را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  انصراف
                </Button>
                <Button type="submit">
                  {editingExercise ? "ویرایش" : "افزودن"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exercises;
