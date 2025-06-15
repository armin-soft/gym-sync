
import React from "react";
import { motion } from "framer-motion";
import { Target, Calendar } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface GoalsFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, string>>>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, boolean>>>>;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
}

export const GoalsForm: React.FC<GoalsFormProps> = ({
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
          اهداف و برنامه
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اهداف تناسب اندام و برنامه‌های ورزشی خود را مشخص کنید
        </p>
      </div>

      <ModernFormField
        label="اهداف تناسب اندام"
        value={profile.goal}
        onChange={(value) => handleUpdate('goal', value)}
        placeholder="مثلاً: کاهش وزن، عضله‌سازی، بهبود استقامت، تناسب اندام عمومی"
        icon={Target}
        error={errors.goal}
        isValid={validFields.goal}
        textarea
        rows={4}
      />

      <ModernFormField
        label="تاریخ عضویت"
        value={profile.membershipDate}
        onChange={(value) => handleUpdate('membershipDate', value)}
        placeholder="1403/01/01"
        icon={Calendar}
        error={errors.membershipDate}
        isValid={validFields.membershipDate}
      />
    </motion.div>
  );
};
