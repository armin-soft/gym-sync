
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { FlaskConical, Pill, Plus } from "lucide-react";

interface SupplementsEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddCategory: () => void;
}

export const SupplementsEmptyState: React.FC<SupplementsEmptyStateProps> = ({ 
  activeTab, 
  onAddCategory 
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };
  
  // Get color scheme based on active tab
  const getColorScheme = () => {
    if (activeTab === 'supplement') {
      return {
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        gradientBg: 'from-purple-500 to-indigo-600',
        buttonBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
      };
    } else {
      return {
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        gradientBg: 'from-blue-500 to-sky-600',
        buttonBg: 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700',
      };
    }
  };
  
  const colorScheme = getColorScheme();
  const Icon = activeTab === 'supplement' ? FlaskConical : Pill;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card rounded-2xl border shadow-sm overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-2xl mx-auto">
        <motion.div
          variants={itemVariants}
          className={`w-20 h-20 ${colorScheme.iconBg} rounded-full flex items-center justify-center mb-5`}
        >
          <Icon className={`h-10 w-10 ${colorScheme.iconColor}`} />
        </motion.div>
        
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold mb-3"
        >
          دسته‌بندی‌های {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} را ایجاد کنید
        </motion.h2>
        
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mb-6 max-w-md"
        >
          برای شروع استفاده از بخش {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}، ابتدا باید دسته‌بندی‌های مورد نیاز خود را ایجاد کنید.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button 
            onClick={onAddCategory} 
            size="lg" 
            className={`${colorScheme.buttonBg} text-white shadow-lg`}
          >
            <Plus className="h-5 w-5 ml-2" />
            افزودن دسته‌بندی جدید
          </Button>
        </motion.div>
      </div>
      
      <div className={`h-3 bg-gradient-to-r ${colorScheme.gradientBg}`}></div>
    </motion.div>
  );
};
