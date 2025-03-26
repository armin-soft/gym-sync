
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Save, X, Check, ChevronLeft, Pill, FlaskRound, 
  Sparkles, LayoutGrid, ListFilter, SlidersHorizontal, PlusCircle
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Supplement, SupplementCategory } from "@/types/supplement";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {supplements: number[], vitamins: number[]}) => boolean;
  initialSupplements: number[];
  initialVitamins: number[];
  supplements: Supplement[];
  categories: SupplementCategory[];
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
  supplements = [],
  categories = [],
}: StudentSupplementDialogProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialSupplements);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialVitamins);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    let filtered = supplements;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (activeTab === "supplements") {
      filtered = filtered.filter(item => item.type === "supplement");
    } else if (activeTab === "vitamins") {
      filtered = filtered.filter(item => item.type === "vitamin");
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchQuery, supplements, activeTab, selectedCategory]);

  const toggleItem = (id: number) => {
    if (activeTab === "supplements") {
      setSelectedSupplements(prev =>
        prev.includes(id)
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev =>
        prev.includes(id)
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    }
  };

  const handleSave = () => {
    onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
  };

  const isSelected = (id: number) => {
    return activeTab === "supplements" 
      ? selectedSupplements.includes(id)
      : selectedVitamins.includes(id);
  };

  const getItemIcon = (type: 'supplement' | 'vitamin') => {
    return type === 'supplement' ? 
      <FlaskRound className="h-4 w-4 text-purple-500" /> : 
      <Pill className="h-4 w-4 text-blue-500" />;
  };

  const getItemTypeColor = (type: 'supplement' | 'vitamin') => {
    if (type === 'supplement') {
      return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/30 dark:border-purple-800";
    } else {
      return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
    }
  };

  const supplementCategories = categories.filter(cat => cat.type === "supplement");
  const vitaminCategories = categories.filter(cat => cat.type === "vitamin");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-0 flex flex-col border-0 text-right"
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with gradient background */}
          <SheetHeader className="border-b shrink-0 text-right bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-950/50 dark:via-indigo-950/50 dark:to-blue-950/50">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 rounded-full hover:bg-white/30 hover:text-purple-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-right">
                    <SheetTitle className="text-lg font-bold text-foreground">مدیریت مکمل‌ها و ویتامین‌ها</SheetTitle>
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
                          viewMode === "grid" && "bg-primary/10 text-primary border-primary/30"
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
                          viewMode === "list" && "bg-primary/10 text-primary border-primary/30"
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
                          showFilters && "bg-primary/10 text-primary border-primary/30"
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

          {/* Search bar with glass-morphism effect */}
          <div className="px-6 py-3 border-b bg-white/50 backdrop-blur-sm shrink-0">
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در مکمل‌ها و ویتامین‌ها..."
                className="pl-3 pr-10 bg-white/70 focus-visible:ring-purple-500/20 border-muted shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters section with animation */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 overflow-hidden bg-white/50 backdrop-blur-sm border-b"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground text-right">فیلتر بر اساس دسته بندی</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-700"
                        onClick={() => setSelectedCategory("all")}
                      >
                        همه دسته‌بندی‌ها
                      </Badge>
                      {activeTab === "supplements" ? 
                        supplementCategories.map((cat) => (
                          <Badge 
                            key={cat.id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-700"
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            {cat.name}
                          </Badge>
                        )) :
                        vitaminCategories.map((cat) => (
                          <Badge 
                            key={cat.id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:bg-blue-100 hover:text-blue-700"
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            {cat.name}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs and Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => {
                setActiveTab(value as "supplements" | "vitamins");
                setSelectedCategory("all");
              }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b bg-white/50 backdrop-blur-sm shrink-0">
                <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1">
                  <TabsTrigger 
                    value="supplements"
                    className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-purple-500 data-[state=active]:bg-purple-50/50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none transition-colors duration-200 flex items-center gap-2"
                  >
                    <FlaskRound className="h-4 w-4" />
                    مکمل‌ها
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vitamins"
                    className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50/50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none transition-colors duration-200 flex items-center gap-2"
                  >
                    <Pill className="h-4 w-4" />
                    ویتامین‌ها
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent 
                value={activeTab} 
                className="flex-1 overflow-hidden m-0 p-0 outline-none data-[state=active]:h-full"
                forceMount
              >
                <ScrollArea className="h-full w-full">
                  {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        {activeTab === "supplements" ? 
                          <FlaskRound className="h-8 w-8 text-purple-500 dark:text-purple-400" /> :
                          <Pill className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        }
                      </div>
                      <h3 className="font-medium text-lg text-foreground">
                        {activeTab === "supplements" ? "هیچ مکملی یافت نشد" : "هیچ ویتامینی یافت نشد"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        می‌توانید با استفاده از نوار جستجو یا فیلترها موارد دیگر را بیابید
                      </p>
                    </div>
                  ) : viewMode === "grid" ? (
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredItems.map((item) => {
                        const isItemSelected = isSelected(item.id);
                        
                        return (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            layoutId={`item-${item.id}`}
                          >
                            <div
                              className={cn(
                                "p-4 rounded-xl border shadow-sm transition-all cursor-pointer",
                                isItemSelected
                                  ? activeTab === "supplements"
                                    ? "border-purple-300 bg-purple-50/70 dark:bg-purple-900/20"
                                    : "border-blue-300 bg-blue-50/70 dark:bg-blue-900/20"
                                  : "border-border hover:border-muted-foreground/20 bg-white hover:bg-muted/10"
                              )}
                              onClick={() => toggleItem(item.id)}
                            >
                              <div className="flex gap-3 items-start">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors",
                                    isItemSelected
                                      ? activeTab === "supplements"
                                        ? "bg-purple-600"
                                        : "bg-blue-600"
                                      : "border-2 border-muted-foreground/30"
                                  )}
                                >
                                  {isItemSelected && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <div className="space-y-2 text-right">
                                  <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                  
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    <Badge className={getItemTypeColor(item.type)} variant="outline">
                                      <span className="flex items-center gap-1">
                                        {getItemIcon(item.type)}
                                        <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                      </span>
                                    </Badge>
                                    <Badge variant="outline" className="bg-muted/30">
                                      {item.category}
                                    </Badge>
                                  </div>
                                  
                                  <div className="text-xs space-y-2 mt-3">
                                    <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-dashed border-muted">
                                      <span className="font-medium text-foreground">دوز مصرف:</span>
                                      <span className="text-muted-foreground">{item.dosage}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-1.5">
                                      <span className="font-medium text-foreground">زمان مصرف:</span>
                                      <span className="text-muted-foreground">{item.timing}</span>
                                    </div>
                                  </div>
                                  
                                  {item.description && (
                                    <div className="text-xs mt-2 pt-2 border-t border-muted">
                                      <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <div className="divide-y">
                      {filteredItems.map((item) => {
                        const isItemSelected = isSelected(item.id);
                        
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            layoutId={`item-list-${item.id}`}
                          >
                            <div
                              className={cn(
                                "p-4 transition-all cursor-pointer",
                                isItemSelected
                                  ? activeTab === "supplements"
                                    ? "bg-purple-50/70 dark:bg-purple-900/20"
                                    : "bg-blue-50/70 dark:bg-blue-900/20"
                                  : "hover:bg-muted/10"
                              )}
                              onClick={() => toggleItem(item.id)}
                            >
                              <div className="flex gap-3">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors",
                                    isItemSelected
                                      ? activeTab === "supplements"
                                        ? "bg-purple-600"
                                        : "bg-blue-600"
                                      : "border-2 border-muted-foreground/30"
                                  )}
                                >
                                  {isItemSelected && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                
                                <div className="flex-1 text-right">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap gap-1.5">
                                      <Badge className={getItemTypeColor(item.type)} variant="outline">
                                        <span className="flex items-center gap-1">
                                          {getItemIcon(item.type)}
                                          <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                        </span>
                                      </Badge>
                                      <Badge variant="outline" className="bg-muted/30">
                                        {item.category}
                                      </Badge>
                                    </div>
                                    <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                  </div>
                                  
                                  <div className="flex justify-end gap-6 mt-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs">{item.timing}</span>
                                      <span className="text-xs font-medium text-muted-foreground">:زمان مصرف</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs">{item.dosage}</span>
                                      <span className="text-xs font-medium text-muted-foreground">:دوز</span>
                                    </div>
                                  </div>
                                  
                                  {item.description && (
                                    <div className="mt-2 pt-2 text-sm text-muted-foreground">
                                      <p className="line-clamp-1 text-xs">{item.description}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer with selection counter and action buttons */}
          <SheetFooter className="border-t p-4 mt-auto bg-white/50 backdrop-blur-sm shrink-0 flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {(activeTab === "supplements" && selectedSupplements.length > 0) || 
                 (activeTab === "vitamins" && selectedVitamins.length > 0) ? (
                  <motion.div 
                    key="counter"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={cn(
                      "text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm",
                      activeTab === "supplements" 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600" 
                        : "bg-gradient-to-r from-blue-600 to-indigo-600"
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {activeTab === "supplements" 
                      ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده`
                      : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده`
                    }
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="text-muted-foreground text-xs flex items-center gap-1.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    {activeTab === "supplements" 
                      ? "هیچ مکملی انتخاب نشده است"
                      : "هیچ ویتامینی انتخاب نشده است"
                    }
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gap-2 border-muted bg-white/70 hover:bg-white hover:text-destructive hover:border-destructive/30"
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button
                onClick={handleSave}
                className={cn(
                  "gap-2 text-white border-0 shadow-sm",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                )}
                disabled={selectedSupplements.length === 0 && selectedVitamins.length === 0}
              >
                <Save className="h-4 w-4" />
                ذخیره مکمل‌ها
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
