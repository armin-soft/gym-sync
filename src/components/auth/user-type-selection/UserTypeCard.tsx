
import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
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
      whileHover={!isDisabled ? { scale: 1.02, y: -8 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
    >
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 ${
        !isDisabled ? 'hover:border-white/40 hover:shadow-2xl' : 'opacity-75'
      } ${isSelected ? 'ring-2 ring-violet-500 shadow-2xl shadow-violet-500/25' : ''} ${
        isHovered ? 'shadow-xl shadow-white/10' : ''
      }`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`pattern-${type.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#pattern-${type.id})`} />
          </svg>
        </div>

        {/* Shine Effect */}
        <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${type.gradient} text-white shadow-xl ring-1 ring-white/20 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
              <Icon className="w-8 h-8" />
            </div>
            
            {/* Badge */}
            <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-400/30 rounded-full px-3 py-1 text-xs font-medium text-violet-300">
              {type.badge}
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-3 mb-6 flex-1">
            <h2 className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
              {type.title}
            </h2>
            <p className="text-lg text-gray-300 font-medium">
              {type.subtitle}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {type.description}
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-3 mb-8">
            <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" />
              ویژگی‌های کلیدی
            </h4>
            <div className="space-y-2">
              {type.features.slice(0, 4).map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            className={`w-full h-14 bg-gradient-to-r ${type.gradient} hover:brightness-110 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base relative overflow-hidden group/btn`}
            disabled={isDisabled}
            onClick={handleClick}
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isSelected ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>در حال ورود...</span>
                </>
              ) : isProcessing ? (
                'لطفا صبر کنید...'
              ) : (
                <>
                  <span>ورود به پنل</span>
                  <motion.div
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </motion.div>
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${type.gradient} blur-2xl -z-10`} />
      </div>
    </motion.div>
  );
};
