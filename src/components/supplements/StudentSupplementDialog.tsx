
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Plus, Check, ChevronLeft, Pill, LayoutGrid, ListFilter, SlidersHorizontal } from "lucide-react";
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
  onSave: (data: {
    supplements: number[];
    vitamins: number[];
  }) => boolean;
  initialSupplements: number[];
  initialVitamins: number[];
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = []
}: StudentSupplementDialogProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Initialize selected supplements and vitamins when dialog opens
  useEffect(() => {
    if (open) {
      console.log("Dialog opened with initial supplements:", initialSupplements);
      console.log("Dialog opened with initial vitamins:", initialVitamins);
      setSelectedSupplements(initialSupplements);
      setSelectedVitamins(initialVitamins);
    }
  }, [open, initialSupplements, initialVitamins]);

  // Load supplements and categories from localStorage
  useEffect(() => {
    try {
      // Load supplements
      const savedSupplements = localStorage.getItem("supplements");
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        setSupplements(Array.isArray(parsedSupplements) ? parsedSupplements : []);
      }

      // Load categories
      const savedCategories = localStorage.getItem("supplementCategories");
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(Array.isArray(parsedCategories) ? parsedCategories : []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setSupplements([]);
      setCategories([]);
    }
  }, []);

  // Filter items based on search, tab and category
  useEffect(() => {
    let filtered = supplements;
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab === "supplements") {
      filtered = filtered.filter(item => item.type === "supplement");
    } else {
      filtered = filtered.filter(item => item.type === "vitamin");
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, supplements, activeTab, selectedCategory]);

  const toggleItem = (id: number, type: "supplement" | "vitamin") => {
    if (type === "supplement") {
      setSelectedSupplements(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    }
  };

  const handleSave = () => {
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    return success;
  };

  const isSelected = (id: number, type: "supplement" | "vitamin") => {
    return type === "supplement" ? selectedSupplements.includes(id) : selectedVitamins.includes(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <DialogHeader className="px-6 py-4 border-b bg-white dark:bg-gray-800/50 shadow-sm flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={() => onOpenChange(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-md">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground">مدیریت مکمل‌ها و ویتامین‌ها</DialogTitle>
                <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className={cn("h-9 w-9 border-muted transition-colors", viewMode === "grid" && "bg-primary/10 text-primary")} onClick={() => setViewMode("grid")}>
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
                  <Button variant="outline" size="icon" className={cn("h-9 w-9 border-muted transition-colors", viewMode === "list" && "bg-primary/10 text-primary")} onClick={() => setViewMode("list")}>
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
                  <Button variant="outline" size="icon" className={cn("h-9 w-9 border-muted transition-colors", showFilters && "bg-primary/10 text-primary")} onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs font-medium">فیلترها</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Search */}
          <div className="px-6 py-3 border-b bg-muted/20 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="جستجو در مکمل‌ها و ویتامین‌ها..." 
                className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
                transition={{duration: 0.2}}
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
                      {categories
                        .filter(cat => cat.type === (activeTab === "supplements" ? "supplement" : "vitamin"))
                        .map(category => (
                          <Badge 
                            key={category.id} 
                            variant={selectedCategory === category.name ? "default" : "outline"} 
                            className="cursor-pointer transition-all hover:bg-primary/10" 
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            {category.name}
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
              onValueChange={value => {
                setActiveTab(value as "supplements" | "vitamins");
                setSelectedCategory("all");
              }} 
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b bg-muted/10 shrink-0">
                <TabsList className="h-11 bg-transparent p-1 gap-1 rounded-none border-b-0">
                  <TabsTrigger 
                    value="supplements" 
                    className="h-9 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
                  >
                    مکمل‌ها
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vitamins" 
                    className="h-9 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200"
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
                  {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <Pill className="h-8 w-8 text-violet-500 dark:text-violet-400" />
                      </div>
                      <h3 className="font-medium text-lg text-foreground">
                        هیچ {activeTab === "supplements" ? "مکملی" : "ویتامینی"} یافت نشد
                      </h3>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                      {filteredItems.map(item => (
                        <motion.div 
                          key={item.id} 
                          initial={{opacity: 0, scale: 0.95}}
                          animate={{opacity: 1, scale: 1}}
                          transition={{duration: 0.2}}
                          layout
                        >
                          <div 
                            className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${isSelected(item.id, item.type) ? "border-primary/30 bg-primary/5 dark:bg-primary/10" : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"}`} 
                            onClick={() => toggleItem(item.id, item.type)}
                          >
                            <div className="flex gap-3 items-start">
                              <div className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected(item.id, item.type) ? "bg-primary" : "border-2 border-muted-foreground/30"}`}>
                                {isSelected(item.id, item.type) && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    <span className="text-xs px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-xs flex items-center gap-1">
                                    <span className="font-medium text-foreground">دوز مصرف:</span>
                                    <span className="text-muted-foreground">{item.dosage}</span>
                                  </div>
                                  <div className="text-xs flex items-center gap-1">
                                    <span className="font-medium text-foreground">زمان مصرف:</span>
                                    <span className="text-muted-foreground">{item.timing}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredItems.map(item => (
                        <motion.div 
                          key={item.id} 
                          initial={{opacity: 0, y: 5}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.2}}
                        >
                          <div 
                            className={`p-4 transition-all cursor-pointer hover:bg-muted/50 ${isSelected(item.id, item.type) ? "bg-primary/5 dark:bg-primary/10" : ""}`} 
                            onClick={() => toggleItem(item.id, item.type)}
                          >
                            <div className="flex gap-3">
                              <div className={`w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected(item.id, item.type) ? "bg-primary" : "border-2 border-muted-foreground/30"}`}>
                                {isSelected(item.id, item.type) && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                  <div className="flex gap-1.5">
                                    <span className="text-xs px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-4 mt-1">
                                  <div className="text-xs flex items-center gap-1">
                                    <span className="font-medium text-foreground">دوز مصرف:</span>
                                    <span className="text-muted-foreground">{item.dosage}</span>
                                  </div>
                                  <div className="text-xs flex items-center gap-1">
                                    <span className="font-medium text-foreground">زمان مصرف:</span>
                                    <span className="text-muted-foreground">{item.timing}</span>
                                  </div>
                                </div>
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

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{scale: 0.9, opacity: 0}}
                animate={{
                  scale: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0.9,
                  opacity: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0
                }} 
                className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                {toPersianNumbers(selectedSupplements.length + selectedVitamins.length)} مورد انتخاب شده
              </motion.div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button 
                onClick={handleSave} 
                className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0" 
                disabled={selectedSupplements.length + selectedVitamins.length === 0}
              >
                <Save className="h-4 w-4" />
                ذخیره
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
