
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Folder, Pill, Heart } from "lucide-react";

interface EmptyStateCardProps {
  type: "category" | "supplement";
  supplementType?: "supplement" | "vitamin";
  onAction: () => void;
}

export const EmptyStateCard = ({ type, supplementType, onAction }: EmptyStateCardProps) => {
  const isCategory = type === "category";
  const icon = isCategory ? Folder : (supplementType === "supplement" ? Pill : Heart);
  const IconComponent = icon;
  
  const title = isCategory 
    ? `هیچ دسته‌بندی برای ${supplementType === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} وجود ندارد`
    : `هیچ ${supplementType === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد`;
    
  const description = isCategory
    ? "لطفاً ابتدا یک دسته‌بندی ایجاد کنید"
    : `لطفاً اولین ${supplementType === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید`;
    
  const actionText = isCategory 
    ? "افزودن دسته‌بندی" 
    : `افزودن ${supplementType === 'supplement' ? 'مکمل' : 'ویتامین'}`;

  const gradientClass = isCategory 
    ? 'from-indigo-500 to-purple-600'
    : supplementType === 'supplement' 
      ? 'from-green-500 to-emerald-600'
      : 'from-purple-500 to-pink-600';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
      dir="rtl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-24 h-24 bg-gradient-to-l ${gradientClass} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
      >
        <IconComponent className="h-12 w-12 text-white" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-bold text-gray-800 mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 text-lg"
      >
        {description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onAction}
          className={`bg-gradient-to-l ${gradientClass} hover:shadow-xl text-white rounded-xl px-8 py-3 text-lg transition-all duration-300`}
        >
          <Plus className="h-5 w-5 ml-2" />
          {actionText}
        </Button>
      </motion.div>
    </motion.div>
  );
};
