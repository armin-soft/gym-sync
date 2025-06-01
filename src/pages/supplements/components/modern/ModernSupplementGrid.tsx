
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Grid, List, Pill, Heart, Edit2, Trash2 } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className={`p-3 rounded-xl ${
            activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
          }`}>
            {activeTab === 'supplement' ? (
              <Pill className="w-6 h-6 text-green-600" />
            ) : (
              <Heart className="w-6 h-6 text-purple-600" />
            )}
          </div>
          {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {toPersianNumbers(filteredSupplements.length)}
          </Badge>
        </h2>

        {hasCategories && (
          <Button
            onClick={onAddSupplement}
            className={`${
              activeTab === 'supplement'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
            } text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3`}
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        )}
      </div>

      {!hasCategories ? (
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${
              activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              {activeTab === 'supplement' ? (
                <Pill className="w-12 h-12 text-green-500" />
              ) : (
                <Heart className="w-12 h-12 text-purple-500" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              ابتدا دسته‌بندی ایجاد کنید
            </h3>
            <p className="text-gray-500 text-lg">
              برای افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} باید حداقل یک دسته‌بندی داشته باشید
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 pl-4 h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                dir="rtl"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {searchQuery && (
            <div className="text-sm text-gray-600">
              {toPersianNumbers(filteredSupplements.length)} نتیجه برای "{searchQuery}" پیدا شد
            </div>
          )}

          {/* Content */}
          {filteredSupplements.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${
                  activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  نتیجه‌ای یافت نشد
                </h3>
                <p className="text-gray-500 text-lg">
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
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`gap-6 ${
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "flex flex-col space-y-4"
              }`}
            >
              <AnimatePresence>
                {filteredSupplements.map((supplement, index) => (
                  <motion.div
                    key={supplement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activeTab === 'supplement' ? (
                          <Pill className="w-5 h-5 text-green-600" />
                        ) : (
                          <Heart className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditSupplement(supplement)}
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteSupplement(supplement.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {supplement.name}
                      </h3>
                      
                      <Badge 
                        variant="secondary" 
                        className={`${
                          activeTab === 'supplement' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {supplement.category}
                      </Badge>

                      {supplement.dosage && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">دوز مصرف:</span> {supplement.dosage}
                        </p>
                      )}

                      {supplement.timing && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">زمان مصرف:</span> {supplement.timing}
                        </p>
                      )}

                      {supplement.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {supplement.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};
