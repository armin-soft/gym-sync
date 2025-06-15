
import React from "react";
import { motion } from "framer-motion";
import { Heart, Scale, Ruler, PhoneCall, AlertTriangle } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface HealthInfoFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, string>>>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, boolean>>>>;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
}

export const HealthInfoForm: React.FC<HealthInfoFormProps> = ({
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
          اطلاعات سلامت
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات مربوط به سلامت و آمادگی جسمانی خود را وارد کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          label="قد (سانتی‌متر)"
          value={profile.height}
          onChange={(value) => handleUpdate('height', value)}
          placeholder="175"
          icon={Ruler}
          error={errors.height}
          isValid={validFields.height}
          type="number"
        />

        <ModernFormField
          label="وزن (کیلوگرم)"
          value={profile.weight}
          onChange={(value) => handleUpdate('weight', value)}
          placeholder="70"
          icon={Scale}
          error={errors.weight}
          isValid={validFields.weight}
          type="number"
        />

        <ModernFormField
          label="سطح آماده‌گی جسمانی"
          value={profile.fitnessLevel}
          onChange={(value) => handleUpdate('fitnessLevel', value)}
          placeholder="مبتدی، متوسط، حرفه‌ای"
          icon={Heart}
          error={errors.fitnessLevel}
          isValid={validFields.fitnessLevel}
        />

        <ModernFormField
          label="شماره تماس اضطراری"
          value={profile.emergencyContact}
          onChange={(value) => handleUpdate('emergencyContact', value)}
          placeholder="شماره تلفن یکی از بستگان"
          icon={PhoneCall}
          error={errors.emergencyContact}
          isValid={validFields.emergencyContact}
          type="tel"
        />
      </div>

      <ModernFormField
        label="شرایط پزشکی خاص"
        value={profile.medicalConditions}
        onChange={(value) => handleUpdate('medicalConditions', value)}
        placeholder="بیماری‌ها، آلرژی‌ها، محدودیت‌های جسمانی یا مصرف داروهای خاص را ذکر کنید"
        icon={AlertTriangle}
        error={errors.medicalConditions}
        isValid={validFields.medicalConditions}
        textarea
        rows={4}
      />
    </motion.div>
  );
};
