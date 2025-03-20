
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Search, Save, X, Salad, 
  Check, UtensilsCrossed, Apple, Sparkles, ChevronLeft,
  LayoutGrid, ListFilter, SlidersHorizontal, Coffee, Moon
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Meal, MealType, WeekDay } from "@/types/meal";
import StudentMealListWrapper from "./StudentMealListWrapper";

interface StudentMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals: number[];
  meals: Meal[];
}

export function StudentMealDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
  meals = [],
}: StudentMealDialogProps) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [activeDay, setActiveDay] = useState<WeekDay | "all">("all");
  const [activeMealType, setActiveMealType] = useState<MealType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique days and meal types from meals
  const days = Array.from(new Set(meals.map(meal => meal.day))) as WeekDay[];
  const mealTypes = Array.from(new Set(meals.map(meal => meal.type))) as MealType[];

  // Sort days in the correct order
  const dayOrder: Record<WeekDay, number> = {
    "شنبه": 0,
    "یکشنبه": 1,
    "دوشنبه": 2,
    "سه شنبه": 3,
    "چهارشنبه": 4,
    "پنج شنبه": 5,
    "جمعه": 6
  };
  
  const sortedDays = [...days].sort((a, b) => dayOrder[a] - dayOrder[b]);

  useEffect(() => {
    let filtered = [...meals];
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (meal) => meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 (meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (activeDay !== "all") {
      filtered = filtered.filter((meal) => meal.day === activeDay);
    }

    if (activeMealType !== "all") {
      filtered = filtered.filter((meal) => meal.type === activeMealType);
    }

    setFilteredMeals(filtered);
  }, [searchQuery, meals, activeDay, activeMealType]);

  const toggleMeal = (id: number) => {
    setSelectedMeals(prev =>
      prev.includes(id)
        ? prev.filter(mealId => mealId !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    const success = onSave(selectedMeals);
    if (success) {
      onOpenChange(false);
    }
    return success;
  };

  const getMealTypeColor = (type: MealType) => {
    switch (type) {
      case "صبحانه": return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800";
      case "میان وعده صبح": return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-800";
      case "ناهار": return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800";
      case "میان وعده عصر": return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800";
      case "شام": return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
      default: return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/30 dark:border-gray-700";
    }
  };

  const getMealTypeIcon = (type: MealType) => {
    switch (type) {
      case "صبحانه": return <Coffee className="h-3.5 w-3.5" />;
      case "میان وعده صبح": return <Apple className="h-3.5 w-3.5" />;
      case "ناهار": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده عصر": return <Apple className="h-3.5 w-3.5" />;
      case "شام": return <Moon className="h-3.5 w-3.5" />;
      default: return <Salad className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full p-0 sm:max-w-full flex flex-col border-0 text-right"
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0 text-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onOpenChange(false)}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
                    <Salad className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-right">
                    <SheetTitle className="text-lg font-bold text-foreground">مدیریت برنامه غذایی</SheetTitle>
                    <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-9 w-9 border-muted transition-colors",
                          viewMode === "grid" && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش شبکه‌ای</p>
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
                          "h-9 w-9 border-muted transition-colors",
                          viewMode === "list" && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setViewMode("list")}
                      >
                        <ListFilter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش لیستی</p>
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
                          "h-9 w-9 border-muted transition-colors",
                          showFilters && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">فیلترها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SheetHeader>

          {/* Search */}
          <div className="px-6 py-3 border-b bg-muted/20 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در برنامه های غذایی..."
                className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 overflow-hidden bg-muted/10 border-b"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground text-right">فیلتر بر اساس نوع وعده</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={activeMealType === "all" ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-primary/10"
                        onClick={() => setActiveMealType("all")}
                      >
                        همه وعده‌ها
                      </Badge>
                      {mealTypes.map((type) => (
                        <Badge 
                          key={type}
                          variant={activeMealType === type ? "default" : "outline"}
                          className={`cursor-pointer transition-all hover:bg-primary/10 flex gap-1 items-center ${
                            activeMealType === type ? '' : getMealTypeColor(type).split(' ')[0]
                          }`}
                          onClick={() => setActiveMealType(type)}
                        >
                          {getMealTypeIcon(type)}
                          <span>{type}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs and Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs 
              value={activeDay === "all" ? "all" : activeDay} 
              onValueChange={(value) => setActiveDay(value as WeekDay | "all")}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b bg-muted/10 shrink-0">
                <ScrollArea className="w-full" orientation="horizontal">
                  <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1">
                    <TabsTrigger 
                      value="all"
                      className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                    >
                      همه روزها
                    </TabsTrigger>
                    {sortedDays.map((day) => (
                      <TabsTrigger 
                        key={day}
                        value={day}
                        className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                      >
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </ScrollArea>
              </div>

              <TabsContent 
                value={activeDay === "all" ? "all" : activeDay.toString()} 
                className="flex-1 overflow-hidden m-0 p-0 outline-none data-[state=active]:h-full"
              >
                <StudentMealListWrapper
                  viewMode={viewMode}
                  maxHeight="70vh"
                >
                  {filteredMeals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <UtensilsCrossed className="h-8 w-8 text-green-500 dark:text-green-400" />
                      </div>
                      <h3 className="font-medium text-lg text-foreground">هیچ وعده غذایی یافت نشد</h3>
                      <p className="text-muted-foreground text-sm mt-2">برای افزودن وعده غذایی به صفحه مدیریت غذا مراجعه کنید</p>
                    </div>
                  ) : (
                    filteredMeals.map((meal) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, scale: viewMode === "grid" ? 0.95 : 1, y: viewMode === "list" ? 5 : 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div
                          className={`${viewMode === "grid" ? "p-4 rounded-xl border shadow-sm hover:shadow" : "p-4 hover:bg-muted/50"} 
                            transition-all cursor-pointer
                            ${selectedMeals.includes(meal.id)
                              ? viewMode === "grid" 
                                ? "border-primary/30 bg-primary/5 dark:bg-primary/10" 
                                : "bg-primary/5 dark:bg-primary/10"
                              : viewMode === "grid" 
                                ? "border-border hover:border-primary/20 bg-card hover:bg-muted/50" 
                                : ""
                            }`}
                          onClick={() => toggleMeal(meal.id)}
                        >
                          <div className={`flex gap-3 ${viewMode === "list" ? "flex-row" : "flex-col"} items-start`}>
                            <div
                              className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                                selectedMeals.includes(meal.id)
                                  ? "bg-primary"
                                  : "border-2 border-muted-foreground/30"
                              }`}
                            >
                              {selectedMeals.includes(meal.id) && (
                                <Check className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            
                            <div className={`${viewMode === "list" ? "flex-1 flex justify-between" : ""}`}>
                              {viewMode === "grid" ? (
                                <div className="space-y-2 text-right">
                                  <div>
                                    <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                                        {getMealTypeIcon(meal.type)}
                                        <span>{meal.type}</span>
                                      </span>
                                      <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                        {meal.day}
                                      </span>
                                    </div>
                                    
                                    {meal.description && (
                                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{meal.description}</p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="space-y-1 text-right">
                                    <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
                                    {meal.description && (
                                      <p className="text-xs text-muted-foreground line-clamp-1">{meal.description}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                                      {getMealTypeIcon(meal.type)}
                                      <span>{meal.type}</span>
                                    </span>
                                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                      {meal.day}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </StudentMealListWrapper>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <SheetFooter className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: selectedMeals.length > 0 ? 1 : 0.9, 
                  opacity: selectedMeals.length > 0 ? 1 : 0 
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
              </motion.div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button
                onClick={handleSave}
                className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                disabled={selectedMeals.length === 0}
              >
                <Save className="h-4 w-4" />
                ذخیره برنامه غذایی
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default StudentMealDialog;
