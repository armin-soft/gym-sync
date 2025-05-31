
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
  ArrowLeft,
  Sparkles
} from "lucide-react";

export const ProfessionalMenuGrid = () => {
  const menuItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Management/Coach-Profile', 
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      shadowColor: "shadow-blue-500/25",
      bgGradient: "from-blue-50/80 via-indigo-50/60 to-blue-50/80 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-blue-900/20",
      description: "مدیریت اطلاعات شخصی و حرفه‌ای"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Management/Students', 
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      shadowColor: "shadow-emerald-500/25",
      bgGradient: "from-emerald-50/80 via-teal-50/60 to-emerald-50/80 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-emerald-900/20",
      description: "مدیریت و پیگیری شاگردان"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Management/Exercise-Movements', 
      gradient: "from-amber-500 via-orange-600 to-amber-700",
      shadowColor: "shadow-amber-500/25",
      bgGradient: "from-amber-50/80 via-orange-50/60 to-amber-50/80 dark:from-amber-900/20 dark:via-orange-900/15 dark:to-amber-900/20",
      description: "مدیریت حرکات و برنامه‌های تمرینی"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: UtensilsCrossed, 
      href: '/Management/Diet-Plan', 
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      shadowColor: "shadow-purple-500/25",
      bgGradient: "from-purple-50/80 via-violet-50/60 to-purple-50/80 dark:from-purple-900/20 dark:via-violet-900/15 dark:to-purple-900/20",
      description: "طراحی و مدیریت رژیم‌های غذایی"
    },
    { 
      title: "مکمل‌ها و ویتامین‌ها", 
      icon: Pill, 
      href: '/Management/Supplements-Vitamins', 
      gradient: "from-pink-500 via-rose-600 to-pink-700",
      shadowColor: "shadow-pink-500/25",
      bgGradient: "from-pink-50/80 via-rose-50/60 to-pink-50/80 dark:from-pink-900/20 dark:via-rose-900/15 dark:to-pink-900/20",
      description: "مدیریت مکمل‌ها و ویتامین‌ها"
    },
    { 
      title: "پشتیبان‌گیری", 
      icon: Database, 
      href: '/Management/Backup-Restore', 
      gradient: "from-cyan-500 via-sky-600 to-cyan-700",
      shadowColor: "shadow-cyan-500/25",
      bgGradient: "from-cyan-50/80 via-sky-50/60 to-cyan-50/80 dark:from-cyan-900/20 dark:via-sky-900/15 dark:to-cyan-900/20",
      description: "پشتیبان‌گیری و بازیابی اطلاعات"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div 
            key={item.href}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.2 } 
            }}
            className="group"
          >
            <Link 
              to={item.href}
              className={`block relative overflow-hidden bg-gradient-to-br ${item.bgGradient} rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl ${item.shadowColor} hover:shadow-2xl transition-all duration-300 h-full`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                </svg>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg ring-1 ring-white/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Sparkles className="w-3 h-3" />
                    <span>دسترسی فوری</span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-1 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ x: -4 }}
                  >
                    <span className="text-xs font-medium">ورود</span>
                    <ArrowLeft className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${item.gradient} blur-xl`} />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
