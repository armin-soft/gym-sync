
import React from "react";
import { motion } from "framer-motion";
import { Instagram, Globe } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { ModernFormField } from "./ModernFormField";

interface SocialMediaFormProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  profile,
  errors,
  validFields,
  handleUpdate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          شبکه‌های اجتماعی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          لینک‌های شبکه‌های اجتماعی و وبسایت خود را وارد کنید
        </p>
      </div>

      <ModernFormField
        label="اینستاگرام"
        value={profile.instagram}
        onChange={(value) => handleUpdate('instagram', value)}
        placeholder="نام کاربری اینستاگرام یا لینک پیج"
        icon={Instagram}
        error={errors.instagram}
        isValid={validFields.instagram}
      />

      <ModernFormField
        label="وبسایت"
        value={profile.website}
        onChange={(value) => handleUpdate('website', value)}
        placeholder="آدرس وبسایت شخصی یا باشگاه"
        icon={Globe}
        error={errors.website}
        isValid={validFields.website}
        type="url"
      />

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          نکات مهم
        </h3>
        <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            برای اینستاگرام می‌توانید فقط نام کاربری یا لینک کامل وارد کنید
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            وبسایت باید با http:// یا https:// شروع شود
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            این اطلاعات در پروفایل شما نمایش داده خواهد شد
          </li>
        </ul>
      </div>
    </motion.div>
  );
};
