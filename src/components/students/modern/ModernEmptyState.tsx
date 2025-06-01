
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Users, Search } from "lucide-react";

interface ModernEmptyStateProps {
  searchQuery?: string;
  onAddStudent: () => void;
  onClearSearch?: () => void;
}

export const ModernEmptyState: React.FC<ModernEmptyStateProps> = ({
  searchQuery,
  onAddStudent,
  onClearSearch
}) => {
  const isSearchResult = Boolean(searchQuery);

  return (
    <Card className="p-12 text-center bg-gradient-to-bl from-gray-50 via-white to-gray-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/50 border-2 border-dashed border-gray-200 dark:border-slate-700">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
          <div className="relative bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center">
            {isSearchResult ? (
              <Search className="h-10 w-10 text-white" />
            ) : (
              <Users className="h-10 w-10 text-white" />
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {isSearchResult ? "نتیجه‌ای یافت نشد" : "هنوز شاگردی اضافه نشده"}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {isSearchResult 
              ? `برای عبارت "${searchQuery}" هیچ شاگردی پیدا نشد. لطفاً عبارت جستجو را تغییر دهید یا شاگرد جدید اضافه کنید.`
              : "برای شروع مدیریت شاگردان باشگاه، اولین شاگرد خود را اضافه کنید."
            }
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isSearchResult && onClearSearch && (
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="flex items-center gap-2 border-gray-300 dark:border-gray-700"
              >
                <Search className="h-4 w-4" />
                پاک کردن جستجو
              </Button>
            )}
            
            <Button
              onClick={onAddStudent}
              className="flex items-center gap-2 bg-gradient-to-l from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white shadow-md shadow-purple-500/20"
            >
              <UserPlus className="h-4 w-4" />
              افزودن شاگرد جدید
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  );
};
