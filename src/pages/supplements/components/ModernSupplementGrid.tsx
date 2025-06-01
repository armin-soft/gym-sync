
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pill, Heart, Edit2, Trash2, Clock, Zap } from "lucide-react";
import { Supplement } from "@/types/supplement";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  activeTab,
}) => {
  const filteredSupplements = supplements.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl text-white ${
            activeTab === 'supplement' 
              ? 'bg-gradient-to-l from-green-500 to-emerald-600'
              : 'bg-gradient-to-l from-purple-500 to-pink-600'
          }`}>
            {activeTab === 'supplement' ? <Pill className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
            </h3>
            <p className="text-gray-600 text-sm">
              {toPersianNumbers(filteredSupplements.length)} مورد یافت شد
            </p>
          </div>
        </div>
        
        <Button
          onClick={onAddSupplement}
          className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white ${
            activeTab === 'supplement'
              ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              : 'bg-gradient-to-l from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
          }`}
        >
          <Plus className="h-4 w-4 ml-2" />
          افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          dir="rtl"
        />
      </div>

      {/* Grid */}
      {filteredSupplements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSupplements.map((supplement, index) => (
            <motion.div
              key={supplement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
            >
              {/* Card Header */}
              <div className={`p-4 ${
                activeTab === 'supplement'
                  ? 'bg-gradient-to-l from-green-50 to-emerald-50'
                  : 'bg-gradient-to-l from-purple-50 to-pink-50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    activeTab === 'supplement'
                      ? 'bg-green-500 text-white'
                      : 'bg-purple-500 text-white'
                  }`}>
                    {activeTab === 'supplement' ? <Pill className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSupplement(supplement)}
                      className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteSupplement(supplement.id)}
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 text-lg mb-2">{supplement.name}</h4>
                <Badge 
                  variant="secondary" 
                  className={`${
                    activeTab === 'supplement'
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-purple-100 text-purple-700 border-purple-200'
                  }`}
                >
                  {supplement.category}
                </Badge>
              </div>
              
              {/* Card Body */}
              <div className="p-4 space-y-3">
                {supplement.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {supplement.description}
                  </p>
                )}
                
                <div className="space-y-2">
                  {supplement.dosage && (
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-600">دوز:</span>
                      <span className="font-medium text-gray-800">{supplement.dosage}</span>
                    </div>
                  )}
                  
                  {supplement.timing && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600">زمان:</span>
                      <span className="font-medium text-gray-800">{supplement.timing}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            activeTab === 'supplement'
              ? 'bg-green-100 text-green-500'
              : 'bg-purple-100 text-purple-500'
          }`}>
            {activeTab === 'supplement' ? <Pill className="h-10 w-10" /> : <Heart className="h-10 w-10" />}
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'نتیجه‌ای برای جستجوی شما یافت نشد' : `لطفاً اولین ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید`}
          </p>
          {!searchQuery && (
            <Button
              onClick={onAddSupplement}
              className={`rounded-xl ${
                activeTab === 'supplement'
                  ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-l from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
              } text-white`}
            >
              <Plus className="h-4 w-4 ml-2" />
              افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
