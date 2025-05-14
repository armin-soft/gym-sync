import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, LayoutGrid, List, Filter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SupplementList } from "@/components/supplements/SupplementList";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Supplement } from "@/types/supplement";

interface SupplementContentProps {
  type: 'supplement' | 'vitamin';
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementContent = ({
  type,
  supplements,
  onAdd,
  onEdit,
  onDelete,
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter supplements based on search query
  const filteredSupplements = supplements.filter(item => {
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const getHeaderBgClass = () => {
    return cn(
      "p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 rounded-t-xl sm:rounded-t-2xl",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600/10 to-violet-500/10 dark:from-purple-900/30 dark:to-violet-800/30" 
        : "bg-gradient-to-r from-blue-600/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-800/30"
    );
  };
  
  const getMainIconClass = () => {
    return cn(
      "p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg bg-gradient-to-br",
      type === 'supplement'
        ? "from-purple-500 to-violet-600"
        : "from-blue-500 to-indigo-600"
    );
  };
  
  const getAddButtonClass = () => {
    return cn(
      "gap-1.5 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg sm:rounded-xl",
      deviceInfo.isMobile ? "text-xs px-2 py-1" : "text-sm",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
    );
  };
  
  return (
    <Card className="overflow-hidden border-none shadow-xl backdrop-blur-sm rounded-xl sm:rounded-2xl h-full flex flex-col w-full">
      <div className={getHeaderBgClass()}>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={getMainIconClass()}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white">
              {type === 'supplement' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31" />
                  <path d="M14 9.3V1.99" />
                  <path d="M8.5 2h7" />
                  <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
                  <path d="M5.58 16.5h12.85" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z" />
                </svg>
              )}
            </div>
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {type === 'supplement' ? 'مکمل های ورزشی' : 'ویتامین ها'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
              {type === 'supplement' 
                ? 'لیست تمام مکمل های ورزشی شما' 
                : 'لیست تمام ویتامین های شما'}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onAdd}
          className={getAddButtonClass()}
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-3 sm:p-4 md:p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-1 overflow-hidden flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`جستجو در ${type === 'supplement' ? 'مکمل ها' : 'ویتامین ها'}...`}
                className={cn(
                  "pr-7 sm:pr-10 text-right rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
                  deviceInfo.isMobile ? "h-8 text-xs" : "h-9 sm:h-10 text-sm"
                )}
              />
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              {!deviceInfo.isMobile && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                            "w-8 h-8 sm:w-9 sm:h-9",
                            viewMode === "grid" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          )}
                          onClick={() => setViewMode("grid")}
                        >
                          <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">نمایش شبکه‌ای</p>
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
                            "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                            "w-8 h-8 sm:w-9 sm:h-9",
                            viewMode === "list" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          )}
                          onClick={() => setViewMode("list")}
                        >
                          <List className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">نمایش لیستی</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                        "w-8 h-8 sm:w-9 sm:h-9",
                        showFilters && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      )}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">فیلترها</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-200 dark:border-gray-800 pb-3 sm:pb-4 mb-3 sm:mb-4 overflow-hidden"
              >
                <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl">
                  <h4 className="text-xs sm:text-sm font-medium mb-2">فیلترها</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      همه
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      پروتئین
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      کراتین
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 overflow-hidden w-full"
          >
            <div className="h-full overflow-auto">
              <SupplementList
                supplements={filteredSupplements.filter(s => s.type === type)}
                onEdit={onEdit}
                onDelete={onDelete}
                onAdd={onAdd}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};
