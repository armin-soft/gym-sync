
import { motion } from "framer-motion";
import { Shield, Database, Lock } from "lucide-react";

export function BackupSecurityFeatures() {
  const features = [
    { icon: Shield, title: "امنیت بالا", desc: "رمزگذاری AES-256" },
    { icon: Database, title: "فشرده‌سازی", desc: "بهینه‌سازی حجم فایل" },
    { icon: Lock, title: "محافظت داده", desc: "حفاظت چندلایه" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950 dark:to-sky-950 rounded-2xl p-6 text-center border border-emerald-200/30 dark:border-emerald-700/30"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {feature.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
