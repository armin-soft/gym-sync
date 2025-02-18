
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

const mealFormSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل ۲ کاراکتر باشد"),
  type: z.string().min(1, "انتخاب نوع وعده غذایی الزامی است"),
  calories: z.string().min(1, "میزان کالری نمی‌تواند خالی باشد"),
  protein: z.string().min(1, "میزان پروتئین نمی‌تواند خالی باشد"),
  carbs: z.string().min(1, "میزان کربوهیدرات نمی‌تواند خالی باشد"),
  fat: z.string().min(1, "میزان چربی نمی‌تواند خالی باشد"),
});

interface Meal {
  id: number;
  name: string;
  type: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

const initialMeals: Meal[] = [
  {
    id: 1,
    name: "املت سفیده تخم مرغ",
    type: "صبحانه",
    calories: "۳۰۰",
    protein: "۲۵",
    carbs: "۵",
    fat: "۱۲",
  },
  {
    id: 2,
    name: "برنج با مرغ",
    type: "ناهار",
    calories: "۶۵۰",
    protein: "۴۵",
    carbs: "۸۰",
    fat: "۱۵",
  },
];

const mealTypes = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

const Diet = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectedType, setSelectedType] = useState<string>("صبحانه");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const form = useForm<z.infer<typeof mealFormSchema>>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: "",
      type: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  const filteredMeals = meals.filter((meal) => meal.type === selectedType);

  const handleDelete = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast({
      title: "حذف وعده غذایی",
      description: "وعده غذایی مورد نظر با موفقیت حذف شد.",
    });
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    form.reset({
      name: meal.name,
      type: meal.type,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    });
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingMeal(null);
    form.reset({
      name: "",
      type: selectedType,
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof mealFormSchema>) => {
    if (editingMeal) {
      setMeals(
        meals.map((meal) =>
          meal.id === editingMeal.id
            ? {
                id: meal.id,
                name: data.name,
                type: data.type,
                calories: data.calories,
                protein: data.protein,
                carbs: data.carbs,
                fat: data.fat,
              }
            : meal
        )
      );
      toast({
        title: "ویرایش وعده غذایی",
        description: "وعده غذایی مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newMeal: Meal = {
        id: meals.length + 1,
        name: data.name,
        type: data.type,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
      };
      setMeals([...meals, newMeal]);
      toast({
        title: "افزودن وعده غذایی",
        description: "وعده غذایی جدید با موفقیت اضافه شد.",
      });
    }
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">برنامه غذایی</h2>
          <p className="text-muted-foreground">
            در این بخش می‌توانید وعده‌های غذایی را مدیریت کنید
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="ml-2 h-4 w-4" /> افزودن وعده غذایی
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">فیلتر بر اساس نوع وعده</h3>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="انتخاب نوع وعده" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام غذا</TableHead>
                <TableHead>نوع وعده</TableHead>
                <TableHead>کالری</TableHead>
                <TableHead>پروتئین</TableHead>
                <TableHead>کربوهیدرات</TableHead>
                <TableHead>چربی</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell>{meal.name}</TableCell>
                  <TableCell>{meal.type}</TableCell>
                  <TableCell>{meal.calories}</TableCell>
                  <TableCell>{meal.protein}</TableCell>
                  <TableCell>{meal.carbs}</TableCell>
                  <TableCell>{meal.fat}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(meal)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(meal.id)}
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
              {editingMeal ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام غذا</FormLabel>
                    <FormControl>
                      <Input placeholder="نام غذا را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع وعده</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="نوع وعده را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mealTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کالری</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۳۰۰" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>پروتئین (گرم)</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۲۵" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="carbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کربوهیدرات (گرم)</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۵۰" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>چربی (گرم)</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۱۵" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  انصراف
                </Button>
                <Button type="submit">
                  {editingMeal ? "ویرایش" : "افزودن"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Diet;
