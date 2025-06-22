
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Ruler, Weight } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  profile,
  errors,
  validFields,
  handleUpdate
}) => {
  // Get gender display text in Persian
  const getGenderDisplay = (gender: string) => {
    return gender === 'male' ? 'مرد' : 'زن';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اطلاعات شخصی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات شخصی شما (فقط قابل مشاهده)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <User className="h-4 w-4 text-emerald-500" />
            نام و نام خانوادگی
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={profile.name}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
              placeholder="نام کامل"
            />
          </div>
        </div>

        {/* Mobile number - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Phone className="h-4 w-4 text-emerald-500" />
            شماره موبایل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={toPersianNumbers(profile.phone)}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
              placeholder="شماره موبایل"
            />
          </div>
        </div>

        {/* Age - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="h-4 w-4 text-emerald-500" />
            سن
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={toPersianNumbers(profile.age)}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
              placeholder="سن"
            />
          </div>
        </div>

        {/* Gender - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <User className="h-4 w-4 text-emerald-500" />
            جنسیت
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={getGenderDisplay(profile.gender)}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
            />
          </div>
        </div>

        {/* Height - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Ruler className="h-4 w-4 text-emerald-500" />
            قد (سانتی‌متر)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Ruler className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={toPersianNumbers(profile.height)}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
              placeholder="قد"
            />
          </div>
        </div>

        {/* Weight - Read-only */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Weight className="h-4 w-4 text-emerald-500" />
            وزن (کیلوگرم)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Weight className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={toPersianNumbers(profile.weight)}
              readOnly
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed opacity-70"
              placeholder="وزن"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
