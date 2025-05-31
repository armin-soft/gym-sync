
import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft } from "lucide-react";
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
  isSelected: boolean;
  isProcessing?: boolean;
  onSelect: () => void;
}

export const UserTypeCard = ({ 
  type, 
  isSelected, 
  isProcessing = false,
  onSelect 
}: UserTypeCardProps) => {
  const Icon = type.icon;
  const isDisabled = isProcessing;

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={!isDisabled ? onSelect : undefined}
    >
      {/* Simple Card */}
      <div className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 transition-all duration-300 ${
        !isDisabled ? 'hover:border-violet-300 hover:shadow-lg' : 'opacity-75'
      } ${isSelected ? 'ring-2 ring-violet-500 shadow-lg' : ''}`}>
        
        {/* Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${type.gradient} text-white shadow-md`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full px-3 py-1 text-sm font-medium">
              {type.badge}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {type.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {type.subtitle}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {type.features.slice(0, 3).map((feature, index) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button
            className={`w-full h-12 bg-gradient-to-r ${type.gradient} hover:brightness-110 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) onSelect();
            }}
          >
            <div className="flex items-center justify-center gap-2">
              {isSelected ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>در حال ورود...</span>
                </>
              ) : (
                <>
                  <span>ورود به پنل</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
