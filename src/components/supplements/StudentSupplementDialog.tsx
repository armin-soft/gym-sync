import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Plus, Check, ChevronLeft, Pill, LayoutGrid, ListFilter, SlidersHorizontal, Beaker, Filter } from "lucide-react";
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
  supplements?: any[];
  categories?: any[];
}
export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
  supplements: propSupplements,
  categories: propCategories
}: StudentSupplementDialogProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<SupplementCategory[]>([]);

  // Initialize selected supplements and vitamins when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedSupplements(initialSupplements);
      setSelectedVitamins(initialVitamins);
    }
  }, [open, initialSupplements, initialVitamins]);

  // Load supplements and categories from localStorage or props
  useEffect(() => {
    try {
      // First check if we have supplements from props
      if (propSupplements && propSupplements.length > 0) {
        setSupplements(propSupplements);
      } else {
        // Fallback to localStorage
        const savedSupplements = localStorage.getItem("supplements");
        if (savedSupplements) {
          const parsedSupplements = JSON.parse(savedSupplements);
          setSupplements(Array.isArray(parsedSupplements) ? parsedSupplements : []);
        }
      }

      // First check if we have categories from props
      if (propCategories && propCategories.length > 0) {
        setCategories(propCategories);
      } else {
        // Fallback to localStorage
        const savedCategories = localStorage.getItem("supplementCategories");
        if (savedCategories) {
          const parsedCategories = JSON.parse(savedCategories);
          setCategories(Array.isArray(parsedCategories) ? parsedCategories : []);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setSupplements([]);
      setCategories([]);
    }
  }, [propSupplements, propCategories]);

  // Filter items based on search, tab and category
  useEffect(() => {
    let filtered = supplements;
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase()) || item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase()));
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
  const toggleItem = (id: number) => {
    if (activeTab === "supplements") {
      setSelectedSupplements(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
    } else {
      setSelectedVitamins(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
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
    return success;
  };
  const isSelected = (id: number) => {
    return activeTab === "supplements" ? selectedSupplements.includes(id) : selectedVitamins.includes(id);
  };
  const relevantCategories = categories.filter(cat => cat.type === (activeTab === "supplements" ? "supplement" : "vitamin"));
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] md:max-w-[100vw] lg:max-w-[100vw] xl:max-w-[100vw] w-[100vw] h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none shadow-xl" dir="rtl">
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value as "supplements" | "vitamins")} className="flex flex-col h-full w-full">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-md", activeTab === "supplements" ? "bg-gradient-to-br from-violet-400 to-purple-600" : "bg-gradient-to-br from-blue-400 to-indigo-600")}>
                  {activeTab === "supplements" ? <Beaker className="h-5 w-5 text-white" /> : <Pill className="h-5 w-5 text-white" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {activeTab === "supplements" ? "مدیریت مکمل‌ها" : "مدیریت ویتامین‌ها"}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">فیلترها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col h-full overflow-hidden">
            {/* Tabs */}
            <div className="border-b bg-muted/10 shrink-0">
              <TabsList className="h-11 bg-transparent p-1 gap-1 rounded-none border-b-0">
                <TabsTrigger value="supplements" className="h-9 rounded-md data-[state=active]:bg-violet-50 data-[state=active]:text-violet-600 dark:data-[state=active]:bg-violet-900/20 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-none transition-colors duration-200">
                  <Beaker className="w-4 h-4 ml-2" />
                  مکمل‌ها
                </TabsTrigger>
                <TabsTrigger value="vitamins" className="h-9 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none transition-colors duration-200">
                  <Pill className="w-4 h-4 ml-2" />
                  ویتامین‌ها
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b bg-muted/20 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={`جستجو در ${activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}...`} className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted text-right" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="flex-shrink-0 overflow-hidden bg-muted/10 border-b">
                  <div className="p-4">
                    <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
                      <div>
                        <h3 className="text-sm font-medium mb-2 text-foreground">فیلتر براساس دسته‌بندی</h3>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant={selectedCategory === "all" ? "default" : "outline"} className={cn("cursor-pointer transition-all hover:bg-primary/10", activeTab === "supplements" ? "data-[state=checked]:bg-violet-500 data-[state=checked]:hover:bg-violet-600" : "data-[state=checked]:bg-blue-500 data-[state=checked]:hover:bg-blue-600")} onClick={() => setSelectedCategory("all")}>
                            همه دسته‌بندی‌ها
                          </Badge>
                          {relevantCategories.map(category => <Badge key={category.id} variant={selectedCategory === category.name ? "default" : "outline"} className={cn("cursor-pointer transition-all hover:bg-primary/10", activeTab === "supplements" ? "data-[state=checked]:bg-violet-500 data-[state=checked]:hover:bg-violet-600" : "data-[state=checked]:bg-blue-500 data-[state=checked]:hover:bg-blue-600")} onClick={() => setSelectedCategory(category.name)}>
                              {category.name}
                            </Badge>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>}
            </AnimatePresence>

            {/* Items List */}
            <div className="flex-1 overflow-hidden">
              <TabsContent value="supplements" className="h-full">
                <ScrollArea className="h-full w-full">
                  {filteredItems.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900">
                        <Beaker className="h-8 w-8 text-violet-500 dark:text-violet-400" />
                      </div>
                      <h3 className="font-medium text-lg text-foreground">
                        هیچ مکملی یافت نشد
                      </h3>
                    </div> : <div className="p-4 space-y-4">
                      {filteredItems.map(item => <motion.div key={item.id} initial={{
                    opacity: 0,
                    y: 5
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    duration: 0.2
                  }}>
                          <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
                            <div className={cn("p-2 transition-all cursor-pointer hover:bg-muted/50 w-full rounded-lg", isSelected(item.id) ? "bg-violet-50 dark:bg-violet-900/20" : "")} onClick={() => toggleItem(item.id)}>
                              <div className="flex gap-3">
                                <div className={cn("w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors", isSelected(item.id) ? "bg-violet-500" : "border-2 border-muted-foreground/30")}>
                                  {isSelected(item.id) && <Check className="h-3 w-3 text-white" />}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                    <div className="flex gap-1.5">
                                      <span className="text-xs px-2 py-0.5 rounded-full border bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800">
                                        {item.category}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4 mt-1">
                                    <div className="text-xs flex items-center gap-1">
                                      <span className="font-medium text-foreground">دوز مصرف:</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(item.dosage)}</span>
                                    </div>
                                    <div className="text-xs flex items-center gap-1">
                                      <span className="font-medium text-foreground">زمان مصرف:</span>
                                      <span className="text-muted-foreground">{item.timing}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>)}
                    </div>}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="vitamins" className="h-full">
                <ScrollArea className="h-full w-full">
                  {filteredItems.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <Pill className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                      </div>
                      <h3 className="font-medium text-lg text-foreground">
                        هیچ ویتامینی یافت نشد
                      </h3>
                    </div> : <div className="p-4 space-y-4">
                      {filteredItems.map(item => <motion.div key={item.id} initial={{
                    opacity: 0,
                    y: 5
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    duration: 0.2
                  }}>
                          <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
                            <div className={cn("p-2 transition-all cursor-pointer hover:bg-muted/50 w-full rounded-lg", isSelected(item.id) ? "bg-blue-50 dark:bg-blue-900/20" : "")} onClick={() => toggleItem(item.id)}>
                              <div className="flex gap-3">
                                <div className={cn("w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors", isSelected(item.id) ? "bg-blue-500" : "border-2 border-muted-foreground/30")}>
                                  {isSelected(item.id) && <Check className="h-3 w-3 text-white" />}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                                    <div className="flex gap-1.5">
                                      <span className="text-xs px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                        {item.category}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4 mt-1">
                                    <div className="text-xs flex items-center gap-1">
                                      <span className="font-medium text-foreground">دوز مصرف:</span>
                                      <span className="text-muted-foreground">{toPersianNumbers(item.dosage)}</span>
                                    </div>
                                    <div className="text-xs flex items-center gap-1">
                                      <span className="font-medium text-foreground">زمان مصرف:</span>
                                      <span className="text-muted-foreground">{item.timing}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>)}
                    </div>}
                </ScrollArea>
              </TabsContent>
            </div>

            {/* Footer */}
            <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm border-t mt-auto bg-muted/20 shrink-0">
              <div className="flex items-center gap-2">
                <motion.div initial={{
                scale: 0.9,
                opacity: 0
              }} animate={{
                scale: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0.9,
                opacity: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0
              }} className={cn("px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5", activeTab === "supplements" ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-indigo-500")}>
                  <Plus className="h-3.5 w-3.5" />
                  {toPersianNumbers(activeTab === "supplements" ? selectedSupplements.length : selectedVitamins.length)} {activeTab === "supplements" ? "مکمل" : "ویتامین"} انتخاب شده
                </motion.div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
                  <X className="h-4 w-4" />
                  انصراف
                </Button>
                <Button onClick={handleSave} className={cn("gap-2 text-white border-0", activeTab === "supplements" ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700")} disabled={selectedSupplements.length + selectedVitamins.length === 0}>
                  <Save className="h-4 w-4" />
                  ذخیره
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>;
}