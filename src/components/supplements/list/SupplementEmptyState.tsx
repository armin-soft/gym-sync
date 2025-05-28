
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FlaskConical, Pill, Plus, Sparkles } from "lucide-react";

interface SupplementEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddSupplement: () => void;
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({
  activeTab,
  onAddSupplement
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8" dir="rtl">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.1 
        }}
        className="relative mb-8"
      >
        <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl ${
          activeTab === 'supplement' 
            ? 'bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600' 
            : 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600'
        }`}>
          {activeTab === 'supplement' ? (
            <FlaskConical className="w-16 h-16 text-white" />
          ) : (
            <Pill className="w-16 h-16 text-white" />
          )}
        </div>
        
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {activeTab === 'supplement' 
            ? 'هنوز هیچ مکملی اضافه نشده است. اولین مکمل خود را اضافه کنید تا شروع کنید.'
            : 'هنوز هیچ ویتامینی اضافه نشده است. اولین ویتامین خود را اضافه کنید تا شروع کنید.'
          }
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={onAddSupplement}
            className={`gap-2 text-lg px-8 py-3 shadow-xl ${
              activeTab === 'supplement'
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700'
            }`}
          >
            <Plus className="h-5 w-5" />
            افزودن اولین {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 right-1/3 w-3 h-3 bg-blue-300 rounded-full opacity-30"
        />
      </div>
    </div>
  );
};
