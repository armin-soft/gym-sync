
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Calendar, UtensilsCrossed, ArrowLeft, ArrowDownAZ, ArrowUpZA, LayoutGrid, ListFilter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MealDialog } from "@/components/diet/MealDialog";
import { DayMeals } from "@/components/diet/DayMeals";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MealList } from "@/components/diet/MealList";
import { cn } from "@/lib/utils";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { Input } from "@/components/ui/input";

const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
] as WeekDay[];

const mealTypes: MealType[] = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
] as MealType[];

const Index = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }
    } catch (error) {
      console.error('Error loading meals from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('meals', JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals to localStorage:', error);
    }
  }, [meals]);

  const handleOpen = useCallback(() => {
    setSelectedMeal(null);
    setOpen(true);
  }, []);

  const handleEdit = useCallback((meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  }, []);

  const handleSave = useCallback((data: Omit<Meal, "id">) => {
    if (selectedMeal) {
      // Editing existing meal
      setMeals(meals.map(meal => meal.id === selectedMeal.id ? { ...meal, ...data } : meal));
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } else {
      // Adding new meal
      const newId = Math.max(0, ...meals.map(meal => typeof meal.id === 'number' ? meal.id : 0)) + 1;
      const newMeal: Meal = { id: newId, ...data };
      setMeals([...meals, newMeal]);
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    }
    return true;
  }, [meals, selectedMeal, toast]);

  const handleDelete = useCallback((id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
      className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
    });
  }, [meals, toast]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const filteredMeals = meals
    .filter(meal => 
      meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      meal.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(meal => meal.day === selectedDay)
    .sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return sortOrder === "asc" 
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      noPadding
      className="flex flex-col overflow-hidden"
    >
      <div className="h-full w-full overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full w-full py-4 sm:py-6 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6"
        >
          <PageHeader
            title="برنامه های غذایی هفتگی"
            icon={UtensilsCrossed}
            actions={
              <Button 
                onClick={handleOpen} 
                size="sm"
                className="bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/25 group"
              >
                <Plus className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 group-hover:rotate-180 duration-300" />
                افزودن وعده غذایی
              </Button>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
            
            <div className="flex items-center gap-2 self-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={cn(
                        "h-11 w-11 border-muted", 
                        viewMode === "grid" && "bg-primary/10 text-primary border-primary/30"
                      )} 
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">نمایش شبکه‌ای</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={cn(
                        "h-11 w-11 border-muted", 
                        viewMode === "list" && "bg-primary/10 text-primary border-primary/30"
                      )} 
                      onClick={() => setViewMode("list")}
                    >
                      <ListFilter className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">نمایش لیستی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-11 w-11 border-muted" 
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === "asc" ? 
                        <ArrowDownAZ className="h-5 w-5" /> : 
                        <ArrowUpZA className="h-5 w-5" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">تغییر ترتیب</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>

          <Card className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 h-[calc(100vh-180px)]">
            <ScrollArea className="h-full w-full">
              <div className="p-6">
                <Tabs defaultValue="شنبه" value={selectedDay} onValueChange={value => setSelectedDay(value as WeekDay)} className="w-full">
                  <div className="bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 pb-2 sm:pb-4">
                    <TabsList className="w-full flex justify-between gap-1 bg-muted/30 p-1 rounded-xl">
                      {weekDays.map((day) => (
                        <TabsTrigger 
                          key={day} 
                          value={day}
                          className={cn(
                            "flex-1 text-xs xs:text-sm sm:text-base px-1.5 xs:px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                            "transition-all duration-300 hover:bg-primary/10 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20",
                            "data-[state=active]:scale-105 relative overflow-hidden group"
                          )}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative whitespace-nowrap">
                            {day}
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <div className="mt-6">
                    {viewMode === "grid" ? (
                      <DayMeals
                        meals={filteredMeals}
                        mealTypes={mealTypes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ) : (
                      <MealList 
                        meals={filteredMeals.map(meal => ({
                          id: meal.id,
                          name: meal.name,
                          calories: parseInt(meal.calories || "0"),
                          protein: parseInt(meal.protein || "0"),
                          carbs: parseInt(meal.carbs || "0"),
                          fat: parseInt(meal.fat || "0"),
                          description: meal.description || "",
                          time: meal.type
                        }))}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    )}
                  </div>
                </Tabs>
              </div>
            </ScrollArea>
          </Card>

          <MealDialog
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            meal={selectedMeal}
            mealTypes={mealTypes}
            weekDays={weekDays}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Index;
