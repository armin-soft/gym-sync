
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Folder, Edit2, Trash2, Grid, Filter } from "lucide-react";
import { Category } from "../hooks/useSupplementManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoryManagementProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  onAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: number) => void;
  type: 'supplement' | 'vitamin';
}

export const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  type
}) => {
  return (
    <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-xl rounded-2xl overflow-hidden" dir="rtl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
              <Folder className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                دسته‌بندی {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
              </h2>
              <p className="text-gray-600">
                {toPersianNumbers(categories.length)} دسته‌بندی موجود
              </p>
            </div>
          </div>
          
          <Button
            onClick={onAddCategory}
            className="bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
          >
            <Plus className="h-5 w-5 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>

        {/* Categories */}
        {categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-l from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Folder className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              هیچ دسته‌بندی وجود ندارد
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              برای شروع، اولین دسته‌بندی خود را ایجاد کنید
            </p>
            <Button
              onClick={onAddCategory}
              className="bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-8 py-3 text-lg"
            >
              <Plus className="h-5 w-5 ml-2" />
              ایجاد دسته‌بندی
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* All Categories Button */}
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                selectedCategory === null
                  ? "border-blue-500 bg-gradient-to-l from-blue-50 to-indigo-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  selectedCategory === null ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  <Grid className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-lg text-gray-800">همه دسته‌بندی‌ها</h3>
                  <p className="text-sm text-gray-600">مشاهده تمام موارد</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1">
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
                        <Filter className="h-4 w-4" />
                      </div>
                      <div className="text-right">
                        <h4 className="font-bold text-gray-800">{category.name}</h4>
                        {category.description && (
                          <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
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
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
