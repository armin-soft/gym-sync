
import React from "react";
import { Link } from "react-router-dom";
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
      href: '/trainer', 
      color: "from-blue-600 to-blue-400",
      shadowColor: "shadow-blue-500/20",
      bgColor: "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/students', 
      color: "from-emerald-600 to-emerald-400",
      shadowColor: "shadow-emerald-500/20",
      bgColor: "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/exercises', 
      color: "from-amber-600 to-amber-400",
      shadowColor: "shadow-amber-500/20",
      bgColor: "bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-900/20 dark:to-yellow-900/20"
    },
    { 
      title: "برنامه های غذایی", 
      icon: UtensilsCrossed, 
      href: '/diet', 
      color: "from-purple-600 to-purple-400",
      shadowColor: "shadow-purple-500/20",
      bgColor: "bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-900/20 dark:to-violet-900/20"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/supplements', 
      color: "from-pink-600 to-pink-400",
      shadowColor: "shadow-pink-500/20",
      bgColor: "bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-900/20 dark:to-rose-900/20"
    },
    { 
      title: "پشتیبان‌گیری و بازیابی", 
      icon: Database, 
      href: '/backup', 
      color: "from-cyan-600 to-cyan-400",
      shadowColor: "shadow-cyan-500/20",
      bgColor: "bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-900/20 dark:to-sky-900/20"
    }
  ];

  // اضافه کردن console.log برای تشخیص مشکل مسیریابی
  const handleNavigate = (href: string) => {
    console.log(`مسیریابی به: ${href}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 px-2 sm:px-4">
      {dashboardItems.map((dashItem) => (
        <div key={dashItem.href}>
          <Link 
            to={dashItem.href}
            onClick={() => handleNavigate(dashItem.href)}
            className={`block group relative overflow-hidden ${dashItem.bgColor} rounded-xl border border-slate-200/50 dark:border-slate-800/50 p-3 md:p-4 shadow-md ${dashItem.shadowColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}
          >
            <div className="relative z-10 flex flex-col items-center text-center gap-2 md:gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${dashItem.color} text-white shadow-md ring-1 ring-white/10 group-hover:shadow-lg transition-all duration-300`}>
                <dashItem.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs sm:text-sm md:text-base text-gray-800 dark:text-white">
                {dashItem.title}
              </span>
              
              {/* Simple arrow icon without animations */}
              <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                  <ArrowRight className="w-3 h-3 text-gray-700 dark:text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
