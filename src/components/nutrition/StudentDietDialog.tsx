
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Search, Save, X, Apple, CalendarDays, Filter, 
  Check, Salad, UtensilsCrossed, Sparkles
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => void;
  initialMeals: number[];
}

interface Meal {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  day: string;
  type: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

const defaultDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه"
];

const defaultMealTypes = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده شب"
];

export function StudentDietDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
}: StudentDietDialogProps) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [currentDay, setCurrentDay] = useState<string | "all">("all");
  const [currentType, setCurrentType] = useState<string | "all">("all");
  const [days, setDays] = useState<string[]>(defaultDays);
  const [types, setTypes] = useState<string[]>(defaultMealTypes);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem("meals");
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      }
    } catch (error) {
      console.error("Error loading meals:", error);
      setMeals([]);
    }
  }, []);

  useEffect(() => {
    const mealsWithDays = meals.filter(meal => meal.day);
    const uniqueDays = mealsWithDays.length > 0 
      ? Array.from(new Set(mealsWithDays.map(meal => meal.day)))
      : defaultDays;
    
    const mealsWithTypes = meals.filter(meal => meal.type);
    const uniqueTypes = mealsWithTypes.length > 0
      ? Array.from(new Set(mealsWithTypes.map(meal => meal.type)))
      : defaultMealTypes;
    
    setDays(uniqueDays);
    setTypes(uniqueTypes);
  }, [meals]);

  useEffect(() => {
    let filtered = meals;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((meal) => meal.day === activeTab);
    }

    if (currentType !== "all") {
      filtered = filtered.filter((meal) => meal.type === currentType);
    }

    setFilteredMeals(filtered);
  }, [searchQuery, meals, activeTab, currentType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSave = () => {
    onSave(selectedMeals);
    onOpenChange(false);
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case "صبحانه": return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800";
      case "میان وعده صبح": return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-800";
      case "ناهار": return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800";
      case "میان وعده عصر": return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800";
      case "شام": return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
      case "میان وعده شب": return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/30 dark:border-purple-800";
      default: return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/30 dark:border-gray-700";
    }
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case "صبحانه": return <Apple className="h-3.5 w-3.5" />;
      case "میان وعده صبح": return <Apple className="h-3.5 w-3.5" />;
      case "ناهار": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده عصر": return <Salad className="h-3.5 w-3.5" />;
      case "شام": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده شب": return <Apple className="h-3.5 w-3.5" />;
      default: return <Apple className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col overflow-hidden p-0" dir="rtl">
        <DialogHeader className="border-b py-4 px-6 bg-gradient-to-b from-background to-background/80">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
              <Salad className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">برنامه غذایی</DialogTitle>
              <p className="text-sm font-medium text-muted-foreground mt-1">{studentName}</p>
            </div>
          </motion.div>
        </DialogHeader>

        <div className="flex items-center justify-between gap-4 p-4 border-b bg-muted/30">
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جستجو در برنامه های غذایی..."
              className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-muted"
                  onClick={() => setActiveTab("all")}
                >
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs font-medium">نمایش همه روزها</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline" 
                  size="icon"
                  className={`h-10 w-10 border-muted transition-colors ${showFilters ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs font-medium">فیلتر وعده‌ها</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 overflow-hidden bg-muted/20 border-b"
            >
              <div className="p-3">
                <h3 className="text-sm font-medium mb-2 text-foreground">فیلتر بر اساس نوع وعده</h3>
                <div className="flex flex-wrap gap-1.5">
                  <Badge 
                    variant={currentType === "all" ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:bg-primary/10"
                    onClick={() => setCurrentType("all")}
                  >
                    همه وعده‌ها
                  </Badge>
                  {types.map((type) => (
                    <Badge 
                      key={type}
                      variant={currentType === type ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover:bg-primary/10 flex gap-1 items-center ${
                        currentType === type ? '' : getMealTypeColor(type).split(' ')[0]
                      }`}
                      onClick={() => setCurrentType(type)}
                    >
                      {getMealTypeIcon(type)}
                      <span>{type}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-grow flex flex-col">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-grow flex flex-col"
          >
            <div className="border-b bg-muted/20">
              <ScrollArea orientation="horizontal" className="w-full">
                <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1">
                  <TabsTrigger 
                    value="all"
                    className="h-11 rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                  >
                    همه روزها
                  </TabsTrigger>
                  {days.map((day) => (
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
              value={activeTab} 
              className="flex-grow m-0 p-0 outline-none"
              forceMount={activeTab === "all" ? true : undefined}
            >
              <ScrollArea className="h-[calc(100vh-320px)] w-full">
                {filteredMeals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <UtensilsCrossed className="h-8 w-8 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg text-foreground">هیچ وعده غذایی یافت نشد</h3>
                    <p className="text-muted-foreground text-sm mt-2 max-w-xs">
                      وعده غذایی مورد نظر شما موجود نیست یا هنوز هیچ وعده غذایی ثبت نشده است
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                    {filteredMeals.map((meal) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div
                          className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${
                            selectedMeals.includes(meal.id)
                              ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                              : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
                          }`}
                          onClick={() => toggleMeal(meal.id)}
                        >
                          <div className="flex gap-3 items-start">
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
                            <div className="space-y-2">
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
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {meal.description}
                              </p>
                              {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
                                <div className="grid grid-cols-4 gap-1 mt-2">
                                  {meal.calories && (
                                    <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                      <span className="block font-medium text-foreground">کالری</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(meal.calories)}</span>
                                    </div>
                                  )}
                                  {meal.protein && (
                                    <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                      <span className="block font-medium text-foreground">پروتئین</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(meal.protein)}</span>
                                    </div>
                                  )}
                                  {meal.carbs && (
                                    <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                      <span className="block font-medium text-foreground">کربوهیدرات</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(meal.carbs)}</span>
                                    </div>
                                  )}
                                  {meal.fat && (
                                    <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                      <span className="block font-medium text-foreground">چربی</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(meal.fat)}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="border-t p-4 mt-auto bg-muted/20">
          <div className="flex items-center gap-2 mr-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: selectedMeals.length > 0 ? 1 : 0.9, 
                opacity: selectedMeals.length > 0 ? 1 : 0 
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
