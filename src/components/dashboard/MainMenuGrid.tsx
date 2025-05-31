
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill,
  FileText,
  BarChart3,
  Settings,
  Calendar
} from "lucide-react";

const menuItems = [
  {
    title: "شاگردان",
    description: "مدیریت شاگردان",
    icon: Users,
    path: "/students",
    gradient: "from-orange-500 to-orange-600",
    hoverGradient: "hover:from-orange-600 hover:to-orange-700",
    bgPattern: "from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/30"
  },
  {
    title: "تمرینات",
    description: "برنامه تمرینی",
    icon: Dumbbell,
    path: "/exercises",
    gradient: "from-gold-500 to-gold-600",
    hoverGradient: "hover:from-gold-600 hover:to-gold-700",
    bgPattern: "from-gold-50 to-gold-100 dark:from-gold-950/20 dark:to-gold-900/30"
  },
  {
    title: "تغذیه",
    description: "برنامه غذایی",
    icon: UtensilsCrossed,
    path: "/diet",
    gradient: "from-orange-600 to-gold-500",
    hoverGradient: "hover:from-orange-700 hover:to-gold-600",
    bgPattern: "from-orange-50 to-gold-50 dark:from-orange-950/20 dark:to-gold-950/20"
  },
  {
    title: "مکمل‌ها",
    description: "ویتامین و مکمل",
    icon: Pill,
    path: "/supplements",
    gradient: "from-black-700 to-black-800",
    hoverGradient: "hover:from-black-800 hover:to-black-900",
    bgPattern: "from-black-50 to-black-100 dark:from-black-950/50 dark:to-black-900/50"
  },
  {
    title: "گزارشات",
    description: "آمار و تحلیل",
    icon: BarChart3,
    path: "/reports",
    gradient: "from-orange-500 to-gold-500",
    hoverGradient: "hover:from-orange-600 hover:to-gold-600",
    bgPattern: "from-orange-50 to-gold-50 dark:from-orange-950/20 dark:to-gold-950/20"
  },
  {
    title: "پشتیبان‌گیری",
    description: "بکاپ اطلاعات",
    icon: FileText,
    path: "/backup",
    gradient: "from-black-600 to-orange-600",
    hoverGradient: "hover:from-black-700 hover:to-orange-700",
    bgPattern: "from-black-50 to-orange-50 dark:from-black-950/30 dark:to-orange-950/20"
  },
  {
    title: "برنامه هفتگی",
    description: "تقویم تمرینات",
    icon: Calendar,
    path: "/schedule",
    gradient: "from-gold-600 to-orange-500",
    hoverGradient: "hover:from-gold-700 hover:to-orange-600",
    bgPattern: "from-gold-50 to-orange-50 dark:from-gold-950/20 dark:to-orange-950/20"
  },
  {
    title: "تنظیمات",
    description: "پیکربندی سیستم",
    icon: Settings,
    path: "/settings",
    gradient: "from-black-700 to-black-800",
    hoverGradient: "hover:from-black-800 hover:to-black-900",
    bgPattern: "from-black-50 to-black-100 dark:from-black-950/50 dark:to-black-900/50"
  },
];

export const MainMenuGrid: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group cursor-pointer"
          onClick={() => navigate(item.path)}
        >
          <div className={`
            relative overflow-hidden rounded-2xl p-6 h-32
            bg-gradient-to-br ${item.bgPattern}
            border border-orange-200/30 dark:border-orange-800/20
            shadow-lg hover:shadow-brand-orange
            transition-all duration-500 ease-out
            hover:border-orange-300/50 dark:hover:border-orange-700/40
          `}>
            {/* Background decoration */}
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/20 dark:bg-black/20 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Icon */}
            <div className={`
              inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3
              bg-gradient-to-br ${item.gradient} ${item.hoverGradient}
              shadow-lg group-hover:shadow-xl
              transition-all duration-300 group-hover:scale-110
            `}>
              <item.icon className="h-6 w-6 text-white" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-bold text-lg brand-text-dark dark:text-white mb-1 group-hover:brand-text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
