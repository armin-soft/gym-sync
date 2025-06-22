
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Ruler, Weight } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";
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
          اطلاعات شخصی شما
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          label="نام و نام خانوادگی"
          value={profile.name}
          onChange={(value) => handleUpdate('name', value)}
          placeholder="نام کامل خود را وارد کنید"
          icon={User}
          error={errors.name || ''}
          isValid={validFields.name}
        />

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
          <p className="text-xs text-slate-500 dark:text-slate-400">
            شماره موبایل قابل تغییر نیست
          </p>
        </div>

        <ModernFormField
          label="سن"
          value={toPersianNumbers(profile.age)}
          onChange={(value) => {
            // Convert Persian numbers back to English for storage
            const englishValue = value.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
            handleUpdate('age', englishValue);
          }}
          placeholder="۲۵"
          icon={Calendar}
          error={errors.age || ''}
          isValid={validFields.age}
          type="number"
        />

        {/* Gender - Read-only display */}
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
              className="w-full pr-10 pl-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-default"
            />
          </div>
        </div>

        <ModernFormField
          label="قد (سانتی‌متر)"
          value={toPersianNumbers(profile.height)}
          onChange={(value) => {
            // Convert Persian numbers back to English for storage
            const englishValue = value.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
            handleUpdate('height', englishValue);
          }}
          placeholder="۱۷۵"
          icon={Ruler}
          error={errors.height || ''}
          isValid={validFields.height}
          type="number"
        />

        <ModernFormField
          label="وزن (کیلوگرم)"
          value={toPersianNumbers(profile.weight)}
          onChange={(value) => {
            // Convert Persian numbers back to English for storage
            const englishValue = value.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
            handleUpdate('weight', englishValue);
          }}
          placeholder="۷۰"
          icon={Weight}
          error={errors.weight || ''}
          isValid={validFields.weight}
          type="number"
        />
      </div>
    </motion.div>
  );
};
