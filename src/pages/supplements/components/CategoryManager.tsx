
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Plus, Edit2, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoryManagerProps {
  categories: SupplementCategory[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  activeTab: "supplement" | "vitamin";
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  activeTab,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradientColors = () => {
    return activeTab === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  const getHoverColors = () => {
    return activeTab === "supplement"
      ? "hover:from-emerald-600 hover:to-teal-700"
      : "hover:from-cyan-600 hover:to-blue-700";
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 md:p-8 mb-8" dir="rtl">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-gradient-to-br ${getGradientColors()} rounded-2xl`}>
            <Folder className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">دسته‌بندی‌ها</h2>
            <p className="text-sm md:text-base text-gray-500">
              مدیریت دسته‌بندی‌های {activeTab === "supplement" ? "مکمل‌ها" : "ویتامین‌ها"}
            </p>
          </div>
        </div>

        <Button
          onClick={onAddCategory}
          className={`bg-gradient-to-r ${getGradientColors()} ${getHoverColors()} text-white shadow-lg rounded-2xl px-4 md:px-6 py-2 md:py-3 text-sm md:text-base whitespace-nowrap`}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* Search - Responsive */}
      <div className="relative mb-6">
        <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
          <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </div>
        <Input
          placeholder="جستجو در دسته‌بندی‌ها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 md:pr-12 text-right border-2 border-gray-200 focus:border-emerald-400 rounded-2xl h-10 md:h-12 text-sm md:text-base"
          dir="rtl"
        />
      </div>

      {/* All Categories Button - Responsive */}
      <div className="mb-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          className={`rounded-2xl text-sm md:text-base ${
            selectedCategory === null
              ? `bg-gradient-to-r ${getGradientColors()} text-white`
              : "border-2 border-gray-200 hover:border-gray-300"
          }`}
          size="sm"
        >
          <Filter className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          همه دسته‌ها
          <Badge variant="secondary" className="mr-2 text-xs md:text-sm">
            {toPersianNumbers(categories.length)}
          </Badge>
        </Button>
      </div>

      {/* Categories Grid - Improved Responsive */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 md:py-16">
          <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${getGradientColors()} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
            <Folder className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">
            هیچ دسته‌بندی وجود ندارد
          </h3>
          <p className="text-sm md:text-base text-gray-500 mb-6">
            اولین دسته‌بندی خود را ایجاد کنید
          </p>
          <Button
            onClick={onAddCategory}
            className={`bg-gradient-to-r ${getGradientColors()} ${getHoverColors()} text-white shadow-lg rounded-2xl px-6 md:px-8 py-2 md:py-3 text-sm md:text-base`}
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            ایجاد دسته‌بندی
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative p-4 md:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name
                    ? `border-emerald-400 bg-gradient-to-br ${getGradientColors()} text-white shadow-xl`
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                }`}
                onClick={() => onSelectCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 md:p-3 rounded-xl ${
                    selectedCategory === category.name
                      ? "bg-white/20"
                      : `bg-gradient-to-br ${getGradientColors()}`
                  }`}>
                    <Folder className={`w-4 h-4 md:w-5 md:h-5 ${
                      selectedCategory === category.name ? "text-white" : "text-white"
                    }`} />
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category);
                      }}
                      className="h-6 w-6 md:h-8 md:w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="h-6 w-6 md:h-8 md:w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className={`font-bold text-sm md:text-lg leading-tight ${
                  selectedCategory === category.name ? "text-white" : "text-gray-800"
                }`}>
                  {category.name}
                </h3>

                {selectedCategory === category.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 left-2 md:top-3 md:left-3"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
