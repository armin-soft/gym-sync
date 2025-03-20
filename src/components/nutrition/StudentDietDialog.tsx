
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
import { Search, Save, X, Apple, CalendarDays, Filter, Check } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

// Default days of the week in Persian
const defaultDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه"
];

// Default meal types in Persian
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

  // Load meals from localStorage
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

  // Extract days and types from meals, or use defaults if none exist
  useEffect(() => {
    // Get unique days from meals, or use defaults if no meals have days
    const mealsWithDays = meals.filter(meal => meal.day);
    const uniqueDays = mealsWithDays.length > 0 
      ? Array.from(new Set(mealsWithDays.map(meal => meal.day)))
      : defaultDays;
    
    // Get unique types from meals, or use defaults if no meals have types
    const mealsWithTypes = meals.filter(meal => meal.type);
    const uniqueTypes = mealsWithTypes.length > 0
      ? Array.from(new Set(mealsWithTypes.map(meal => meal.type)))
      : defaultMealTypes;
    
    setDays(uniqueDays);
    setTypes(uniqueTypes);
  }, [meals]);

  // Filter meals based on search query, tab, and filters
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
      case "صبحانه": return "text-amber-500 bg-amber-50 border-amber-200";
      case "میان وعده صبح": return "text-orange-500 bg-orange-50 border-orange-200";
      case "ناهار": return "text-green-500 bg-green-50 border-green-200";
      case "میان وعده عصر": return "text-red-500 bg-red-50 border-red-200";
      case "شام": return "text-blue-500 bg-blue-50 border-blue-200";
      case "میان وعده شب": return "text-purple-500 bg-purple-50 border-purple-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col overflow-hidden" dir="rtl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <Apple className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span>برنامه غذایی</span>
              <span className="text-sm font-normal text-muted-foreground">
                {studentName}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between gap-4 py-3 px-1">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جستجو در برنامه های غذایی..."
              className="pl-3 pr-9 bg-muted/40 focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2 whitespace-nowrap h-10"
            onClick={() => setActiveTab("all")}
          >
            <CalendarDays className="h-4 w-4" />
            همه روزها
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 whitespace-nowrap h-10"
            onClick={() => {
              document.getElementById('typeFilter')?.click();
            }}
          >
            <Filter className="h-4 w-4" />
            فیلتر وعده‌ها
          </Button>
        </div>

        <div className="flex-grow flex flex-col">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-grow flex flex-col"
          >
            <div className="border-b">
              <TabsList className="h-12 w-full justify-start overflow-x-auto bg-transparent p-0">
                <TabsTrigger 
                  value="all"
                  className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  همه روزها
                </TabsTrigger>
                {days.map((day) => (
                  <TabsTrigger 
                    key={day}
                    value={day}
                    className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:shadow-none"
                  >
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-shrink-0 p-2 border-b bg-muted/30">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={currentType === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setCurrentType("all")}
                  id="typeFilter"
                >
                  همه وعده‌ها
                </Badge>
                {types.map((type) => (
                  <Badge 
                    key={type}
                    variant={currentType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCurrentType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <TabsContent 
              value={activeTab} 
              className="flex-grow m-0 p-0"
              forceMount={activeTab === "all"}
            >
              <ScrollArea className="h-[calc(100vh-320px)] w-full">
                {filteredMeals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 rounded-full flex items-center justify-center mb-4">
                      <Apple className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-medium text-lg">هیچ وعده غذایی یافت نشد</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      وعده غذایی مورد نظر شما موجود نیست یا هنوز هیچ وعده غذایی ثبت نشده است
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                    {filteredMeals.map((meal) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedMeals.includes(meal.id)
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => toggleMeal(meal.id)}
                        >
                          <div className="flex gap-3 items-start">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                                selectedMeals.includes(meal.id)
                                  ? "border-green-500 bg-green-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedMeals.includes(meal.id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{meal.name}</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getMealTypeColor(meal.type)}`}>
                                  {meal.type}
                                </span>
                                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                                  {meal.day}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-xs mt-2 line-clamp-2">
                                {meal.description}
                              </p>
                              {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
                                <div className="grid grid-cols-4 gap-1 mt-2">
                                  {meal.calories && (
                                    <div className="text-xs bg-gray-50 border border-gray-200 p-1 rounded text-center">
                                      <span className="block font-medium">کالری</span>
                                      <span>{toPersianNumbers(meal.calories)}</span>
                                    </div>
                                  )}
                                  {meal.protein && (
                                    <div className="text-xs bg-gray-50 border border-gray-200 p-1 rounded text-center">
                                      <span className="block font-medium">پروتئین</span>
                                      <span>{toPersianNumbers(meal.protein)}</span>
                                    </div>
                                  )}
                                  {meal.carbs && (
                                    <div className="text-xs bg-gray-50 border border-gray-200 p-1 rounded text-center">
                                      <span className="block font-medium">کربوهیدرات</span>
                                      <span>{toPersianNumbers(meal.carbs)}</span>
                                    </div>
                                  )}
                                  {meal.fat && (
                                    <div className="text-xs bg-gray-50 border border-gray-200 p-1 rounded text-center">
                                      <span className="block font-medium">چربی</span>
                                      <span>{toPersianNumbers(meal.fat)}</span>
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

        <DialogFooter className="border-t pt-4 mt-auto">
          <div className="flex items-center gap-2 mr-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-300 text-white px-3 py-1 rounded-full text-xs font-medium">
              {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
            </div>
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
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
