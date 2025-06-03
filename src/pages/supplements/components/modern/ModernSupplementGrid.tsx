
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Pill, Heart, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernSupplementGridProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  onAddSupplement: () => void;
  activeTab: "supplement" | "vitamin";
  selectedCategory: string | null;
  categories: SupplementCategory[];
}

export const ModernSupplementGrid: React.FC<ModernSupplementGridProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement,
  onAddSupplement,
  activeTab,
  selectedCategory,
  categories,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter supplements
  const filteredSupplements = supplements.filter(supplement => {
    const matchesType = supplement.type === activeTab;
    const matchesSearch = !searchQuery || 
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplement.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || supplement.category === selectedCategory;
    
    return matchesType && matchesSearch && matchesCategory;
  });

  const hasCategories = categories.length > 0;

  return (
    <div className="space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {activeTab === 'supplement' ? (
            <Pill className="w-5 h-5 text-green-600" />
          ) : (
            <Heart className="w-5 h-5 text-purple-600" />
          )}
          {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
          <Badge variant="secondary" className="mr-2">
            {toPersianNumbers(filteredSupplements.length)}
          </Badge>
        </h2>

        {hasCategories && (
          <Button
            onClick={onAddSupplement}
            className={`${
              activeTab === 'supplement'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white rounded-lg`}
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        )}
      </div>

      {!hasCategories ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            {activeTab === 'supplement' ? (
              <Pill className="w-8 h-8 text-gray-400" />
            ) : (
              <Heart className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            ابتدا دسته‌بندی ایجاد کنید
          </h3>
          <p className="text-gray-500">
            برای افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} باید حداقل یک دسته‌بندی داشته باشید
          </p>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right border-gray-300 rounded-lg"
              dir="rtl"
            />
          </div>

          {/* Content */}
          {filteredSupplements.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                نتیجه‌ای یافت نشد
              </h3>
              <p className="text-gray-500">
                {searchQuery ? `هیچ موردی با عبارت "${searchQuery}" پیدا نشد` : 
                 `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} در این دسته‌بندی وجود ندارد`}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="mt-4"
                >
                  پاک کردن جستجو
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredSupplements.map((supplement) => (
                  <motion.div
                    key={supplement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activeTab === 'supplement' ? (
                          <Pill className="w-4 h-4 text-green-600" />
                        ) : (
                          <Heart className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditSupplement(supplement)}
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteSupplement(supplement.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <h3 className="font-medium text-gray-800">
                        {supplement.name}
                      </h3>
                      
                      <Badge variant="secondary" className="text-xs">
                        {supplement.category}
                      </Badge>

                      {supplement.dosage && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">دوز:</span> {toPersianNumbers(supplement.dosage)}
                        </p>
                      )}

                      {supplement.timing && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">زمان:</span> {supplement.timing}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
};
