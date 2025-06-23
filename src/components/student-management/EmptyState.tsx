
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  searchQuery: string;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  onAddStudent,
  onClearSearch
}) => {
  const isSearching = searchQuery.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 student-gradient-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 student-gradient-secondary opacity-5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-8 student-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl">
          {isSearching ? (
            <Search className="w-12 h-12 text-white" />
          ) : (
            <Users className="w-12 h-12 text-white" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {isSearching ? 'نتیجه‌ای یافت نشد' : 'هنوز شاگردی ثبت نشده'}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {isSearching
            ? `هیچ شاگردی با عبارت "${searchQuery}" پیدا نشد. لطفاً عبارت دیگری جستجو کنید یا شاگرد جدیدی اضافه کنید.`
            : 'برای شروع، اولین شاگرد خود را اضافه کنید. شما می‌توانید اطلاعات کامل، برنامه تمرینی و رژیم غذایی هر شاگرد را مدیریت کنید.'
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isSearching && (
            <Button
              onClick={onClearSearch}
              variant="outline"
              className="gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:student-gradient-accent hover:text-white hover:border-transparent transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              پاک کردن جستجو
            </Button>
          )}
          
          <Button
            onClick={onAddStudent}
            className="student-gradient-primary hover:opacity-90 text-white border-0 shadow-lg gap-2 px-8 py-3 rounded-xl"
          >
            {isSearching ? (
              <>
                <UserPlus className="w-5 h-5" />
                افزودن شاگرد جدید
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                اولین شاگرد را اضافه کنید
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
