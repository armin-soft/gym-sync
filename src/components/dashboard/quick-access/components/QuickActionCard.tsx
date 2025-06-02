
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  onClick: () => void;
  index: number;
}

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; border: string; icon: string; hover: string; } } = {
    emerald: {
      bg: "from-emerald-50 to-emerald-100/30",
      border: "border-emerald-200/50",
      icon: "from-emerald-500 to-emerald-600",
      hover: "hover:from-emerald-100 hover:to-emerald-200/50"
    },
    sky: {
      bg: "from-sky-50 to-sky-100/30",
      border: "border-sky-200/50",
      icon: "from-sky-500 to-sky-600",
      hover: "hover:from-sky-100 hover:to-sky-200/50"
    },
    orange: {
      bg: "from-orange-50 to-orange-100/30",
      border: "border-orange-200/50",
      icon: "from-orange-500 to-orange-600",
      hover: "hover:from-orange-100 hover:to-orange-200/50"
    },
    purple: {
      bg: "from-purple-50 to-purple-100/30",
      border: "border-purple-200/50",
      icon: "from-purple-500 to-purple-600",
      hover: "hover:from-purple-100 hover:to-purple-200/50"
    },
    pink: {
      bg: "from-pink-50 to-pink-100/30",
      border: "border-pink-200/50",
      icon: "from-pink-500 to-pink-600",
      hover: "hover:from-pink-100 hover:to-pink-200/50"
    },
    indigo: {
      bg: "from-indigo-50 to-indigo-100/30",
      border: "border-indigo-200/50",
      icon: "from-indigo-500 to-indigo-600",
      hover: "hover:from-indigo-100 hover:to-indigo-200/50"
    }
  };
  return colorMap[color];
};

const itemVariants = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}: QuickActionCardProps) => {
  const colors = getColorClasses(color);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.hover} border ${colors.border} backdrop-blur-xl p-6 cursor-pointer group transition-all duration-300`}
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10">
        <motion.div 
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        <motion.div 
          className="mt-4 flex justify-end"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center`}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
