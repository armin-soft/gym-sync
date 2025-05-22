
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Pill, Beaker } from "lucide-react";
import { Supplement, SupplementCategory } from "@/types/supplement";

// Import refactored components
import { SupplementDialogHeader } from "./supplements/SupplementDialogHeader";
import { SupplementDialogSearch } from "./supplements/SupplementDialogSearch";
import { SupplementCategoryFilter } from "./supplements/SupplementCategoryFilter";
import { SupplementContent } from "./supplements/SupplementContent";
import { SupplementDialogFooter } from "./supplements/SupplementDialogFooter";
import { SupplementViewToggle } from "./supplements/SupplementViewToggle";
import { useSupplementDialog } from "./supplements/useSupplementDialog";

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
  supplements?: Supplement[];
  categories?: SupplementCategory[];
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
  supplements = [],
  categories = []
}: StudentSupplementDialogProps) {
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

  // Handle save
  const handleSave = () => {
    return onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col" dir="rtl">
        <DialogTitle className="sr-only">انتخاب مکمل‌ها و ویتامین‌ها برای {studentName}</DialogTitle>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "supplements" | "vitamins")} className="flex flex-col h-full w-full">
          {/* Header */}
          <div className={cn(
            "border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0",
            deviceInfo.isMobile ? "px-3 py-2" : deviceInfo.isTablet ? "px-4 py-3" : "px-6 py-4"
          )}>
            <div className="flex items-center justify-between">
              <SupplementDialogHeader 
                activeTab={activeTab} 
                studentName={studentName} 
              />
              
              <SupplementViewToggle 
                viewMode={viewMode} 
                setViewMode={setViewMode} 
                showFilters={showFilters} 
                setShowFilters={setShowFilters} 
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b bg-muted/10 shrink-0">
            <TabsList className={cn(
              "bg-transparent p-1 gap-1 rounded-none border-b-0",
              deviceInfo.isMobile ? "h-9" : "h-11"
            )}>
              <TabsTrigger 
                value="supplements" 
                className={cn(
                  "rounded-md data-[state=active]:bg-violet-50 data-[state=active]:text-violet-600 dark:data-[state=active]:bg-violet-900/20 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-none transition-colors duration-200",
                  deviceInfo.isMobile ? "h-7 text-xs" : "h-9 text-sm"
                )}
              >
                <Beaker className={deviceInfo.isMobile ? "w-3 h-3 ml-1" : "w-4 h-4 ml-2"} />
                مکمل‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="vitamins" 
                className={cn(
                  "rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none transition-colors duration-200",
                  deviceInfo.isMobile ? "h-7 text-xs" : "h-9 text-sm"
                )}
              >
                <Pill className={deviceInfo.isMobile ? "w-3 h-3 ml-1" : "w-4 h-4 ml-2"} />
                ویتامین‌ها
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search */}
          <div className={cn(
            "border-b bg-muted/20 shrink-0",
            deviceInfo.isMobile ? "px-3 py-2" : "px-6 py-3"
          )}>
            <SupplementDialogSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
            />
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <SupplementCategoryFilter 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                activeTab={activeTab}
                relevantCategories={relevantCategories}
              />
            )}
          </AnimatePresence>

          {/* Content */}
          <TabsContent value="supplements" className="h-full m-0 p-0">
            <SupplementContent
              filteredItems={filteredItems}
              activeTab="supplements"
              isSelected={isSelected}
              toggleItem={toggleItem}
              viewMode={viewMode}
            />
          </TabsContent>
          
          <TabsContent value="vitamins" className="h-full m-0 p-0">
            <SupplementContent
              filteredItems={filteredItems}
              activeTab="vitamins"
              isSelected={isSelected}
              toggleItem={toggleItem}
              viewMode={viewMode}
            />
          </TabsContent>

          {/* Footer */}
          <SupplementDialogFooter
            activeTab={activeTab}
            selectedCount={getSelectedCount()}
            onSave={handleSave}
            onCancel={() => onOpenChange(false)}
          />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
