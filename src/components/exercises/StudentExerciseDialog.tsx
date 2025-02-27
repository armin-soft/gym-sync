
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
  Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
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
        variant: "warning",
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
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Dumbbell className="h-5 w-5 text-blue-500" />
              <span>مدیریت تمرین‌های {studentName}</span>
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
            <div className="border-b px-6 py-2">
              <TabsList className="bg-muted/40">
                <TabsTrigger value="selected" className="relative">
                  تمرینات انتخاب شده
                  {selectedExercises.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedExercises.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="add">افزودن تمرین</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="selected" className="flex-1 overflow-hidden m-0 p-0">
              <div className="h-full flex flex-col">
                {selectedExercises.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                      <Dumbbell className="h-8 w-8 text-muted-foreground/60" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">هیچ تمرینی انتخاب نشده</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      برای افزودن تمرین جدید به تب «افزودن تمرین» بروید و تمرین‌های مورد نظر را انتخاب کنید.
                    </p>
                    <Button onClick={() => setActiveTab("add")} className="gap-2">
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
                          <Collapsible 
                            key={categoryId} 
                            open={!isCollapsed}
                            className="border rounded-lg overflow-hidden bg-card"
                          >
                            <CollapsibleTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-between p-4 rounded-none hover:bg-muted/30"
                                onClick={() => toggleCategoryCollapse(categoryId)}
                              >
                                <div className="flex items-center gap-2 font-medium">
                                  <FolderTree className="h-4 w-4 text-purple-500" />
                                  <span>{category.name}</span>
                                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {exercises.length}
                                  </span>
                                </div>
                                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="divide-y bg-background rounded-b-lg">
                                {exercises.map(exercise => (
                                  <div key={exercise.id} className="flex items-center justify-between p-3 group hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full shrink-0">
                                        <Dumbbell className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{exercise.name}</p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost" 
                                      size="icon"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                                      onClick={() => handleRemoveExercise(exercise.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
                
                <div className="p-4 border-t bg-muted/10 mt-auto">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onOpenChange(false);
                      }}
                      disabled={isLoading}
                    >
                      انصراف
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      disabled={selectedExercises.length === 0 || isLoading}
                      onClick={handleSave}
                    >
                      {isLoading ? (
                        "در حال ذخیره..."
                      ) : (
                        <>
                          <Dumbbell className="w-4 h-4 ml-2" />
                          ذخیره تمرینات
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="add" className="flex-1 overflow-hidden m-0 p-0 relative">
              <div className="h-full flex flex-col">
                <div className="px-6 py-3 border-b bg-muted/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="جستجوی تمرین..." 
                      className="pr-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7" 
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          نوع تمرین
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {exerciseTypes.map(type => (
                          <DropdownMenuItem 
                            key={type}
                            className={selectedType === type ? "bg-muted" : ""}
                            onClick={() => {
                              setSelectedType(type);
                              setSelectedCategories([]);
                            }}
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {selectedExercises.length > 0 && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-1 bg-blue-500 hover:bg-blue-600"
                        onClick={() => setActiveTab("selected")}
                      >
                        <Dumbbell className="h-3.5 w-3.5" />
                        مشاهده انتخاب شده‌ها ({selectedExercises.length})
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 flex-1 overflow-hidden">
                  <div className="md:col-span-1 border-r bg-muted/5 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-1 p-3">
                        {!selectedType ? (
                          <div className="text-center py-6 text-muted-foreground">
                            <Tag className="h-8 w-8 mx-auto mb-2" />
                            <p>لطفاً یک نوع تمرین انتخاب کنید</p>
                          </div>
                        ) : filteredCategories.length === 0 ? (
                          <div className="text-center py-6 text-muted-foreground">
                            <FolderTree className="h-8 w-8 mx-auto mb-2" />
                            <p>هیچ دسته‌بندی‌ای وجود ندارد</p>
                          </div>
                        ) : (
                          filteredCategories.map((category) => (
                            <div
                              key={category.id}
                              className={`flex items-center rounded-lg p-2 transition-colors hover:bg-muted ${
                                selectedCategories.includes(category.id) ? "bg-muted" : ""
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
                                className="h-4 w-4 mr-2"
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="flex-1 text-sm font-medium cursor-pointer"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="md:col-span-3 overflow-hidden">
                    <ScrollArea className="h-full">
                      {selectedCategories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                            <FolderTree className="h-8 w-8 text-muted-foreground/60" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">هیچ دسته‌بندی انتخاب نشده</h3>
                          <p className="text-muted-foreground max-w-md">
                            از سمت راست یک یا چند دسته‌بندی را انتخاب کنید تا تمرینات آن‌ها نمایش داده شود.
                          </p>
                        </div>
                      ) : filteredExercises.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-muted-foreground/60" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">هیچ تمرینی یافت نشد</h3>
                          <p className="text-muted-foreground max-w-md">
                            با معیارهای جستجوی فعلی هیچ تمرینی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                          {sortedFilteredExercises.map((exercise) => {
                            const isSelected = selectedExercises.includes(exercise.id);
                            return (
                              <Card 
                                key={exercise.id} 
                                className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                                  isSelected ? "ring-2 ring-blue-500 bg-blue-50/50" : ""
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
                                    className="h-5 w-5 border-2"
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
                                    <h3 className="font-medium">{exercise.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                      {categories.find(c => c.id === exercise.categoryId)?.name}
                                    </p>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
                
                <div className="p-4 border-t bg-muted/10 mt-auto">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {selectedExercises.length > 0 && `${selectedExercises.length} تمرین انتخاب شده`}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          onOpenChange(false);
                        }}
                        disabled={isLoading}
                      >
                        انصراف
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        disabled={selectedExercises.length === 0 || isLoading}
                        onClick={handleSave}
                      >
                        {isLoading ? (
                          "در حال ذخیره..."
                        ) : (
                          <>
                            <Dumbbell className="w-4 h-4 ml-2" />
                            ذخیره تمرینات
                          </>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این تمرین مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این تمرین از لیست تمرینات انتخاب شده حذف خواهد شد. این عمل غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
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
