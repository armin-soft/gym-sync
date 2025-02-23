
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MealDialog } from "@/components/diet/MealDialog";
import { MealList } from "@/components/diet/MealList";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  image?: string;
  time: string;
}

const mockMeals: Meal[] = [
  {
    id: 1,
    name: "صبحانه پروتئینی",
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 15,
    description: "تخم مرغ، نان سبوس‌دار، پنیر کم‌چرب",
    time: "۸:۰۰",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "میان وعده صبح",
    calories: 200,
    protein: 10,
    carbs: 25,
    fat: 8,
    description: "موز، بادام خام",
    time: "۱۰:۳۰",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "ناهار",
    calories: 650,
    protein: 45,
    carbs: 65,
    fat: 20,
    description: "مرغ گریل شده، برنج قهوه‌ای، سالاد",
    time: "۱۳:۰۰",
    image: "/placeholder.svg",
  },
];

const Diet = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        id: Math.max(...meals.map((m) => m.id)) + 1,
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

  // Calculate total macros
  const totalMacros = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">برنامه غذایی</h2>
              <Badge variant="secondary" className="rounded-full">
                {meals.length} وعده
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              در این بخش می‌توانید وعده‌های غذایی را مدیریت کنید
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن وعده
          </Button>
        </div>

        {/* Search and Filters */}
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
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            فیلترها
          </Button>
        </div>
      </div>

      {/* Macros Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">کالری کل</p>
          <p className="text-2xl font-bold mt-1">{totalMacros.calories}</p>
          <p className="text-xs text-muted-foreground mt-1">کیلوکالری</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">پروتئین</p>
          <p className="text-2xl font-bold mt-1">{totalMacros.protein}</p>
          <p className="text-xs text-muted-foreground mt-1">گرم</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">کربوهیدرات</p>
          <p className="text-2xl font-bold mt-1">{totalMacros.carbs}</p>
          <p className="text-xs text-muted-foreground mt-1">گرم</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">چربی</p>
          <p className="text-2xl font-bold mt-1">{totalMacros.fat}</p>
          <p className="text-xs text-muted-foreground mt-1">گرم</p>
        </div>
      </div>

      {/* Meals List */}
      <MealList
        meals={filteredMeals}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Empty State */}
      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">وعده‌ای یافت نشد</h3>
          <p className="text-muted-foreground mt-2">
            با معیارهای جستجوی فعلی وعده‌ای پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </div>
      )}

      <MealDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        meal={selectedMeal}
      />
    </div>
  );
};

export default Diet;
