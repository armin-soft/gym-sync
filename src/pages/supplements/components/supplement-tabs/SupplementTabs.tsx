
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { TabsHeader } from "./TabsHeader";
import { TabContent } from "./TabContent";
import { Card } from "@/components/ui/card";
import { Loader2, Database, Activity } from "lucide-react";

interface SupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (isLoading) {
    return (
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/30 dark:border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden h-full">
        <div className="flex items-center justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            {/* Loading Animation */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto"
              >
                <div className="w-full h-full border-4 border-slate-200 dark:border-slate-700 border-t-emerald-500 rounded-full"></div>
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 mx-auto"
              >
                <div className="w-full h-full border-4 border-transparent border-b-blue-500 rounded-full"></div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Database className="w-8 h-8 text-emerald-500" />
              </div>
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                در حال بارگذاری اطلاعات...
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                لطفاً کمی صبر کنید تا داده‌ها آماده شوند
              </p>
              
              {/* Loading Steps */}
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 bg-emerald-500 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-3 h-3 bg-purple-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col flex-1 h-full w-full"
    >
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/30 dark:border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden h-full flex flex-col">
        <Tabs 
          value={activeTab} 
          onValueChange={onTabChange} 
          className="flex flex-col flex-1 h-full w-full p-6 md:p-8"
          dir="rtl"
        >
          {/* Header */}
          <TabsHeader activeTab={activeTab} />
          
          {/* Content for each tab */}
          <TabContent
            activeTab={activeTab}
            categories={categories.filter(c => c.type === activeTab)}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            supplements={supplements.filter(s => s.type === activeTab)}
            onAddSupplement={onAddSupplement}
            onEditSupplement={onEditSupplement}
            onDeleteSupplement={onDeleteSupplement}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Tabs>
      </Card>
    </motion.div>
  );
};
