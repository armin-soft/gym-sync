
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const weekDays: WeekDay[] = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const mealTypes: MealType[] = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

const DietPage = () => {
  const { toast } = useToast();
  
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
      toast({
        variant: "destructive",
        title: "خطا در ذخیره سازی",
        description: "مشکلی در ذخیره برنامه غذایی پیش آمده است"
      });
    }
  };
  
  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
      className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
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
    let newMeals: Meal[];
    if (selectedMeal) {
      newMeals = meals.map(m => m.id === selectedMeal.id ? {
        ...data,
        id: m.id
      } : m);
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } else {
      const newMeal = {
        ...data,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      newMeals = [...meals, newMeal];
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
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
      </motion.div>
    </div>
  );
};

export default DietPage;
