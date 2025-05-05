
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { SupplementCategory } from "@/types/supplement";

interface SupplementCategorySectionProps {
  categories: SupplementCategory[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementCategorySection: React.FC<SupplementCategorySectionProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };
  
  // Get color scheme based on active tab
  const getColorScheme = () => {
    if (activeTab === 'supplement') {
      return {
        primary: 'purple',
        selectedBg: 'bg-purple-100 dark:bg-purple-900/30',
        selectedText: 'text-purple-900 dark:text-purple-300',
        hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
        hoverBorder: 'hover:border-purple-200 dark:hover:border-purple-800',
        selectedBorder: 'border-purple-300 dark:border-purple-700',
      };
    } else {
      return {
        primary: 'blue',
        selectedBg: 'bg-blue-100 dark:bg-blue-900/30',
        selectedText: 'text-blue-900 dark:text-blue-300',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
        hoverBorder: 'hover:border-blue-200 dark:hover:border-blue-800',
        selectedBorder: 'border-blue-300 dark:border-blue-700',
      };
    }
  };
  
  const colorScheme = getColorScheme();
  
  return (
    <motion.div
      variants={containerVariants}
      className="relative bg-card rounded-2xl border shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">دسته‌بندی‌ها</h3>
        <Button variant="ghost" size="icon" onClick={onAddCategory}>
          <PlusCircle className={`h-5 w-5 text-${colorScheme.primary}-600`} />
        </Button>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-1">
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              size="sm" 
              className={`rounded-full border px-4 py-2 transition-all duration-200 ${!selectedCategory ? `${colorScheme.selectedBg} ${colorScheme.selectedText} ${colorScheme.selectedBorder}` : `${colorScheme.hoverBg} ${colorScheme.hoverBorder}`}`}
              onClick={() => setSelectedCategory("")}
            >
              همه
            </Button>
          </motion.div>
          
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`rounded-full border px-4 py-2 transition-all duration-200 ${selectedCategory === category.name ? `${colorScheme.selectedBg} ${colorScheme.selectedText} ${colorScheme.selectedBorder}` : `${colorScheme.hoverBg} ${colorScheme.hoverBorder}`}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
                
                {!deviceInfo.isMobile && (
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-5 w-5 rounded-full bg-background border-muted">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[120px]">
                        <DropdownMenuItem onClick={() => onEditCategory(category)}>
                          <Edit className="h-4 w-4 ml-2" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteCategory(category)} className="text-destructive">
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {deviceInfo.isMobile && (
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                size="sm" 
                className={`rounded-full border px-4 py-2 bg-background ${colorScheme.hoverBg} ${colorScheme.hoverBorder}`}
                onClick={onAddCategory}
              >
                <PlusCircle className="h-4 w-4 ml-1" />
                افزودن
              </Button>
            </motion.div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
      <div className="mt-2 text-xs text-muted-foreground">
        {toPersianNumbers(categories.length)} دسته‌بندی
      </div>
    </motion.div>
  );
};
