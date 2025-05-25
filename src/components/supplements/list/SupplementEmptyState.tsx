
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FlaskConical, Pill, Plus, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SupplementEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddSupplement: () => void;
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({ activeTab, onAddSupplement }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg mx-auto"
      >
        <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/30 dark:border-slate-700/30 shadow-2xl rounded-3xl p-12 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -ml-12 -mb-12"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-emerald-100/10 to-blue-100/10 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            {/* Icon with Animation */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto mb-8"
            >
              <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-3xl flex items-center justify-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl"></div>
                {activeTab === 'supplement' ? (
                  <FlaskConical className="h-14 w-14 text-slate-400 dark:text-slate-500 relative z-10" />
                ) : (
                  <Pill className="h-14 w-14 text-slate-400 dark:text-slate-500 relative z-10" />
                )}
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <Zap className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-6">
                هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                مجموعه {activeTab === 'supplement' ? 'مکمل‌های' : 'ویتامین‌های'} خود را با افزودن اولین آیتم شروع کنید
              </p>
            </motion.div>
            
            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onAddSupplement}
                className={`
                  relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transform transition-all duration-300
                  ${activeTab === 'supplement' 
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg">افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید</span>
                  <Star className="w-5 h-5 animate-pulse" />
                </div>
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
