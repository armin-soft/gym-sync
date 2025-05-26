
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search, Plus, X } from "lucide-react";

interface ModernEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  onAddStudent: () => void;
}

export const ModernEmptyState: React.FC<ModernEmptyStateProps> = ({
  searchQuery,
  onClearSearch,
  onAddStudent
}) => {
  const isSearching = searchQuery.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
      dir="rtl"
    >
      <Card className="max-w-md w-full p-8 text-center border-0 bg-gradient-to-bl from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-bl from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          {isSearching ? (
            <Search className="h-10 w-10 text-white" />
          ) : (
            <Users className="h-10 w-10 text-white" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isSearching ? "نتیجه‌ای یافت نشد" : "هیچ شاگردی وجود ندارد"}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {isSearching 
              ? `برای عبارت "${searchQuery}" هیچ شاگردی پیدا نشد. لطفا کلمات کلیدی دیگری امتحان کنید یا فیلترها را بررسی کنید.`
              : "هنوز هیچ شاگردی ثبت نشده است. اولین شاگرد خود را اضافه کنید و شروع به مدیریت برنامه‌های تمرینی کنید."
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            {isSearching ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={onClearSearch}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  پاک کردن جستجو
                </Button>
                <Button 
                  onClick={onAddStudent}
                  className="bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن شاگرد جدید
                </Button>
              </>
            ) : (
              <Button 
                onClick={onAddStudent}
                size="lg"
                className="bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-5 w-5 ml-2" />
                اولین شاگرد را اضافه کنید
              </Button>
            )}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};
