
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shield, Target, Zap, ChevronRight } from "lucide-react";

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

const cardVariants = {
  idle: { 
    scale: 1, 
    rotateY: 0,
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  hover: { 
    scale: 1.05, 
    rotateY: 5,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    }
  },
  selected: {
    scale: 1.02,
    boxShadow: "0 25px 80px rgba(124, 58, 237, 0.4)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const glowVariants = {
  idle: { opacity: 0 },
  hover: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

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
      variants={cardVariants}
      initial="idle"
      animate={isSelected ? "selected" : isHovered ? "hover" : "idle"}
      onHoverStart={() => onHover(type.id)}
      onHoverEnd={() => onHover(null)}
      className="relative group cursor-pointer"
      onClick={() => onSelect(type.id)}
    >
      <motion.div
        variants={glowVariants}
        className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-20 blur-xl rounded-3xl`}
      />
      
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 rounded-3xl p-8 overflow-hidden transition-all duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} dark:${type.darkBgGradient} opacity-50`} />
        
        <div className="absolute top-6 left-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${type.gradient} text-white shadow-lg`}>
            <Shield className="w-3 h-3 ml-1" />
            {type.badge}
          </span>
        </div>

        <div className="relative z-10 text-center space-y-6">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-2xl`}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {type.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {type.subtitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {type.description}
            </p>
          </div>

          <div className="space-y-3">
            {type.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
              >
                <Target className="w-4 h-4 ml-2 text-green-500" />
                {feature}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              className={`w-full h-14 bg-gradient-to-r ${type.gradient} hover:shadow-2xl text-white font-medium text-lg rounded-xl transition-all duration-300 group`}
              disabled={isSelected}
            >
              {isSelected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  در حال ورود...
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  ورود به پنل
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className={`w-12 h-12 border-4 border-transparent border-t-current bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent rounded-full`}
                />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  در حال راه‌اندازی...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
