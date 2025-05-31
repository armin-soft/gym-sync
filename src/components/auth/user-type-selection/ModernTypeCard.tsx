
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ArrowLeft, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface ModernTypeCardProps {
  type: UserType;
  isHovered: boolean;
  isSelected: boolean;
  isProcessing?: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export const ModernTypeCard = ({ 
  type, 
  isHovered, 
  isSelected, 
  isProcessing = false,
  onHover, 
  onSelect 
}: ModernTypeCardProps) => {
  const Icon = type.icon;
  const isDisabled = isProcessing || isSelected;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDisabled) return;
    
    console.log('ModernTypeCard clicked:', type.id);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={!isDisabled ? { 
        scale: 1.02,
        y: -8,
      } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
      
      {/* Glow Effect on Hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && !isDisabled && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-20 rounded-3xl blur-xl`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Selection Ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-3xl"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 20 
          }}
        />
      )}

      <div className={`relative p-8 lg:p-10 space-y-8 ${isDisabled ? 'opacity-75' : ''}`}>
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          {/* Badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${type.gradient} rounded-full text-white font-bold text-sm shadow-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4" />
            {type.badge}
          </motion.div>

          {/* Icon */}
          <motion.div 
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-2xl border border-white/20 ${
              isSelected ? 'animate-pulse' : ''
            }`}
            whileHover={{ rotate: isSelected ? 0 : 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              {type.title}
            </h2>
            <p className="text-lg text-purple-200 font-medium">
              {type.subtitle}
            </p>
            <p className="text-white/70 leading-relaxed">
              {type.description}
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg border-b border-white/20 pb-2">
            ویژگی‌های کلیدی:
          </h3>
          <div className="space-y-3">
            {type.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3 text-white/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"></div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button
            className={`w-full h-14 bg-gradient-to-r ${type.gradient} text-white font-bold text-lg rounded-xl shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl`}
            disabled={isDisabled}
            onClick={handleClick}
          >
            <AnimatePresence mode="wait">
              {isSelected ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  در حال ورود...
                </motion.div>
              ) : isProcessing ? (
                <motion.span
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  لطفا صبر کنید...
                </motion.span>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-3"
                  whileHover={{ x: -5 }}
                >
                  <span>ورود به پنل</span>
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Selection Indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
