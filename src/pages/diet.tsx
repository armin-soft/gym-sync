
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MealDialog, mealTypes } from "@/components/diet/MealDialog";
import { MealList, Meal } from "@/components/diet/MealList";

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

const Diet = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectedType, setSelectedType] = useState<string>("صبحانه");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

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
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingMeal(null);
    setDialogOpen(true);
  };

  const handleSubmit = (data: Omit<Meal, "id">) => {
    if (editingMeal) {
      setMeals(
        meals.map((meal) =>
          meal.id === editingMeal.id
            ? { ...data, id: meal.id }
            : meal
        )
      );
      toast({
        title: "ویرایش وعده غذایی",
        description: "وعده غذایی مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newMeal: Meal = {
        ...data,
        id: meals.length + 1,
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

      <MealList 
        meals={filteredMeals} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <MealDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingMeal || undefined}
        mode={editingMeal ? "edit" : "add"}
      />
    </div>
  );
};

export default Diet;
