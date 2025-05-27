
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseTypeCategoryProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
  filteredExercises: any[];
  clearFilters: () => void;
}

const ExerciseTypeCategory: React.FC<ExerciseTypeCategoryProps> = ({
  selectedType,
  setSelectedType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  filteredExercises,
  clearFilters
}) => {
  const handleTypeSelect = (type: string) => {
    console.log("Type selected in selector:", type);
    setSelectedType(type);
    setSelectedCategoryId(null); // Reset category when type changes
  };

  const handleCategorySelect = (categoryId: number) => {
    console.log("Category selected in selector:", categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* Active Filters Display */}
      {(selectedType || selectedCategoryId) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">فیلترهای فعال:</span>
          {selectedType && (
            <Badge variant="secondary" className="gap-1">
              {selectedType}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-red-100"
                onClick={() => setSelectedType(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategoryId && (
            <Badge variant="secondary" className="gap-1">
              {filteredCategories.find(cat => cat.id === selectedCategoryId)?.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-red-100"
                onClick={() => setSelectedCategoryId(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-xs"
            onClick={clearFilters}
          >
            <Filter className="h-3 w-3" />
            پاک کردن همه
          </Button>
        </motion.div>
      )}

      {/* Exercise Types Selection */}
      {!selectedType && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">انتخاب نوع تمرین</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {exerciseTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-3 text-right justify-start bg-white/80 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <span className="font-medium">{type}</span>
                    <ChevronLeft className="w-4 h-4 mr-auto" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Selection */}
      {selectedType && !selectedCategoryId && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">انتخاب دسته‌بندی {selectedType}</h4>
              <Badge variant="outline" className="mr-auto">{toPersianNumbers(filteredCategories.length)} دسته</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-3 text-right justify-start bg-white/80 hover:bg-green-50 border-green-200 hover:border-green-300"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="text-right">
                      <div className="font-medium">{category.name}</div>
                      {category.description && (
                        <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                      )}
                    </div>
                    <ChevronLeft className="w-4 h-4 mr-auto" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise Count Display */}
      {selectedType && selectedCategoryId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700"
        >
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h5 className="font-medium text-gray-800 dark:text-gray-100">
                تمرین‌های {filteredCategories.find(cat => cat.id === selectedCategoryId)?.name}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {toPersianNumbers(filteredExercises.length)} تمرین موجود
              </p>
            </div>
            <Badge variant="default" className="bg-indigo-600">
              {toPersianNumbers(filteredExercises.length)}
            </Badge>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseTypeCategory;
