
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User2, 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Database,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const MainMenuGrid = () => {
  const dashboardItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Management/Coach-Profile', 
      color: "from-blue-600 to-blue-400",
      shadowColor: "shadow-blue-500/20",
      bgColor: "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20",
      description: "مدیریت اطلاعات و تنظیمات پروفایل"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Management/Students', 
      color: "from-emerald-600 to-emerald-400",
      shadowColor: "shadow-emerald-500/20",
      bgColor: "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20",
      description: "مدیریت اطلاعات و برنامه‌های شاگردان"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Management/Exercise-Movements', 
      color: "from-amber-600 to-amber-400",
      shadowColor: "shadow-amber-500/20",
      bgColor: "bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-900/20 dark:to-yellow-900/20",
      description: "مدیریت حرکات و برنامه‌های تمرینی"
    },
    { 
      title: "برنامه های غذایی", 
      icon: UtensilsCrossed, 
      href: '/Management/Diet-Plan', 
      color: "from-purple-600 to-purple-400",
      shadowColor: "shadow-purple-500/20",
      bgColor: "bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-900/20 dark:to-violet-900/20",
      description: "مدیریت و برنامه‌ریزی رژیم غذایی"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/Management/Supplements-Vitamins', 
      color: "from-pink-600 to-pink-400",
      shadowColor: "shadow-pink-500/20",
      bgColor: "bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-900/20 dark:to-rose-900/20",
      description: "مدیریت مکمل‌ها و ویتامین‌ها"
    },
    { 
      title: "پشتیبان‌گیری و بازیابی", 
      icon: Database, 
      href: '/Management/Backup-Restore', 
      color: "from-cyan-600 to-cyan-400",
      shadowColor: "shadow-cyan-500/20",
      bgColor: "bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-900/20 dark:to-sky-900/20",
      description: "پشتیبان‌گیری و بازیابی اطلاعات"
    }
  ];

  // Container and item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const handleNavigate = (href: string) => {
    console.log(`مسیریابی به: ${href}`);
  };

  return (
    <motion.div 
      className="px-2 sm:px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {dashboardItems.map((dashItem, index) => (
          <motion.div 
            key={dashItem.href}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Link 
              to={dashItem.href}
              onClick={() => handleNavigate(dashItem.href)}
              className={`block group relative overflow-hidden ${dashItem.bgColor} rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-3 md:p-4 shadow-md ${dashItem.shadowColor} hover:shadow-lg transition-all duration-300 h-full`}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`grid-pattern-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill={`url(#grid-pattern-${index})`} />
                </svg>
              </div>
              
              {/* Hover effect light beam */}
              <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-2 md:gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${dashItem.color} text-white shadow-md ring-1 ring-white/10 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                  <dashItem.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-xs sm:text-sm md:text-base text-gray-800 dark:text-white">
                  {dashItem.title}
                </span>
                
                {/* Description - visible on hover */}
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="text-xs text-gray-500 dark:text-gray-300 mt-1 line-clamp-2"
                >
                  {dashItem.description}
                </motion.p>
                
                {/* Hover indicator with animation */}
                <motion.div 
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowRight className="w-3 h-3 text-gray-700 dark:text-white" />
                  </div>
                </motion.div>
                
                {/* Sparkle animation on hover */}
                <motion.div
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
