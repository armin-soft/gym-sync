
import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProfileProgressProps {
  profile: StudentProfile;
}

export const ProfileProgress: React.FC<ProfileProgressProps> = ({ profile }) => {
  const calculateProgress = () => {
    const fields = [
      profile.name,
      profile.phone,
      profile.email,
      profile.height,
      profile.weight,
      profile.goal,
      profile.age,
      profile.gender,
      profile.grade,
      profile.group,
      profile.payment
    ];
    
    const filledFields = fields.filter(field => field && field.toString().trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-emerald-200/50 dark:border-slate-600/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          تکمیل پروفایل
        </h3>
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          {toPersianNumbers(progress.toString())}%
        </span>
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
        برای دریافت بهترین خدمات، پروفایل خود را کامل کنید
      </p>
    </motion.div>
  );
};
