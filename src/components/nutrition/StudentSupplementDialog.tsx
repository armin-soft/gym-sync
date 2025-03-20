
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
  Search, Save, X, PanelTopOpen, 
  Check, Pill, FlaskRound, Sparkles, ChevronLeft,
  LayoutGrid, ListFilter, SlidersHorizontal
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
  };

  const getSupplementTypeColor = (type: 'supplement' | 'vitamin') => {
    if (type === 'supplement') {
      return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/30 dark:border-purple-800";
    } else {
      return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
    }
  };

  const getCategoryIcon = (item: Supplement) => {
    return item.type === 'supplement' ? 
      <Pill className="h-3.5 w-3.5" /> : 
      <FlaskRound className="h-3.5 w-3.5" />;
  };

  const supplementCategories = categories.filter(cat => cat.type === "supplement");
  const vitaminCategories = categories.filter(cat => cat.type === "vitamin");

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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-md">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-right">
                    <SheetTitle className="text-lg font-bold text-foreground">مدیریت مکمل‌ها</SheetTitle>
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
                placeholder="جستجو در مکمل‌ها و ویتامین‌ها..."
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
                    <h3 className="text-sm font-medium mb-2 text-foreground text-right">فیلتر بر اساس دسته بندی</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-primary/10"
                        onClick={() => setSelectedCategory("all")}
                      >
                        همه دسته‌بندی‌ها
                      </Badge>
                      {activeTab === "supplements" ? 
                        supplementCategories.map((cat) => (
                          <Badge 
                            key={cat.id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:bg-primary/10"
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            {cat.name}
                          </Badge>
                        )) :
                        vitaminCategories.map((cat) => (
                          <Badge 
                            key={cat.id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:bg-primary/10"
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
              onValueChange={(value) => setActiveTab(value as "supplements" | "vitamins")}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b bg-muted/10 shrink-0">
                <TabsList className="h-11 w-full justify-start bg-transparent p-0 mr-1">
                  <TabsTrigger 
                    value="supplements"
                    className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                  >
                    مکمل‌ها
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vitamins"
                    className="h-11 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                  >
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
                  {filteredSupplements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        {activeTab === "supplements" ? 
                          <Pill className="h-8 w-8 text-purple-500 dark:text-purple-400" /> :
                          <FlaskRound className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        }
                      </div>
                      <h3 className="font-medium text-lg text-foreground">
                        {activeTab === "supplements" ? "هیچ مکملی یافت نشد" : "هیچ ویتامینی یافت نشد"}
                      </h3>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                      {filteredSupplements.map((item) => {
                        const isSelected = activeTab === "supplements" 
                          ? selectedSupplements.includes(item.id)
                          : selectedVitamins.includes(item.id);

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            layout
                          >
                            <div
                              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${
                                isSelected
                                  ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                                  : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
                              }`}
                              onClick={() => toggleSupplement(item.id)}
                            >
                              <div className="flex gap-3 items-start">
                                <div
                                  className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-primary"
                                      : "border-2 border-muted-foreground/30"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="h-3 w-3 text-primary-foreground" />
                                  )}
                                </div>
                                <div className="space-y-2 text-right">
                                  <div>
                                    <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSupplementTypeColor(item.type)}`}>
                                        {getCategoryIcon(item)}
                                        <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                      </span>
                                      <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                        {item.category}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs font-medium text-muted-foreground">دوز:</span>
                                      <span className="text-xs">{item.dosage}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs font-medium text-muted-foreground">زمان مصرف:</span>
                                      <span className="text-xs">{item.timing}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredSupplements.map((item) => {
                        const isSelected = activeTab === "supplements" 
                          ? selectedSupplements.includes(item.id)
                          : selectedVitamins.includes(item.id);
                          
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div
                              className={`p-4 transition-all cursor-pointer hover:bg-muted/50 ${
                                isSelected
                                  ? "bg-primary/5 dark:bg-primary/10"
                                  : ""
                              }`}
                              onClick={() => toggleSupplement(item.id)}
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-primary"
                                      : "border-2 border-muted-foreground/30"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="h-3 w-3 text-primary-foreground" />
                                  )}
                                </div>
                                
                                <div className="flex-1 text-right">
                                  <div className="flex items-start justify-between">
                                    <div className="flex gap-1.5">
                                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSupplementTypeColor(item.type)}`}>
                                        {getCategoryIcon(item)}
                                        <span>{item.type === "supplement" ? "مکمل" : "ویتامین"}</span>
                                      </span>
                                      <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                        {item.category}
                                      </span>
                                    </div>
                                    <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                  </div>
                                  
                                  <div className="flex justify-end gap-4 mt-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs">{item.timing}</span>
                                      <span className="text-xs font-medium text-muted-foreground">:زمان مصرف</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs">{item.dosage}</span>
                                      <span className="text-xs font-medium text-muted-foreground">:دوز</span>
                                    </div>
                                  </div>
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

          {/* Footer */}
          <SheetFooter className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: (selectedSupplements.length + selectedVitamins.length) > 0 ? 1 : 0.9, 
                  opacity: (selectedSupplements.length + selectedVitamins.length) > 0 ? 1 : 0 
                }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {activeTab === "supplements" 
                  ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده`
                  : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده`
                }
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
                className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
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
