
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Supplement } from "@/types/supplement";
import { Plus, Search, Edit, Trash2, Pill, Heart } from "lucide-react";
import { EmptyStateCard } from "./EmptyStateCard";

interface ModernSupplementGridProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddSupplement: () => void;
  activeTab: "supplement" | "vitamin";
}

export const ModernSupplementGrid: React.FC<ModernSupplementGridProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement,
  searchQuery,
  setSearchQuery,
  onAddSupplement,
  activeTab
}) => {
  const filteredSupplements = supplements.filter(supplement =>
    supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplement.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-l ${
            activeTab === 'supplement' 
              ? 'from-green-500 to-emerald-600' 
              : 'from-purple-500 to-pink-600'
          }`}>
            {activeTab === 'supplement' ? (
              <Pill className="h-6 w-6 text-white" />
            ) : (
              <Heart className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
            </h3>
            <p className="text-gray-600">
              مدیریت {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
            </p>
          </div>
        </div>
        
        <Button
          onClick={onAddSupplement}
          className={`bg-gradient-to-l ${
            activeTab === 'supplement' 
              ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
              : 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
          } text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300`}
        >
          <Plus className="h-5 w-5 ml-2" />
          افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      {filteredSupplements.length === 0 ? (
        searchQuery ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 mb-2">نتیجه‌ای یافت نشد</div>
            <div className="text-sm text-gray-400">
              هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} با این عبارت پیدا نشد
            </div>
          </motion.div>
        ) : (
          <EmptyStateCard
            type="supplement"
            supplementType={activeTab}
            onAction={onAddSupplement}
          />
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSupplements.map((supplement, index) => (
            <motion.div
              key={supplement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-l ${
                    supplement.type === 'supplement' 
                      ? 'from-green-100 to-emerald-100' 
                      : 'from-purple-100 to-pink-100'
                  }`}>
                    {supplement.type === 'supplement' ? (
                      <Pill className={`h-5 w-5 ${
                        supplement.type === 'supplement' ? 'text-green-600' : 'text-purple-600'
                      }`} />
                    ) : (
                      <Heart className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {supplement.name}
                    </h4>
                    <span className="text-sm text-gray-500">{supplement.category}</span>
                  </div>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditSupplement(supplement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteSupplement(supplement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                {supplement.dosage && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">دوز مصرف:</span>
                    <span className="font-medium text-gray-800">{supplement.dosage}</span>
                  </div>
                )}
                
                {supplement.timing && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">زمان مصرف:</span>
                    <span className="font-medium text-gray-800">{supplement.timing}</span>
                  </div>
                )}
                
                {supplement.notes && (
                  <div className="text-sm">
                    <span className="text-gray-600">یادداشت:</span>
                    <p className="text-gray-700 mt-1 text-xs leading-relaxed">
                      {supplement.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
