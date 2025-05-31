
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

export const EliteMenuGrid = () => {
  const menuItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Management/Coach-Profile', 
      gradient: "from-slate-600 to-slate-800",
      description: "مدیریت اطلاعات شخصی"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Management/Students', 
      gradient: "from-violet-500 to-purple-600",
      description: "مدیریت شاگردان"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Management/Exercise-Movements', 
      gradient: "from-emerald-500 to-teal-600",
      description: "برنامه‌های تمرینی"
    },
    { 
      title: "برنامه غذایی", 
      icon: UtensilsCrossed, 
      href: '/Management/Diet-Plan', 
      gradient: "from-blue-500 to-indigo-600",
      description: "رژیم غذایی"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/Management/Supplements-Vitamins', 
      gradient: "from-amber-500 to-orange-600",
      description: "مکمل‌ها"
    },
    { 
      title: "پشتیبان‌گیری", 
      icon: Database, 
      href: '/Management/Backup-Restore', 
      gradient: "from-rose-500 to-pink-600",
      description: "پشتیبان‌گیری داده‌ها"
    }
  ];

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-violet-500" />
          منوی اصلی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">دسترسی سریع به تمام بخش‌های سیستم</p>
        <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-3"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {menuItems.map((item, index) => (
          <motion.div 
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to={item.href}
              className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${item.gradient} p-6 h-full relative`}>
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full translate-y-6 -translate-x-6 group-hover:scale-125 transition-transform duration-500" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4 h-full">
                  {/* Icon */}
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-sm lg:text-base leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <motion.div 
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: -4 }}
                  >
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
