
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
  Sparkles,
  Star
} from "lucide-react";

export const ModernMainMenuGrid = () => {
  const dashboardItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Management/Coach-Profile', 
      gradient: "from-black via-gray-800 to-gray-900",
      hoverGradient: "hover:from-gray-900 hover:via-black hover:to-gray-800",
      description: "مدیریت اطلاعات شخصی"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Management/Students', 
      gradient: "from-blue-600 via-blue-700 to-blue-800",
      hoverGradient: "hover:from-blue-700 hover:via-blue-800 hover:to-blue-900",
      description: "مدیریت شاگردان"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Management/Exercise-Movements', 
      gradient: "from-yellow-500 via-yellow-600 to-yellow-700",
      hoverGradient: "hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800",
      description: "برنامه‌های تمرینی"
    },
    { 
      title: "برنامه های غذایی", 
      icon: UtensilsCrossed, 
      href: '/Management/Diet-Plan', 
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-600 hover:via-blue-700 hover:to-blue-800",
      description: "رژیم غذایی"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/Management/Supplements-Vitamins', 
      gradient: "from-yellow-600 via-yellow-700 to-yellow-800",
      hoverGradient: "hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-900",
      description: "مکمل‌ها"
    },
    { 
      title: "پشتیبان‌گیری", 
      icon: Database, 
      href: '/Management/Backup-Restore', 
      gradient: "from-gray-700 via-gray-800 to-black",
      hoverGradient: "hover:from-gray-800 hover:via-black hover:to-gray-900",
      description: "پشتیبان‌گیری داده‌ها"
    }
  ];

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          منوی اصلی
        </h2>
        <p className="text-gray-600 dark:text-gray-400">دسترسی سریع به تمام بخش‌های سیستم</p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {dashboardItems.map((item, index) => (
          <motion.div 
            key={item.href}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.05,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={item.href}
              className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`bg-gradient-to-br ${item.gradient} ${item.hoverGradient} transition-all duration-300 p-6 h-full`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4 h-full">
                  {/* Icon */}
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-sm lg:text-base leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow Icon */}
                  <motion.div 
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: -4 }}
                  >
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Sparkle Animation */}
                  <motion.div
                    className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
