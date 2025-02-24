
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MealDialog } from "@/components/diet/MealDialog";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WeekDay, MealType, Meal } from "@/types/meal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayMeals } from "@/components/diet/DayMeals";

const weekDays: WeekDay[] = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
const mealTypes: MealType[] = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

const Diet = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");

  const handleDelete = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast({
      title: "وعده غذایی حذف شد",
      description: "وعده غذایی مورد نظر با موفقیت حذف شد.",
    });
  };

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedMeal(undefined);
    setIsDialogOpen(true);
  };

  const handleSave = (data: Omit<Meal, "id">) => {
    if (selectedMeal) {
      setMeals(
        meals.map((m) =>
          m.id === selectedMeal.id ? { ...data, id: m.id } : m
        )
      );
      toast({
        title: "وعده غذایی ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      const newMeal = {
        ...data,
        id: Math.max(0, ...meals.map((m) => m.id)) + 1,
      };
      setMeals([...meals, newMeal]);
      toast({
        title: "وعده غذایی جدید",
        description: "وعده غذایی جدید با موفقیت اضافه شد.",
      });
    }
    setIsDialogOpen(false);
  };

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.includes(searchQuery) ||
      meal.description.includes(searchQuery)
  );

  const dayMeals = filteredMeals.filter(meal => meal.day === selectedDay);

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">برنامه غذایی</h2>
            <p className="text-muted-foreground mt-2">
              در این بخش می‌توانید وعده‌های غذایی را مدیریت کنید
            </p>
          </div>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="ml-2 h-4 w-4" />
            افزودن وعده
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در وعده‌های غذایی..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <Card className="p-6">
        <Tabs defaultValue="شنبه" onValueChange={(value) => setSelectedDay(value as WeekDay)}>
          <TabsList className="mb-6">
            {weekDays.map((day) => (
              <TabsTrigger key={day} value={day} className="min-w-[100px]">
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
          {weekDays.map((day) => (
            <TabsContent key={day} value={day}>
              <DayMeals
                meals={dayMeals}
                mealTypes={mealTypes}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <MealDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        meal={selectedMeal}
        mealTypes={mealTypes}
        weekDays={weekDays}
      />
    </div>
  );
};

export default Diet;
