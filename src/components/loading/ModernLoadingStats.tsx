
import { motion } from "framer-motion";
import { Shield, Clock, Users, Zap } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ModernLoadingStats = () => {
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
    },
    {
      icon: Zap,
      value: toPersianNumbers("10") + "ms",
      label: "سرعت پاسخ",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
          </div>
          <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};
