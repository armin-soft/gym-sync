
import { motion } from "framer-motion";
import { 
  User2,
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Database,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";

const quickActions = [
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی و حرفه‌ای",
    icon: User2,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    href: "/Management/Coach-Profile"
  },
  {
    title: "شاگردان",
    description: "مشاهده و مدیریت تمام شاگردان",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    href: "/Management/Students"
  },
  {
    title: "حرکات تمرینی",
    description: "ایجاد و ویرایش حرکات تمرینی",
    icon: Dumbbell,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
    href: "/Management/Exercise-Movements"
  },
  {
    title: "برنامه‌های غذایی",
    description: "تنظیم رژیم غذایی شاگردان",
    icon: UtensilsCrossed,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30",
    href: "/Management/Diet-Plan"
  },
  {
    title: "مکمل‌ها و ویتامین‌ها",
    description: "مدیریت مکمل‌های ورزشی",
    icon: Pill,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
    href: "/Management/Supplements-Vitamins"
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "پشتیبان‌گیری و بازیابی اطلاعات",
    icon: Database,
    gradient: "from-slate-500 to-gray-500",
    bgGradient: "from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30",
    href: "/Management/Backup-Restore"
  }
];

export const IntelligentQuickActions = () => {
  const navigate = useNavigate();
  const deviceInfo = useDeviceInfo();

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative"
    >
      {/* Header */}
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
          دسترسی سریع
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ابزارهای پرکاربرد برای مدیریت بهتر باشگاه
        </p>
      </motion.div>

      {/* Actions Grid */}
      <motion.div
        className={`grid gap-6 ${
          deviceInfo.isMobile 
            ? 'grid-cols-1' 
            : deviceInfo.isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-3'
        }`}
        variants={containerVariants}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.href)}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${action.bgGradient} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-xl cursor-pointer group`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-gray-800/30" />
              
              {/* Hover Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Floating Orb */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />

              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Icon */}
                <motion.div 
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 dark:group-hover:from-white dark:group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {action.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <motion.div 
                  className="mt-4 flex justify-end"
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Ripple Effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl"
                whileTap={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
