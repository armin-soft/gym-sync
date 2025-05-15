
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Supplement, SupplementCategory } from "@/types/supplement";

// UI Components
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Icons
import { 
  Pill, Beaker, Search, Save, X, Check, ChevronLeft, ChevronDown,
  LayoutGrid, List, Filter, SlidersHorizontal, Star, Heart, Clock
} from "lucide-react";

// Custom hooks
import { useSupplementDialog } from "./supplements/useSupplementDialog";

interface ModernStudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {
    supplements: number[];
    vitamins: number[];
  }) => boolean;
  initialSupplements: number[];
  initialVitamins: number[];
  supplements?: Supplement[];
  categories?: SupplementCategory[];
}

export function ModernStudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
  supplements = [],
  categories = []
}: ModernStudentSupplementDialogProps) {
  const deviceInfo = useDeviceInfo();
  
  const {
    selectedSupplements,
    selectedVitamins,
    searchQuery,
    setSearchQuery,
    filteredItems,
    activeTab,
    setActiveTab,
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
    selectedCategory,
    setSelectedCategory,
    toggleItem,
    isSelected,
    relevantCategories,
    getSelectedCount
  } = useSupplementDialog(initialSupplements, initialVitamins, deviceInfo.isMobile);

  // Handle saving supplements
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 m-0 max-w-full h-full w-full overflow-hidden border-none rounded-none dark:bg-gray-950 bg-gray-50" dir="rtl">
        <div className="flex flex-col h-full w-full">
          {/* Header */}
          <header className={cn(
            "flex items-center justify-between border-b border-gray-100 dark:border-gray-800",
            "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950",
            "py-4 px-4 md:px-6 lg:px-8"
          )}>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  activeTab === "supplements" 
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" 
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                )}>
                  {activeTab === "supplements" 
                    ? <Beaker className="h-5 w-5" /> 
                    : <Pill className="h-5 w-5" />
                  }
                </div>
                
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {activeTab === "supplements" ? "مکمل‌های" : "ویتامین‌های"} {studentName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {toPersianNumbers(getSelectedCount())} مورد انتخاب شده
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "supplements" | "vitamins")} className="flex flex-1 h-full overflow-hidden">
            {/* Tab Headers */}
            <div className="flex flex-col h-full w-full">
              <div className="border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 lg:px-8">
                <TabsList className="bg-transparent p-0 h-12">
                  <TabsTrigger 
                    value="supplements" 
                    className={cn(
                      "data-[state=active]:shadow-none relative rounded-none pb-3 pt-2.5 h-12",
                      "text-base font-medium transition-colors",
                      "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      "border-b-2 border-transparent data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-500",
                      "data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-400"
                    )}
                  >
                    <Beaker className="h-4 w-4 mr-2" />
                    مکمل‌ها
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vitamins" 
                    className={cn(
                      "data-[state=active]:shadow-none relative rounded-none pb-3 pt-2.5 h-12",
                      "text-base font-medium transition-colors",
                      "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      "border-b-2 border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-500",
                      "data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400"
                    )}
                  >
                    <Pill className="h-4 w-4 mr-2" />
                    ویتامین‌ها
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex flex-col h-full overflow-hidden">
                {/* Search and Filter Bar */}
                <div className="border-b border-gray-100 dark:border-gray-800 p-3 md:p-4 lg:p-5 flex items-center gap-4 bg-gray-50 dark:bg-gray-900">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`جستجو در ${activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className={cn(
                              "border-gray-200 dark:border-gray-700",
                              viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                            )}
                          >
                            {viewMode === "grid" ? (
                              <List className="h-4 w-4" />
                            ) : (
                              <LayoutGrid className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-xs">
                            {viewMode === "grid" ? "نمایش لیستی" : "نمایش کارتی"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                              "border-gray-200 dark:border-gray-700",
                              showFilters ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                            )}
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-xs">فیلترها</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                {/* Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80"
                    >
                      <div className="p-3 md:p-4 lg:p-5 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            دسته‌بندی‌ها
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge 
                              variant={selectedCategory === "all" ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer transition-colors text-xs",
                                selectedCategory === "all" ? (
                                  activeTab === "supplements" 
                                    ? "bg-violet-600 hover:bg-violet-700" 
                                    : "bg-blue-600 hover:bg-blue-700"
                                ) : (
                                  "hover:bg-gray-100 dark:hover:bg-gray-800"
                                )
                              )}
                              onClick={() => setSelectedCategory("all")}
                            >
                              همه دسته‌بندی‌ها
                            </Badge>
                            
                            {relevantCategories.map(category => (
                              <Badge 
                                key={category.id}
                                variant={selectedCategory === category.name ? "default" : "outline"}
                                className={cn(
                                  "cursor-pointer transition-colors text-xs",
                                  selectedCategory === category.name ? (
                                    activeTab === "supplements" 
                                      ? "bg-violet-600 hover:bg-violet-700" 
                                      : "bg-blue-600 hover:bg-blue-700"
                                  ) : (
                                    "hover:bg-gray-100 dark:hover:bg-gray-800"
                                  )
                                )}
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
                
                {/* Tabs Content */}
                <div className="flex-1 overflow-hidden">
                  <TabsContent 
                    value="supplements"
                    className="m-0 p-0 h-full flex-1 data-[state=inactive]:hidden data-[state=active]:flex flex-col"
                  >
                    <SupplementList
                      items={filteredItems}
                      viewMode={viewMode}
                      isSelected={isSelected}
                      toggleItem={toggleItem}
                      activeTab="supplements"
                    />
                  </TabsContent>
                  
                  <TabsContent 
                    value="vitamins"
                    className="m-0 p-0 h-full flex-1 data-[state=inactive]:hidden data-[state=active]:flex flex-col"
                  >
                    <SupplementList
                      items={filteredItems}
                      viewMode={viewMode}
                      isSelected={isSelected}
                      toggleItem={toggleItem}
                      activeTab="vitamins"
                    />
                  </TabsContent>
                </div>
              </div>
            </div>
          </Tabs>
          
          {/* Footer */}
          <div className="border-t border-gray-100 dark:border-gray-800 py-3 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: getSelectedCount() > 0 ? 1 : 0.9, 
                  opacity: getSelectedCount() > 0 ? 1 : 0 
                }}
                className={cn(
                  "rounded-full px-3 py-1 text-white text-xs flex items-center gap-1.5",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-violet-600 to-purple-600" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                )}
              >
                {toPersianNumbers(getSelectedCount())} {activeTab === "supplements" ? "مکمل" : "ویتامین"} انتخاب شده
              </motion.div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-200 dark:border-gray-700"
              >
                <X className="h-4 w-4 ml-2" />
                انصراف
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={getSelectedCount() === 0}
                className={cn(
                  "text-white",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                )}
              >
                <Save className="h-4 w-4 ml-2" />
                ذخیره
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SupplementListProps {
  items: Supplement[];
  viewMode: "grid" | "list";
  isSelected: (id: number) => boolean;
  toggleItem: (id: number) => void;
  activeTab: "supplements" | "vitamins";
}

function SupplementList({ items, viewMode, isSelected, toggleItem, activeTab }: SupplementListProps) {
  const deviceInfo = useDeviceInfo();
  
  if (items.length === 0) {
    return <SupplementEmptyState activeTab={activeTab} />;
  }
  
  return (
    <ScrollArea className="flex-1 h-full">
      {viewMode === "grid" ? (
        <div className={cn(
          "grid gap-3 p-3 md:p-4 lg:p-5",
          deviceInfo.isMobile ? "grid-cols-1" :
          deviceInfo.isTablet ? "grid-cols-2" :
          deviceInfo.isSmallLaptop ? "grid-cols-3" : "grid-cols-4"
        )}>
          {items.map(item => (
            <SupplementCard
              key={item.id}
              item={item}
              isSelected={isSelected(item.id)}
              toggleItem={() => toggleItem(item.id)}
              activeTab={activeTab}
            />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {items.map(item => (
            <SupplementListItem
              key={item.id}
              item={item}
              isSelected={isSelected(item.id)}
              toggleItem={() => toggleItem(item.id)}
              activeTab={activeTab}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}

function SupplementCard({ item, isSelected, toggleItem, activeTab }: { 
  item: Supplement; 
  isSelected: boolean; 
  toggleItem: () => void;
  activeTab: "supplements" | "vitamins";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={cn(
          "border rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
          "hover:shadow-md",
          isSelected ? (
            activeTab === "supplements" 
              ? "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-900/20" 
              : "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
          ) : (
            "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          ),
        )}
        onClick={toggleItem}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center justify-center rounded-full transition-colors",
                "w-5 h-5 flex-shrink-0",
                isSelected ? (
                  activeTab === "supplements" 
                    ? "bg-violet-600 text-white" 
                    : "bg-blue-600 text-white"
                ) : (
                  "border-2 border-gray-300 dark:border-gray-600"
                )
              )}>
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              
              <h3 className="font-medium text-base text-gray-800 dark:text-gray-200">{item.name}</h3>
            </div>
          </div>
          
          <div className="mt-3">
            <Badge className={cn(
              "text-xs",
              activeTab === "supplements" 
                ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 hover:bg-violet-200" 
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200"
            )}>
              {item.category}
            </Badge>
          </div>
          
          {(item.dosage || item.timing) && (
            <div className="mt-3 space-y-2">
              {item.dosage && (
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 gap-1.5">
                  <Star className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{item.dosage}</span>
                </div>
              )}
              
              {item.timing && (
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 gap-1.5">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{item.timing}</span>
                </div>
              )}
              
              {item.description && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {item.description}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SupplementListItem({ item, isSelected, toggleItem, activeTab }: {
  item: Supplement;
  isSelected: boolean;
  toggleItem: () => void;
  activeTab: "supplements" | "vitamins";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={cn(
          "p-4 cursor-pointer transition-colors",
          isSelected ? (
            activeTab === "supplements" 
              ? "bg-violet-50 dark:bg-violet-900/20" 
              : "bg-blue-50 dark:bg-blue-900/20"
          ) : (
            "hover:bg-gray-50 dark:hover:bg-gray-900/50"
          )
        )}
        onClick={toggleItem}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "w-5 h-5 flex-shrink-0",
            isSelected ? (
              activeTab === "supplements" 
                ? "bg-violet-600 text-white" 
                : "bg-blue-600 text-white"
            ) : (
              "border-2 border-gray-300 dark:border-gray-600"
            )
          )}>
            {isSelected && <Check className="h-3 w-3" />}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-base text-gray-800 dark:text-gray-200">{item.name}</h3>
              
              <Badge className={cn(
                "text-xs",
                activeTab === "supplements" 
                  ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 hover:bg-violet-200" 
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200"
              )}>
                {item.category}
              </Badge>
            </div>
            
            {(item.dosage || item.timing) && (
              <div className="mt-2 flex flex-wrap gap-4">
                {item.dosage && (
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 gap-1.5">
                    <Star className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{item.dosage}</span>
                  </div>
                )}
                
                {item.timing && (
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 gap-1.5">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{item.timing}</span>
                  </div>
                )}
              </div>
            )}
            
            {item.description && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                {item.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SupplementEmptyState({ activeTab }: { activeTab: "supplements" | "vitamins" }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className={cn(
        "rounded-full flex items-center justify-center mb-4 p-4",
        activeTab === "supplements" 
          ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" 
          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      )}>
        {activeTab === "supplements" ? <Beaker className="h-8 w-8" /> : <Pill className="h-8 w-8" />}
      </div>
      
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        هیچ {activeTab === "supplements" ? "مکمل" : "ویتامین"}ی پیدا نشد
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        لطفاً جستجوی خود را تغییر دهید یا فیلترها را بررسی کنید
      </p>
    </div>
  );
}
