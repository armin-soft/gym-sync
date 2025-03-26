import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Salad, Check, UtensilsCrossed, Apple, Sparkles, ChevronDown, LayoutGrid, ListFilter, SlidersHorizontal, Coffee, Moon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Meal, MealType, WeekDay } from "@/types/meal";
import StudentMealListWrapper from "./StudentMealListWrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
interface StudentMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals: number[];
  meals: Meal[];
}

// Define the meal type order
const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2,
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5
};
export function StudentMealDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
  meals = []
}: StudentMealDialogProps) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [activeDay, setActiveDay] = useState<WeekDay | "all">("all");
  const [activeMealType, setActiveMealType] = useState<MealType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get unique days and meal types from meals
  const days = Array.from(new Set(meals.map(meal => meal.day))) as WeekDay[];
  const mealTypes = Array.from(new Set(meals.map(meal => meal.type))) as MealType[];

  // Sort meal types in the correct order
  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);

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
      filtered = filtered.filter(meal => meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (activeDay !== "all") {
      filtered = filtered.filter(meal => meal.day === activeDay);
    }
    if (activeMealType !== "all") {
      filtered = filtered.filter(meal => meal.type === activeMealType);
    }

    // Sort meals
    filtered.sort((a, b) => {
      // First sort by day order
      const dayOrderDiff = dayOrder[a.day] - dayOrder[b.day];
      if (dayOrderDiff !== 0) return dayOrderDiff;

      // Then sort by meal type if days are same
      const typeOrderDiff = mealTypeOrder[a.type] - mealTypeOrder[b.type];
      if (typeOrderDiff !== 0) return typeOrderDiff;

      // Then sort by name if types are the same
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredMeals(filtered);
  }, [searchQuery, meals, activeDay, activeMealType, sortOrder]);
  const toggleMeal = (id: number) => {
    setSelectedMeals(prev => prev.includes(id) ? prev.filter(mealId => mealId !== id) : [...prev, id]);
  };
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
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
      case "صبحانه":
        return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800";
      case "میان وعده صبح":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-800";
      case "ناهار":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800";
      case "میان وعده عصر":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800";
      case "شام":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/30 dark:border-gray-700";
    }
  };
  const getMealTypeIcon = (type: MealType) => {
    switch (type) {
      case "صبحانه":
        return <Coffee className="h-3.5 w-3.5" />;
      case "میان وعده صبح":
        return <Apple className="h-3.5 w-3.5" />;
      case "ناهار":
        return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده عصر":
        return <Apple className="h-3.5 w-3.5" />;
      case "شام":
        return <Moon className="h-3.5 w-3.5" />;
      default:
        return <Salad className="h-3.5 w-3.5" />;
    }
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white dark:bg-gray-800/50 shadow-sm shrink-0 text-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <Salad className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-foreground">مدیریت برنامه غذایی</h2>
                  <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b bg-muted/20 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="جستجو در برنامه های غذایی..." className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted text-right" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} dir="rtl" />
          </div>
        </div>

        {/* Filters */}
        <Collapsible open={showFilters} onOpenChange={setShowFilters} className="w-full">
          <CollapsibleContent className="flex-shrink-0 bg-muted/10 border-b">
            <div className="p-4 flex flex-col gap-3" dir="rtl">
              <div>
                <h3 className="text-sm font-medium mb-2 text-foreground text-right">فیلتر بر اساس نوع وعده</h3>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant={activeMealType === "all" ? "default" : "outline"} className="cursor-pointer transition-all hover:bg-primary/10" onClick={() => setActiveMealType("all")}>
                    همه وعده‌ها
                  </Badge>
                  {sortedMealTypes.map(type => <Badge key={type} variant={activeMealType === type ? "default" : "outline"} className={`cursor-pointer transition-all hover:bg-primary/10 flex gap-1 items-center ${activeMealType === type ? '' : getMealTypeColor(type).split(' ')[0]}`} onClick={() => setActiveMealType(type)}>
                      {getMealTypeIcon(type)}
                      <span>{type}</span>
                    </Badge>)}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Tabs and Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeDay === "all" ? "all" : activeDay} onValueChange={value => setActiveDay(value as WeekDay | "all")} className="flex-1 flex flex-col overflow-hidden" dir="rtl">
            <div className="border-b bg-muted/10 shrink-0">
              <ScrollArea className="w-full" orientation="horizontal">
                <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1" dir="rtl">
                  <TabsTrigger value="all" className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200">
                    همه روزها
                  </TabsTrigger>
                  {sortedDays.map(day => <TabsTrigger key={day} value={day} className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200">
                      {day}
                    </TabsTrigger>)}
                </TabsList>
              </ScrollArea>
            </div>

            <TabsContent value={activeDay === "all" ? "all" : activeDay.toString()} className="flex-1 overflow-hidden m-0 p-0 outline-none data-[state=active]:h-full" dir="rtl">
              <StudentMealListWrapper viewMode={viewMode} maxHeight="calc(100vh - 240px)" setViewMode={setViewMode} toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} showControls={true}>
                {filteredMeals.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <UtensilsCrossed className="h-8 w-8 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg text-foreground">هیچ وعده غذایی یافت نشد</h3>
                    <p className="text-muted-foreground text-sm mt-2">برای افزودن وعده غذایی به صفحه مدیریت غذا مراجعه کنید</p>
                  </div> : <div className="space-y-6">
                    {activeMealType === "all" && activeDay === "all" ?
                // Group by day and then by meal type
                sortedDays.map(day => {
                  const dayMeals = filteredMeals.filter(meal => meal.day === day);
                  if (dayMeals.length === 0) return null;
                  return <div key={day} className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground/90 pb-2 border-b">{day}</h3>
                            <div className="space-y-4">
                              {sortedMealTypes.map(type => {
                        const typeMeals = dayMeals.filter(meal => meal.type === type);
                        if (typeMeals.length === 0) return null;
                        const typeColor = getMealTypeColor(type);
                        return <div key={`${day}-${type}`} className="space-y-2">
                                    <h4 className={`text-sm font-medium flex items-center gap-1.5 ${typeColor.split(' ')[0]}`}>
                                      {getMealTypeIcon(type)}
                                      {type}
                                      <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
                                        {typeMeals.length} مورد
                                      </span>
                                    </h4>
                                    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3`}>
                                      {typeMeals.map(meal => renderMealItem(meal))}
                                    </div>
                                  </div>;
                      })}
                            </div>
                          </div>;
                }) : activeMealType !== "all" && activeDay === "all" ?
                // Group by day for a specific meal type
                sortedDays.map(day => {
                  const dayMeals = filteredMeals.filter(meal => meal.day === day);
                  if (dayMeals.length === 0) return null;
                  return <div key={day} className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground/90 pb-2 border-b">{day}</h3>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3`}>
                              {dayMeals.map(meal => renderMealItem(meal))}
                            </div>
                          </div>;
                }) : activeDay !== "all" && activeMealType === "all" ?
                // Group by meal type for a specific day
                sortedMealTypes.map(type => {
                  const typeMeals = filteredMeals.filter(meal => meal.type === type);
                  if (typeMeals.length === 0) return null;
                  const typeColor = getMealTypeColor(type);
                  return <div key={type} className="space-y-2">
                            <h4 className={`text-sm font-medium flex items-center gap-1.5 ${typeColor.split(' ')[0]}`}>
                              {getMealTypeIcon(type)}
                              {type}
                              <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
                                {typeMeals.length} مورد
                              </span>
                            </h4>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3`}>
                              {typeMeals.map(meal => renderMealItem(meal))}
                            </div>
                          </div>;
                }) :
                // Just show the filtered meals when both day and meal type are selected
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3`}>
                        {filteredMeals.map(meal => renderMealItem(meal))}
                      </div>}
                  </div>}
              </StudentMealListWrapper>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex justify-between text-right" dir="rtl">
          <div className="flex items-center gap-2">
            <motion.div initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: selectedMeals.length > 0 ? 1 : 0.9,
            opacity: selectedMeals.length > 0 ? 1 : 0
          }} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
            </motion.div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0" disabled={selectedMeals.length === 0}>
              <Save className="h-4 w-4" />
              ذخیره برنامه غذایی
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;

  // Helper function to render a meal item - define inside component so it has access to component state
  function renderMealItem(meal: Meal) {
    return <motion.div key={meal.id} initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.2
    }} layout>
        <div className={`p-4 rounded-xl border shadow-sm hover:shadow transition-all cursor-pointer text-right
            ${selectedMeals.includes(meal.id) ? "border-primary/30 bg-primary/5 dark:bg-primary/10" : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"}`} onClick={() => toggleMeal(meal.id)} dir="rtl">
          <div className="flex gap-3 items-start">
            <div className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${selectedMeals.includes(meal.id) ? "bg-primary" : "border-2 border-muted-foreground/30"}`}>
              {selectedMeals.includes(meal.id) && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            
            <div className="space-y-2 text-right flex-1">
              <div>
                <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                    {getMealTypeIcon(meal.type)}
                    <span>{meal.type}</span>
                  </span>
                </div>
                
                {meal.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{meal.description}</p>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>;
  }
}
export default StudentMealDialog;