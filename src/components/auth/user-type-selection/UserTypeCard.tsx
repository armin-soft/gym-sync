
import { motion } from "framer-motion";
import { LucideIcon, ChevronLeft, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface UserType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  darkBgGradient: string;
  features: string[];
  badge: string;
}

interface UserTypeCardProps {
  type: UserType;
  isHovered: boolean;
  isSelected: boolean;
  isProcessing?: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export const UserTypeCard = ({ 
  type, 
  isHovered, 
  isSelected, 
  isProcessing = false,
  onHover, 
  onSelect 
}: UserTypeCardProps) => {
  const Icon = type.icon;
  const isDisabled = isProcessing || isSelected;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDisabled) return;
    
    console.log('UserTypeCard clicked:', type.id);
    onSelect(type.id);
  };

  const handleHoverStart = () => {
    if (!isDisabled) {
      onHover(type.id);
    }
  };

  const handleHoverEnd = () => {
    if (!isDisabled) {
      onHover(null);
    }
  };

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.03, y: -8 } : {}}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
      dir="rtl"
    >
      {/* Background glow effect */}
      <motion.div
        className={`absolute -inset-2 bg-gradient-to-br ${type.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
      />
      
      {/* Main card */}
      <div className={`relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 ${
        isSelected ? 'border-violet-500' : 'border-gray-200/50 dark:border-gray-700/50'
      } rounded-3xl p-8 transition-all duration-500 shadow-xl hover:shadow-2xl ${
        !isDisabled ? 'hover:border-violet-300 dark:hover:border-violet-600' : 'opacity-75'
      }`}>
        
        {/* Badge */}
        <motion.div
          className="absolute -top-3 right-6 px-4 py-1 bg-gradient-to-l from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        >
          {type.badge}
        </motion.div>
        
        {/* Header section */}
        <div className="text-center space-y-6 mb-8">
          {/* Icon container */}
          <motion.div
            className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-xl`}
            animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-10 h-10 text-white" />
            
            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
            
            {/* Floating sparkle */}
            <motion.div
              className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Star className="w-2 h-2 text-white fill-current" />
            </motion.div>
          </motion.div>

          {/* Title and subtitle */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {type.title}
            </h2>
            <p className="text-base text-violet-600 dark:text-violet-400 font-semibold">
              {type.subtitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
              {type.description}
            </p>
          </div>
        </div>

        {/* Features list */}
        <div className="space-y-3 mb-8">
          {type.features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-3"
            >
              <span className="font-medium">{feature}</span>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-500 ml-1" />
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  {toPersianNumbers("100")}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action button */}
        <Button
          className={`w-full h-14 bg-gradient-to-l ${type.gradient} text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50`}
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
              <span>در حال ورود...</span>
            </div>
          ) : isProcessing ? (
            <span>لطفا صبر کنید...</span>
          ) : (
            <div className="flex items-center gap-3">
              <span>ورود به پنل</span>
              <ChevronLeft className="h-5 w-5" />
            </div>
          )}
        </Button>
        
        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            دسترسی امن و رمزگذاری شده
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
