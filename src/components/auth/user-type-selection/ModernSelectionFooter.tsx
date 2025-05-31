
import { motion } from "framer-motion";
import { Shield, Clock, Users } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ModernSelectionFooter = () => {
  const stats = [
    {
      icon: Users,
      value: toPersianNumbers("500") + "+",
      label: "کاربر فعال",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "امنیت سیستم",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "پشتیبانی",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const footerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div variants={footerVariants} className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-300`}></div>
            </div>
            <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Text */}
      <motion.div
        className="text-center text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>سیستم مدیریت حرفه‌ای ورزشی - نسخه {toPersianNumbers("4.4.1")}</p>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white/30 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
