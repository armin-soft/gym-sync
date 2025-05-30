import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

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
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export const UserTypeCard = ({ 
  type, 
  isHovered, 
  isSelected, 
  onHover, 
  onSelect 
}: UserTypeCardProps) => {
  const Icon = type.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => onHover(type.id)}
      onHoverEnd={() => onHover(null)}
      className="relative group cursor-pointer"
      onClick={() => onSelect(type.id)}
    >
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-xl shadow-md`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {type.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {type.subtitle}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {type.description}
            </p>
          </div>

          <div className="space-y-2">
            {type.features.slice(0, 3).map((feature, index) => (
              <div
                key={feature}
                className="flex items-center justify-center text-xs text-gray-600 dark:text-gray-300"
              >
                <Circle className="w-2 h-2 ml-2 text-green-500 fill-current" />
                {feature}
              </div>
            ))}
          </div>

          <Button
            className={`w-full bg-gradient-to-r ${type.gradient} text-white font-medium rounded-lg transition-all duration-300`}
            disabled={isSelected}
          >
            {isSelected ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ورود...
              </div>
            ) : (
              'ورود به پنل'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
