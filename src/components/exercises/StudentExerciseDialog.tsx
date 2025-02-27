
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Dumbbell, 
  Tag, 
  FolderTree, 
  Plus, 
  Search, 
  X, 
  ChevronDown,
  ChevronUp,
  Trash2,
  Filter,
  BookOpen,
  LayoutGrid
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import {
  Exercise,
  ExerciseCategory,
  ExerciseType,
} from "@/types/exercise";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave?: (exerciseIds: number[]) => void;
  initialExercises?: number[];
}

export function StudentExerciseDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
}: StudentExerciseDialogProps) {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>(initialExercises);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("selected");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [exerciseToRemove, setExerciseToRemove] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [categoryCollapsed, setCategoryCollapsed] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // بارگذاری داده‌ها از localStorage
  const loadData = () => {
    try {
      const savedTypes = localStorage.getItem("exerciseTypes");
      const savedCategories = localStorage.getItem("exerciseCategories");
      const savedExercises = localStorage.getItem("exercises");

      if (savedTypes) setExerciseTypes(JSON.parse(savedTypes));
      if (savedCategories) setCategories(JSON.parse(savedCategories));
      if (savedExercises) setExercises(JSON.parse(savedExercises));
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بارگذاری اطلاعات"
      });
    }
  };

  // پاکسازی انتخاب‌ها به جز تمرینات اولیه
  const resetSelections = () => {
    setSelectedType("");
    setSelectedCategories([]);
    // تنظیم تمرینات انتخاب شده به مقدار اولیه
    setSelectedExercises(initialExercises);
    setSearchQuery("");
    setActiveTab("selected");
  };

  // بارگذاری اولیه داده‌ها و تنظیم تمرینات اولیه
  useEffect(() => {
    if (open) {
      loadData();
      resetSelections();
    }
  }, [open, initialExercises]);

  // آماده‌سازی داده‌ها برای نمایش
  const filteredCategories = categories.filter(cat => cat.type === selectedType);
  
  const filteredExercises = exercises.filter(ex => 
    selectedCategories.includes(ex.categoryId) &&
    (searchQuery === "" || ex.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // تمرینات انتخاب شده
  const selectedExercisesList = exercises.filter(ex => selectedExercises.includes(ex.id));

  // گروه‌بندی تمرینات انتخاب شده بر اساس دسته بندی
  const groupedSelectedExercises = selectedExercisesList.reduce((acc, exercise) => {
    const categoryId = exercise.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(exercise);
    return acc;
  }, {} as Record<number, Exercise[]>);

  // حذف یک تمرین از لیست انتخاب شده‌ها
  const handleRemoveExercise = (exerciseId: number) => {
    setExerciseToRemove(exerciseId);
    setIsAlertOpen(true);
  };

  const confirmRemoveExercise = () => {
    if (exerciseToRemove !== null) {
      setSelectedExercises(prev => prev.filter(id => id !== exerciseToRemove));
      setExerciseToRemove(null);
      toast({
        title: "حذف شد",
        description: "تمرین با موفقیت از لیست حذف شد"
      });
    }
    setIsAlertOpen(false);
  };

  // تغییر وضعیت باز/بسته بودن یک دسته بندی
  const toggleCategoryCollapse = (categoryId: number) => {
    setCategoryCollapsed(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // ذخیره تغییرات
  const handleSave = async () => {
    if (selectedExercises.length === 0) {
      toast({
        variant: "destructive",
        title: "توجه",
        description: "هیچ تمرینی انتخاب نشده است"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Selected exercises:", selectedExercises);
      
      // فراخوانی callback برای ذخیره‌سازی
      if (onSave) {
        onSave(selectedExercises);
      }
      
      toast({
        title: "موفقیت",
        description: "حرکات تمرینی با موفقیت ذخیره شدند"
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی اطلاعات"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // مرتب سازی تمرینات بر اساس نام
  const sortedFilteredExercises = [...filteredExercises].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-slate-900">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Dumbbell className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-bold">
                مدیریت تمرین‌های {studentName}
              </span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              افزودن، ویرایش و حذف تمرین‌های اختصاصی برای شاگرد
            </DialogDescription>
          </DialogHeader>

          <Tabs 
            defaultValue="selected" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b px-6 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <TabsList className="bg-blue-50 dark:bg-blue-900/20 p-1">
                <TabsTrigger 
                  value="selected" 
                  className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    تمرینات انتخاب شده
                  </span>
                  {selectedExercises.length > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white h-5 min-w-5 flex items-center justify-center rounded-full text-xs"
                    >
                      {toPersianNumbers(selectedExercises.length)}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="add" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    افزودن تمرین
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="selected" className="flex-1 overflow-hidden m-0 p-0 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900">
              <div className="h-full flex flex-col">
                {selectedExercises.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center mb-6 animate-pulse">
                      <Dumbbell className="h-12 w-12 text-blue-400 dark:text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">هیچ تمرینی انتخاب نشده</h3>
                    <p className="text-muted-foreground max-w-md mb-8 text-gray-600 dark:text-gray-400">
                      برای افزودن تمرین جدید به تب «افزودن تمرین» بروید و تمرین‌های مورد نظر را انتخاب کنید.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("add")} 
                      className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                      افزودن تمرین
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-full px-6 py-4">
                    <div className="space-y-6">
                      {Object.entries(groupedSelectedExercises).map(([categoryIdStr, exercises]) => {
                        const categoryId = parseInt(categoryIdStr);
                        const category = categories.find(c => c.id === categoryId);
                        const isCollapsed = categoryCollapsed[categoryId] === true;
                        
                        if (!category) return null;
                        
                        return (
                          <Card 
                            key={categoryId} 
                            className="overflow-hidden border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <Collapsible 
                              open={!isCollapsed}
                              className="rounded-lg overflow-hidden"
                            >
                              <CollapsibleTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  className="w-full justify-between p-4 rounded-t-lg border-b border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
                                  onClick={() => toggleCategoryCollapse(categoryId)}
                                >
                                  <div className="flex items-center gap-3 font-medium">
                                    <div className="flex items-center justify-center min-w-9 h-9 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 text-white shadow">
                                      <FolderTree className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <span className="font-bold text-indigo-700 dark:text-indigo-300">{category.name}</span>
                                      <span className="text-xs text-indigo-600/70 dark:text-indigo-400/70">
                                        {toPersianNumbers(exercises.length)} تمرین
                                      </span>
                                    </div>
                                  </div>
                                  <Badge 
                                    className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 text-indigo-700 dark:text-indigo-300 hover:from-indigo-200 hover:to-blue-200 dark:hover:from-indigo-900/60 dark:hover:to-blue-900/60"
                                  >
                                    {isCollapsed ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronUp className="h-4 w-4" />
                                    )}
                                  </Badge>
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="divide-y divide-indigo-50 dark:divide-indigo-900/30 bg-white dark:bg-gray-950">
                                  {exercises.map(exercise => (
                                    <div 
                                      key={exercise.id} 
                                      className="flex items-center justify-between p-4 group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="min-w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 rounded-full shadow-sm shrink-0">
                                          <Dumbbell className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-gray-800 dark:text-gray-200">{exercise.name}</p>
                                          <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {category.type}
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost" 
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 h-9 w-9"
                                        onClick={() => handleRemoveExercise(exercise.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
                
                <div className="p-4 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {selectedExercises.length > 0 && (
                        <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                          {toPersianNumbers(selectedExercises.length)} تمرین انتخاب شده
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          onOpenChange(false);
                        }}
                        disabled={isLoading}
                        className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      >
                        انصراف
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 transition-all duration-300"
                        disabled={selectedExercises.length === 0 || isLoading}
                        onClick={handleSave}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-r-white animate-spin" />
                            در حال ذخیره...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4" />
                            ذخیره تمرینات
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="add" className="flex-1 overflow-hidden m-0 p-0 relative bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900">
              <div className="h-full flex flex-col">
                <div className="px-6 py-3 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" />
                    <Input
                      placeholder="جستجوی تمرین..." 
                      className="pr-9 border-indigo-200 dark:border-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400" 
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        >
                          <Filter className="h-3.5 w-3.5" />
                          نوع تمرین
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className="w-48 bg-white dark:bg-gray-950 border border-indigo-100 dark:border-indigo-900/50 shadow-lg"
                      >
                        {exerciseTypes.length === 0 ? (
                          <div className="py-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            هیچ نوع تمرینی یافت نشد
                          </div>
                        ) : (
                          exerciseTypes.map(type => (
                            <DropdownMenuItem 
                              key={type}
                              className={`${selectedType === type ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" : ""} focus:bg-indigo-50 dark:focus:bg-indigo-900/30 focus:text-indigo-700 dark:focus:text-indigo-300`}
                              onClick={() => {
                                setSelectedType(type);
                                setSelectedCategories([]);
                              }}
                            >
                              {type}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="flex items-center space-x-1 space-x-reverse bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-7 w-7 ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-indigo-600/60 dark:text-indigo-400/60'}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-7 w-7 ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-indigo-600/60 dark:text-indigo-400/60'}`}
                        onClick={() => setViewMode('list')}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    
                    {selectedExercises.length > 0 && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        onClick={() => setActiveTab("selected")}
                      >
                        <Dumbbell className="h-3.5 w-3.5" />
                        مشاهده انتخاب شده‌ها ({toPersianNumbers(selectedExercises.length)})
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 flex-1 overflow-hidden">
                  <div className="md:col-span-1 border-r border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-900/10 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-1 p-3">
                        {!selectedType ? (
                          <div className="text-center py-6 text-muted-foreground">
                            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                              <Tag className="h-8 w-8" />
                            </div>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">لطفاً یک نوع تمرین انتخاب کنید</p>
                          </div>
                        ) : filteredCategories.length === 0 ? (
                          <div className="text-center py-6 text-muted-foreground">
                            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                              <FolderTree className="h-8 w-8" />
                            </div>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">هیچ دسته‌بندی‌ای وجود ندارد</p>
                          </div>
                        ) : (
                          <>
                            <div className="mb-3 px-2">
                              <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">دسته‌بندی‌های {selectedType}</h3>
                            </div>
                            {filteredCategories.map((category) => (
                              <div
                                key={category.id}
                                className={`flex items-center rounded-lg p-2 transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 ${
                                  selectedCategories.includes(category.id) 
                                    ? "bg-indigo-100 dark:bg-indigo-900/30 border-l-2 border-indigo-500 dark:border-indigo-400" 
                                    : ""
                                }`}
                              >
                                <Checkbox
                                  id={`category-${category.id}`}
                                  checked={selectedCategories.includes(category.id)}
                                  onCheckedChange={(checked) => {
                                    setSelectedCategories(prev =>
                                      checked
                                        ? [...prev, category.id]
                                        : prev.filter(id => id !== category.id)
                                    );
                                  }}
                                  className="h-4 w-4 mr-2 border-indigo-300 dark:border-indigo-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <label
                                  htmlFor={`category-${category.id}`}
                                  className="flex-1 text-sm font-medium cursor-pointer text-gray-800 dark:text-gray-200"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="md:col-span-3 overflow-hidden bg-white dark:bg-gray-950">
                    <ScrollArea className="h-full">
                      {selectedCategories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-4">
                            <FolderTree className="h-10 w-10" />
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">هیچ دسته‌بندی انتخاب نشده</h3>
                          <p className="text-muted-foreground max-w-md text-gray-600 dark:text-gray-400">
                            از سمت راست یک یا چند دسته‌بندی را انتخاب کنید تا تمرینات آن‌ها نمایش داده شود.
                          </p>
                        </div>
                      ) : filteredExercises.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-4">
                            <Search className="h-10 w-10" />
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">هیچ تمرینی یافت نشد</h3>
                          <p className="text-muted-foreground max-w-md text-gray-600 dark:text-gray-400">
                            با معیارهای جستجوی فعلی هیچ تمرینی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
                          </p>
                        </div>
                      ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                          {sortedFilteredExercises.map((exercise) => {
                            const isSelected = selectedExercises.includes(exercise.id);
                            const category = categories.find(c => c.id === exercise.categoryId);
                            
                            return (
                              <Card 
                                key={exercise.id} 
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border ${
                                  isSelected 
                                    ? "ring-2 ring-indigo-500 dark:ring-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800" 
                                    : "border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800"
                                }`}
                                onClick={() => {
                                  setSelectedExercises(prev =>
                                    isSelected
                                      ? prev.filter(id => id !== exercise.id)
                                      : [...prev, exercise.id]
                                  );
                                }}
                              >
                                <div className="p-4 flex items-center gap-3">
                                  <Checkbox
                                    checked={isSelected}
                                    className="h-5 w-5 border-2 border-indigo-300 dark:border-indigo-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                    onCheckedChange={(checked) => {
                                      setSelectedExercises(prev =>
                                        checked
                                          ? [...prev, exercise.id]
                                          : prev.filter(id => id !== exercise.id)
                                      );
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{exercise.name}</h3>
                                    <Badge variant="outline" className="mt-1 text-xs font-normal border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20">
                                      {category?.name}
                                    </Badge>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                          {sortedFilteredExercises.map((exercise) => {
                            const isSelected = selectedExercises.includes(exercise.id);
                            const category = categories.find(c => c.id === exercise.categoryId);
                            
                            return (
                              <div 
                                key={exercise.id}
                                className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                                  isSelected 
                                    ? "bg-indigo-50/70 dark:bg-indigo-900/10" 
                                    : "hover:bg-gray-50 dark:hover:bg-gray-900"
                                }`}
                                onClick={() => {
                                  setSelectedExercises(prev =>
                                    isSelected
                                      ? prev.filter(id => id !== exercise.id)
                                      : [...prev, exercise.id]
                                  );
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    checked={isSelected}
                                    className="h-5 w-5 border-2 border-indigo-300 dark:border-indigo-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                    onCheckedChange={(checked) => {
                                      setSelectedExercises(prev =>
                                        checked
                                          ? [...prev, exercise.id]
                                          : prev.filter(id => id !== exercise.id)
                                      );
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                                    <Dumbbell className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{exercise.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {category?.name}
                                    </p>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Badge className="bg-indigo-500 text-white">
                                    انتخاب شده
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
                
                <div className="p-4 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-indigo-600 dark:text-indigo-400">
                      {selectedExercises.length > 0 && (
                        <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                          {toPersianNumbers(selectedExercises.length)} تمرین انتخاب شده
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          onOpenChange(false);
                        }}
                        disabled={isLoading}
                        className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      >
                        انصراف
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 transition-all duration-300"
                        disabled={selectedExercises.length === 0 || isLoading}
                        onClick={handleSave}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-r-white animate-spin" />
                            در حال ذخیره...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4" />
                            ذخیره تمرینات
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* دیالوگ تایید حذف */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-950 border border-indigo-100 dark:border-indigo-900/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
              آیا از حذف این تمرین مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              این تمرین از لیست تمرینات انتخاب شده حذف خواهد شد. این عمل غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemoveExercise}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
