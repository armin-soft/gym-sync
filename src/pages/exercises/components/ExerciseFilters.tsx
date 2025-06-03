
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3X3, List } from "lucide-react";
import { SpeechToText } from "@/components/ui/speech-to-text";

interface ExerciseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  categories: any[];
  exerciseTypes: string[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  categories,
  exerciseTypes,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange
}) => {
  // فیلتر کردن دسته‌بندی‌ها بر اساس نوع انتخاب شده
  const filteredCategories = categories.filter(category => 
    selectedType ? category.type === selectedType : false
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* سلسله مراتب فیلترها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* انتخاب نوع تمرین */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  نوع تمرین (گام اول)
                </label>
                <Select 
                  value={selectedType || "none"} 
                  onValueChange={(value) => {
                    const newType = value === "none" ? null : value;
                    onTypeChange(newType);
                    // پاک کردن دسته‌بندی انتخاب شده هنگام تغییر نوع
                    if (newType !== selectedType) {
                      onCategoryChange(null);
                    }
                  }}
                >
                  <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                    <SelectValue placeholder="ابتدا نوع تمرین را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">انتخاب نوع تمرین</SelectItem>
                    {exerciseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* انتخاب دسته‌بندی */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  دسته‌بندی (گام دوم)
                </label>
                <Select 
                  value={selectedCategory || "none"} 
                  onValueChange={(value) => onCategoryChange(value === "none" ? null : value)}
                  disabled={!selectedType}
                >
                  <SelectTrigger className={`border-gray-200 focus:border-emerald-500 ${!selectedType ? 'opacity-50' : ''}`}>
                    <SelectValue placeholder={!selectedType ? "ابتدا نوع تمرین را انتخاب کنید" : "انتخاب دسته‌بندی"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">انتخاب دسته‌بندی</SelectItem>
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* نوار جستجو با گفتار به نوشتار */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                جستجو در حرکات
              </label>
              <SpeechToText
                value={searchQuery}
                onTranscriptChange={onSearchChange}
                placeholder="جستجو در حرکات تمرینی..."
                className="compact-speech"
              />
            </div>

            {/* کنترل‌های نمایش و مرتب‌سازی */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="w-32 border-gray-200 focus:border-emerald-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">نام</SelectItem>
                    <SelectItem value="category">دسته‌بندی</SelectItem>
                    <SelectItem value="recent">جدیدترین</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => onViewModeChange("grid")}
                  className={viewMode === "grid" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => onViewModeChange("list")}
                  className={viewMode === "list" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
