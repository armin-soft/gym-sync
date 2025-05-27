
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: any[];
  type: 'supplement' | 'vitamin';
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  categories,
  type
}) => {
  const handleClearAll = () => {
    setSearchQuery("");
    onSelectCategory('all');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-indigo-100/50 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/20 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-300">
              فیلترهای پیشرفته
            </h4>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advanced-search">جستجوی دقیق</Label>
              <Input
                id="advanced-search"
                type="search"
                placeholder={`نام ${type === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label>دسته‌بندی</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  onClick={() => onSelectCategory('all')}
                  className="text-xs"
                >
                  همه موارد
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                    onClick={() => onSelectCategory(category.id.toString())}
                    className="text-xs"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              پاک کردن همه
            </Button>
            <Button size="sm" onClick={onClose}>
              اعمال فیلترها
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
