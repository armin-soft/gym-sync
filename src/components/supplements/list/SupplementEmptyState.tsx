
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FlaskConical, Pill, Sparkles, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SupplementEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddSupplement: () => void;
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({ activeTab, onAddSupplement }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 flex items-center justify-center mx-auto mb-6 relative">
              {activeTab === 'supplement' ? (
                <FlaskConical className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              ) : (
                <Pill className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              )}
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              برای شروع، اولین {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید و مجموعه خود را بسازید
            </p>
            
            {/* Action Button */}
            <Button
              onClick={onAddSupplement}
              className={`
                gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                ${activeTab === 'supplement' 
                  ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                }
              `}
            >
              <Plus className="w-5 h-5" />
              افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید
              <Sparkles className="w-4 h-4 animate-pulse" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
