
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
  Search, Save, X, Plus, Sparkles,
  Check, ChevronLeft, Pill, FlaskConical,
  LayoutGrid, ListFilter, SlidersHorizontal, Bookmark
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [filteredSupplements, setFilteredSupplements] = useState<Supplement[]>([]);
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
          (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase()))
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

    setFilteredSupplements(filtered);
  }, [searchQuery, supplements, activeTab, selectedCategory]);

  useEffect(() => {
    // Reset selectedCategory when tab changes
    setSelectedCategory("all");
  }, [activeTab]);

  const toggleSupplement = (id: number) => {
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
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    
    if (success) {
      onOpenChange(false);
    }
  };

  const isSelected = (id: number) => {
    if (activeTab === "supplements") {
      return selectedSupplements.includes(id);
    } else {
      return selectedVitamins.includes(id);
    }
  };

  const getTypeIcon = (type: 'supplement' | 'vitamin') => {
    return type === 'supplement' ? <Pill className="h-4 w-4" /> : <FlaskConical className="h-4 w-4" />;
  };

  const getCurrentTitle = () => {
    return activeTab === "supplements" ? "مکمل‌های ورزشی" : "ویتامین‌ها";
  };

  const supplementCategories = categories.filter(cat => cat.type === "supplement");
  const vitaminCategories = categories.filter(cat => cat.type === "vitamin");
  const relevantCategories = activeTab === "supplements" ? supplementCategories : vitaminCategories;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full p-0 sm:max-w-full flex flex-col border-0"
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0">
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-md">
                    {activeTab === "supplements" ? (
                      <Pill className="h-5 w-5 text-white" />
                    ) : (
                      <FlaskConical className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-bold text-foreground">
                      {getCurrentTitle()}
                    </SheetTitle>
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
                placeholder="جستجو..."
                className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b bg-muted/10 shrink-0">
            <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1">
              <TabsTrigger 
                value="supplements"
                onClick={() => setActiveTab("supplements")}
                className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                data-state={activeTab === "supplements" ? "active" : "inactive"}
              >
                <Pill className="h-4 w-4 ml-2" />
                مکمل‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="vitamins"
                onClick={() => setActiveTab("vitamins")}
                className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                data-state={activeTab === "vitamins" ? "active" : "inactive"}
              >
                <FlaskConical className="h-4 w-4 ml-2" />
                ویتامین‌ها
              </TabsTrigger>
            </TabsList>
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
                    <h3 className="text-sm font-medium mb-2 text-foreground">فیلتر براساس دسته‌بندی</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-primary/10"
                        onClick={() => setSelectedCategory("all")}
                      >
                        همه دسته‌بندی‌ها
                      </Badge>
                      {relevantCategories.map((category) => (
                        <Badge 
                          key={category.id}
                          variant={selectedCategory === category.name ? "default" : "outline"}
                          className="cursor-pointer transition-all hover:bg-primary/10"
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              {filteredSupplements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    {activeTab === "supplements" ? 
                      <Pill className="h-8 w-8 text-purple-500 dark:text-purple-400" /> :
                      <FlaskConical className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    }
                  </div>
                  <h3 className="font-medium text-lg text-foreground">
                    {activeTab === "supplements" ? "هیچ مکملی یافت نشد" : "هیچ ویتامینی یافت نشد"}
                  </h3>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                  {filteredSupplements.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <div
                        className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${
                          isSelected(item.id)
                            ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                            : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
                        }`}
                        onClick={() => toggleSupplement(item.id)}
                      >
                        <div className="flex gap-3 items-start">
                          <div
                            className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                              isSelected(item.id)
                                ? "bg-primary"
                                : "border-2 border-muted-foreground/30"
                            }`}
                          >
                            {isSelected(item.id) && (
                              <Check className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <div>
                              <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "rounded-full flex items-center gap-1.5 px-2 font-normal",
                                    item.type === "supplement" 
                                      ? "border-purple-200 bg-purple-50/50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                                      : "border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                                  )}
                                >
                                  {getTypeIcon(item.type)}
                                  <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-gray-50/50 border-gray-200 text-gray-700 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-400 rounded-full text-xs font-normal"
                                >
                                  {item.category}
                                </Badge>
                              </div>
                              {item.dosage && (
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs font-medium text-muted-foreground">دوز:</span>
                                  <span className="text-xs">{item.dosage}</span>
                                </div>
                              )}
                              {item.timing && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-muted-foreground">زمان مصرف:</span>
                                  <span className="text-xs">{item.timing}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="divide-y">
                  {filteredSupplements.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`p-4 transition-all cursor-pointer hover:bg-muted/50 ${
                          isSelected(item.id)
                            ? "bg-primary/5 dark:bg-primary/10"
                            : ""
                        }`}
                        onClick={() => toggleSupplement(item.id)}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                              isSelected(item.id)
                                ? "bg-primary"
                                : "border-2 border-muted-foreground/30"
                            }`}
                          >
                            {isSelected(item.id) && (
                              <Check className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                              <div className="flex gap-1.5">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "rounded-full flex items-center gap-1.5 px-2 font-normal",
                                    item.type === "supplement" 
                                      ? "border-purple-200 bg-purple-50/50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                                      : "border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                                  )}
                                >
                                  {getTypeIcon(item.type)}
                                  <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-gray-50/50 border-gray-200 text-gray-700 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-400 rounded-full text-xs font-normal"
                                >
                                  {item.category}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 mt-1">
                              {item.dosage && (
                                <div className="text-xs flex items-center gap-1">
                                  <span className="font-medium text-foreground">دوز:</span>
                                  <span className="text-muted-foreground">{item.dosage}</span>
                                </div>
                              )}
                              {item.timing && (
                                <div className="text-xs flex items-center gap-1">
                                  <span className="font-medium text-foreground">زمان مصرف:</span>
                                  <span className="text-muted-foreground">{item.timing}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer */}
          <SheetFooter className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: (activeTab === "supplements" ? selectedSupplements.length : selectedVitamins.length) > 0 ? 1 : 0.9, 
                  opacity: (activeTab === "supplements" ? selectedSupplements.length : selectedVitamins.length) > 0 ? 1 : 0 
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 text-white",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500" 
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {activeTab === "supplements" 
                  ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده`
                  : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده`
                }
              </motion.div>
              
              <AnimatePresence>
                {((activeTab === "supplements" && selectedSupplements.length > 0) || 
                  (activeTab === "vitamins" && selectedVitamins.length > 0)) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => {
                        if (activeTab === "supplements") {
                          setSelectedSupplements([]);
                        } else {
                          setSelectedVitamins([]);
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                      پاک کردن انتخاب‌ها
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
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
                className={cn(
                  "gap-2 text-white border-0",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                )}
                disabled={selectedSupplements.length === 0 && selectedVitamins.length === 0}
              >
                <Save className="h-4 w-4" />
                ذخیره
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
