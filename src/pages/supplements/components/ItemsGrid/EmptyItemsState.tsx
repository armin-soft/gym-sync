
import React from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";

interface EmptyItemsStateProps {
  activeTab: "supplement" | "vitamin";
  searchQuery: string;
  selectedCategory: string | null;
}

export const EmptyItemsState: React.FC<EmptyItemsStateProps> = ({
  activeTab,
  searchQuery,
  selectedCategory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 sm:py-16 lg:py-20"
      dir="rtl"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
          {searchQuery ? (
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          ) : (
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
          {searchQuery ? "نتیجه‌ای یافت نشد" : "هیچ موردی وجود ندارد"}
        </h3>
        
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          {searchQuery ? (
            <>هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} با عبارت "{searchQuery}" پیدا نشد</>
          ) : (
            <>هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} در دسته‌بندی "{selectedCategory}" وجود ندارد</>
          )}
        </p>
      </div>
    </motion.div>
  );
};
