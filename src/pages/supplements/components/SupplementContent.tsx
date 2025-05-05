
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PlusCircle, Plus, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SupplementList } from "@/components/SupplementList";
import { Supplement } from "@/types/supplement";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SupplementContentProps {
  type: 'supplement' | 'vitamin';
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const SupplementContent = ({
  type,
  supplements,
  onAdd,
  onEdit,
  onDelete,
  searchQuery = "",
  setSearchQuery,
  selectedCategory,
  onSelectCategory
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Filter supplements by type
  const typeFilteredItems = supplements.filter(s => s.type === type);

  // Count all categories for this supplement type
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    typeFilteredItems.forEach(item => {
      const count = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, count + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, [typeFilteredItems]);
  
  // Further filter by selected category and search query if provided
  const filteredItems = React.useMemo(() => {
    let filtered = typeFilteredItems;
    
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [typeFilteredItems, selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/60 rounded-3xl shadow-xl p-1 overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
      <div className={cn(
        "p-3 sm:p-4",
        "flex items-center gap-2 sm:gap-3 sticky top-0 z-10",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg",
        "border-b border-slate-200/70 dark:border-slate-800/70"
      )}>
        {/* Search Bar and Add Button */}
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder={`جستجوی ${type === 'supplement' ? 'مکمل' : 'ویتامین'}...`}
              value={searchQuery}
              onChange={e => setSearchQuery?.(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 h-10 sm:h-11",
                "bg-transparent dark:bg-slate-800/50",
                "border-slate-200 dark:border-slate-700/50",
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                "rounded-xl focus-visible:ring-violet-500"
              )}
            />
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onAdd}
            size="icon" 
            className={cn(
              "h-10 w-10 sm:h-11 sm:w-11 rounded-xl shadow-lg",
              "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
              "border border-white/10"
            )}
          >
            <Plus className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-10 w-10 sm:h-11 sm:w-11 rounded-xl",
            "bg-white dark:bg-slate-800",
            "border-slate-200 dark:border-slate-700"
          )}
        >
          <SlidersHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        </Button>
      </div>
      
      {/* Categories */}
      <div className={cn(
        "px-3 sm:px-4 py-2 sm:py-3 overflow-auto",
        "border-b border-slate-200/70 dark:border-slate-800/70",
        "bg-slate-50/80 dark:bg-slate-800/30"
      )}>
        <ScrollArea orientation="horizontal" className="w-full pb-2">
          <div className="flex gap-2 pr-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                onClick={() => onSelectCategory?.('all')} 
                className={cn(
                  "h-8 px-3 rounded-lg text-sm font-medium cursor-pointer",
                  "shadow-sm border border-slate-200/50 dark:border-slate-700/30",
                  !selectedCategory || selectedCategory === 'all'
                    ? type === 'supplement' 
                      ? "bg-violet-500 hover:bg-violet-600 text-white" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                )}
              >
                همه
              </Badge>
            </motion.div>
            
            {categories.map(category => (
              <motion.div 
                key={category.name} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  onClick={() => onSelectCategory?.(category.name)} 
                  className={cn(
                    "h-8 px-3 rounded-lg text-sm font-medium cursor-pointer",
                    "shadow-sm border border-slate-200/50 dark:border-slate-700/30",
                    selectedCategory === category.name
                      ? type === 'supplement' 
                        ? "bg-violet-500 hover:bg-violet-600 text-white" 
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                  )}
                >
                  {category.name}
                  <span className={cn(
                    "ml-1.5 py-0.5 px-1.5 text-xs rounded-md",
                    selectedCategory === category.name
                      ? "bg-white/20" 
                      : type === 'supplement'
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {category.count}
                  </span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Content */}
      <ScrollArea className="flex-1 px-3 sm:px-4 py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredItems.length > 0 ? (
            <SupplementList
              supplements={filteredItems}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ) : (
            <motion.div 
              variants={itemVariants}
              className={cn(
                "flex flex-col items-center justify-center h-60 sm:h-80 text-center p-6",
                "bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm",
                "rounded-2xl border border-slate-200/50 dark:border-slate-700/30"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full mb-4 flex items-center justify-center",
                type === 'supplement' 
                  ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              )}>
                {type === 'supplement' ? (
                  <FlaskConical className="h-8 w-8" />
                ) : (
                  <Pill className="h-8 w-8" />
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                هیچ {type === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6 max-w-md">
                برای افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'} جدید، روی دکمه افزودن کلیک کنید
              </p>
              <Button 
                onClick={onAdd}
                className={cn(
                  "rounded-xl",
                  type === 'supplement'
                    ? "bg-violet-500 hover:bg-violet-600"
                    : "bg-blue-500 hover:bg-blue-600"
                )}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'} جدید
              </Button>
            </motion.div>
          )}
          
          {/* Space at the bottom for better scrolling */}
          <div className="h-10" />
        </motion.div>
      </ScrollArea>
    </div>
  );
};
