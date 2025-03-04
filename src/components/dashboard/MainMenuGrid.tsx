
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User2, 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  ChartBar, 
  Database, 
  HelpCircle 
} from "lucide-react";

export const MainMenuGrid = () => {
  const dashboardItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Coach-Profile', 
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Students', 
      color: "from-emerald-600 to-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Exercise-Movements', 
      color: "from-amber-600 to-amber-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20"
    },
    { 
      title: "برنامه های غذایی", 
      icon: UtensilsCrossed, 
      href: '/Diet-Plan', 
      color: "from-purple-600 to-purple-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/Supplements-Vitamins', 
      color: "from-pink-600 to-pink-400",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    },
    { 
      title: "گزارشات", 
      icon: ChartBar, 
      href: '/Reports', 
      color: "from-indigo-600 to-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
    },
    { 
      title: "پشتیبان‌گیری و بازیابی", 
      icon: Database, 
      href: '/Backup-Restore', 
      color: "from-cyan-600 to-cyan-400",
      bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20"
    },
    { 
      title: "درباره", 
      icon: HelpCircle, 
      href: '/About', 
      color: "from-gray-600 to-gray-400",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 px-2 sm:px-4"
    >
      {dashboardItems.map((dashItem) => (
        <motion.div key={dashItem.href} variants={item}>
          <Link 
            to={dashItem.href}
            className={`block group relative overflow-hidden ${dashItem.bgColor} rounded-xl border border-slate-200 dark:border-slate-800 p-3 md:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${dashItem.color} transition-opacity duration-300`} />
            <div className="relative flex flex-col items-center text-center gap-2 md:gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${dashItem.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <dashItem.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs sm:text-sm md:text-base text-gray-800 dark:text-white">
                {dashItem.title}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
