
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Folder, Edit2, Trash2, Hash } from "lucide-react";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernCategoryManagementProps {
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  type: "supplement" | "vitamin";
}

export const ModernCategoryManagement: React.FC<ModernCategoryManagementProps> = ({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  selectedCategory,
  setSelectedCategory,
  type,
}) => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-l from-indigo-500 to-purple-600 rounded-xl text-white">
            <Folder className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              دسته‌بندی {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
            </h3>
            <p className="text-gray-600 text-sm">
              {toPersianNumbers(categories.length)} دسته‌بندی موجود
            </p>
          </div>
        </div>
        
        <Button
          onClick={onAddCategory}
          className="bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 ml-2" />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* Categories List */}
      {categories.length > 0 ? (
        <div className="space-y-4">
          {/* All Categories Button */}
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
              selectedCategory === null
                ? "border-indigo-500 bg-gradient-to-l from-indigo-50 to-purple-50 shadow-lg"
                : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                selectedCategory === null ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600"
              }`}>
                <Hash className="h-4 w-4" />
              </div>
              <span className="font-medium text-gray-800">همه دسته‌بندی‌ها</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {toPersianNumbers(categories.length)} دسته
            </Badge>
          </motion.button>

          {/* Individual Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 group cursor-pointer ${
                  selectedCategory === category.name
                    ? "border-purple-500 bg-gradient-to-l from-purple-50 to-pink-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      selectedCategory === category.name 
                        ? "bg-purple-500 text-white" 
                        : "bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600"
                    }`}>
                      <Folder className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category);
                      }}
                      className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  دسته‌بندی {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Folder className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            هیچ دسته‌بندی وجود ندارد
          </h3>
          <p className="text-gray-500 mb-6">
            برای شروع، اولین دسته‌بندی خود را ایجاد کنید
          </p>
          <Button
            onClick={onAddCategory}
            className="bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
          >
            <Plus className="h-4 w-4 ml-2" />
            ایجاد دسته‌بندی
          </Button>
        </div>
      )}
    </div>
  );
};
