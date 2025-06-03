
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Pill, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { GridHeader } from "./ModernSupplementGrid/GridHeader";
import { SupplementCard } from "./ModernSupplementGrid/SupplementCard";

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
      <GridHeader
        activeTab={activeTab}
        filteredCount={filteredSupplements.length}
        hasCategories={hasCategories}
        onAddSupplement={onAddSupplement}
      />

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
                  <SupplementCard
                    key={supplement.id}
                    supplement={supplement}
                    activeTab={activeTab}
                    onEdit={onEditSupplement}
                    onDelete={onDeleteSupplement}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
};
