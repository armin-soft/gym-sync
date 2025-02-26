
import { Button } from "@/components/ui/button";
import { Plus, Search, Calendar, UtensilsCrossed, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      try {
        setMeals(JSON.parse(savedMeals));
      } catch (error) {
        console.error('Error loading meals:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری برنامه غذایی پیش آمده است"
        });
      }
    }
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
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
    if (selectedMeal) {
      setMeals(meals.map((m) => m.id === selectedMeal.id ? { ...data, id: m.id } : m));
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } else {
      const newMeal = {
        ...data,
        id: Math.max(0, ...meals.map((m) => m.id)) + 1,
      };
      setMeals([...meals, newMeal]);
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-muted rounded"></div>
          <div className="h-8 w-96 bg-muted rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-muted rounded col-span-1"></div>
            <div className="h-32 bg-muted rounded col-span-1"></div>
            <div className="h-32 bg-muted rounded col-span-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto py-6 space-y-6 px-4 sm:px-6"
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
                  برنامه‌های غذایی هفتگی
                </span>
              </h2>
              <p className="text-muted-foreground/80 flex items-center gap-2 text-sm">
                <UtensilsCrossed className="w-4 h-4" />
                برنامه‌ریزی و مدیریت وعده‌های غذایی در طول هفته
              </p>
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
                placeholder="جستجو در وعده‌های غذایی..."
                className="pr-10 h-11 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        <Card className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="p-6">
              <Tabs defaultValue="شنبه" value={selectedDay} onValueChange={(value) => setSelectedDay(value as WeekDay)} className="w-full">
                <div className="bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                  <TabsList className="w-full flex justify-between gap-1 bg-muted/30 p-1 rounded-2xl">
                    {weekDays.map((day, index) => (
                      <TabsTrigger 
                        key={day} 
                        value={day}
                        className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                          transition-all duration-300 gap-2 hover:bg-primary/10 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20
                          data-[state=active]:scale-105 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex flex-col items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{day}</span>
                          {index < weekDays.length - 1 && (
                            <ArrowLeft className="w-4 h-4 absolute -left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
                          )}
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="mt-6">
                  {weekDays.map((day) => (
                    <TabsContent 
                      key={day} 
                      value={day} 
                      className="focus-visible:outline-none focus-visible:ring-0 space-y-6"
                    >
                      <DayMeals
                        meals={dayMeals}
                        mealTypes={mealTypes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </ScrollArea>
        </Card>

        <MealDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
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
