
import React, { useState } from "react";
import { Search, Dumbbell, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExerciseCategory } from "@/types/exercise";

interface CategorySelectionStageProps {
  categories: ExerciseCategory[];
  setSelectedCategoryId: (id: number | null) => void;
  selectedExerciseType: string | null;
  onAddCategory: () => void;
  onEditCategory: (category: ExerciseCategory) => void;
  onDeleteCategory: (category: ExerciseCategory) => void;
}

export const CategorySelectionStage: React.FC<CategorySelectionStageProps> = ({
  categories,
  setSelectedCategoryId,
  selectedExerciseType,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = categories.filter(cat => 
    !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="h-full flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            دسته‌بندی‌های {selectedExerciseType}
          </h3>
          <Button
            size="sm"
            onClick={onAddCategory}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی دسته‌بندی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10"
          />
        </div>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.map((category) => (
            <motion.div 
              key={category.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <Card
                className="h-full cursor-pointer bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-purple-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCategory(category);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4 flex flex-col gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="mt-2 text-xs text-muted-foreground group-hover:text-purple-600 transition-colors">
                    انتخاب این دسته‌بندی
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                با عبارت جستجو شده هیچ دسته‌بندی پیدا نشد.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSearchTerm("")}
                  >
                    پاک کردن جستجو
                  </Button>
                )}
                <Button 
                  size="sm"
                  onClick={onAddCategory}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن دسته‌بندی
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
