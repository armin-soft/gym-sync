
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useToastNotification } from "@/hooks/use-toast-notification";
import { MealDialog } from "@/components/diet/MealDialog";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WeekDay, MealType, Meal } from "@/types/meal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayMeals } from "@/components/diet/DayMeals";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const weekDays: WeekDay[] = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
const mealTypes: MealType[] = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

const DietPage = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToastNotification();
  
  const [meals, setMeals] = useState<Meal[]>(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      return savedMeals ? JSON.parse(savedMeals) : [];
    } catch (error) {
      console.error('Error loading meals:', error);
      return [];
    }
  });
  
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const saveMeals = (newMeals: Meal[]) => {
    try {
      localStorage.setItem('meals', JSON.stringify(newMeals));
      setMeals(newMeals);
    } catch (error) {
      console.error('Error saving meals:', error);
      showError("خطا در ذخیره سازی", "مشکلی در ذخیره برنامه غذایی پیش آمده است");
    }
  };
  
  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    showSuccess("حذف موفق", "وعده غذایی با موفقیت حذف شد");
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
    let newMeals: Meal[];
    if (selectedMeal) {
      newMeals = meals.map(m => m.id === selectedMeal.id ? {
        ...data,
        id: m.id
      } : m);
      showSuccess("ویرایش موفق", "وعده غذایی با موفقیت ویرایش شد");
    } else {
      const newMeal = {
        ...data,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      newMeals = [...meals, newMeal];
      showSuccess("افزودن موفق", "وعده غذایی جدید با موفقیت اضافه شد");
    }
    saveMeals(newMeals);
    setIsDialogOpen(false);
  };
  
  // Filter only by search query
  const filteredMeals = meals.filter(meal => 
    meal.name.includes(searchQuery) || meal.description?.includes(searchQuery)
  );

  return (
    <div className="min-h-screen h-full w-full overflow-auto bg-gradient-to-b from-background via-background to-muted/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full w-full py-6 space-y-6 px-4 sm:px-6"
      >
        <div className="flex flex-col space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-1.5">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  برنامه های غذایی هفتگی
                </span>
              </h2>
            </div>
            <Button 
              onClick={handleAdd} 
              size="lg" 
              className="bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/25 group"
            >
              <Plus className="ml-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-180 duration-300" />
              افزودن وعده غذایی
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground/70 transition-colors group-hover:text-primary" />
              <Input 
                placeholder="جستجو در وعده های غذایی..." 
                className="pr-10 h-11 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-300" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
            </div>
          </motion.div>
        </div>

        <Card className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 h-[calc(100vh-180px)]">
          <ScrollArea className="h-full w-full">
            <div className="p-6">
              <DayMeals 
                meals={filteredMeals}
                mealTypes={mealTypes} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          </ScrollArea>
        </Card>

        <MealDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
          onSave={handleSave}
          meal={selectedMeal} 
          mealTypes={mealTypes} 
          weekDays={weekDays} 
        />

        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          <Button 
            onClick={() => showSuccess("عملیات موفق", "این یک پیام موفقیت است")}
            className="bg-green-500 hover:bg-green-600"
          >
            نمایش پیام موفقیت
          </Button>
          <Button 
            onClick={() => showError("خطا", "این یک پیام خطا است")}
            className="bg-red-500 hover:bg-red-600"
          >
            نمایش پیام خطا
          </Button>
          <Button 
            onClick={() => showWarning("هشدار", "این یک پیام هشدار است")}
            className="bg-amber-500 hover:bg-amber-600"
          >
            نمایش پیام هشدار
          </Button>
          <Button 
            onClick={() => showInfo("اطلاعات", "این یک پیام اطلاعات است")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            نمایش پیام اطلاعات
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DietPage;
