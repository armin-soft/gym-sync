
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserType {
  id: 'management' | 'student';
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  badge: string;
}

interface ModernUserTypeCardProps {
  userType: UserType;
  index: number;
  onSelect: (type: 'management' | 'student') => void;
  isSelected: boolean;
  isProcessing: boolean;
}

export const ModernUserTypeCard: React.FC<ModernUserTypeCardProps> = ({
  userType,
  index,
  onSelect,
  isSelected,
  isProcessing
}) => {
  const Icon = userType.icon;
  const isDisabled = isProcessing;

  const handleClick = () => {
    if (isDisabled) return;
    onSelect(userType.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }}
      whileHover={!isDisabled ? { y: -4, scale: 1.01 } : {}}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
      dir="rtl"
    >
      {/* تأثیر درخشش پس‌زمینه */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-br ${userType.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
        animate={isSelected ? { opacity: 0.3 } : {}}
      />
      
      {/* کارت اصلی */}
      <div className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 ${
        isSelected ? 'border-blue-500 shadow-2xl' : 'border-slate-200/50 dark:border-slate-700/50 shadow-xl'
      } rounded-3xl overflow-hidden transition-all duration-300 ${
        !isDisabled ? 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-2xl' : 'opacity-75'
      }`}>
        
        {/* نشان برتر */}
        <motion.div
          className={`absolute -top-3 right-8 px-4 py-2 bg-gradient-to-l ${userType.gradient} text-white text-sm font-bold rounded-full shadow-lg`}
          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-current" />
            <span>{userType.badge}</span>
          </div>
        </motion.div>
        
        {/* هدر کارت */}
        <div className="relative p-8 sm:p-10">
          {/* آیکون اصلی */}
          <motion.div
            className="flex justify-center mb-6"
            animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${userType.gradient} rounded-2xl shadow-xl flex items-center justify-center`}>
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              
              {/* نشان انتخاب */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* عنوان و توضیحات */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {userType.title}
            </h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
              {userType.subtitle}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {userType.description}
            </p>
          </div>

          {/* لیست ویژگی‌ها */}
          <div className="space-y-2 mb-8">
            {userType.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index + 0.3 }}
                className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl"
              >
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {feature}
                </span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            ))}
          </div>

          {/* دکمه عمل */}
          <Button
            className={`w-full h-14 bg-gradient-to-l ${userType.gradient} text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none`}
            disabled={isDisabled}
            onClick={handleClick}
          >
            {isSelected ? (
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>در حال پردازش...</span>
              </div>
            ) : isProcessing ? (
              <span>لطفاً صبر کنید...</span>
            ) : (
              <div className="flex items-center gap-3">
                <span>انتخاب و ورود</span>
                <ArrowLeft className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>

        {/* فوتر کارت */}
        <div className="px-8 pb-6">
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              دسترسی امن و رمزگذاری شده ۲۵۶ بیتی
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
