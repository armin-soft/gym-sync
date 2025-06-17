
import React from "react";
import { motion } from "framer-motion";
import { Ruler, Weight, Heart, AlertTriangle } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface HealthInfoFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
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
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اطلاعات سلامتی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات جسمی و سلامتی خود را وارد کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          label="قد (سانتی‌متر)"
          value={profile.height}
          onChange={(value) => handleUpdate('height', value)}
          placeholder="175"
          icon={Ruler}
          error={errors.height || ''}
          isValid={validFields.height}
          type="number"
        />

        <ModernFormField
          label="وزن (کیلوگرم)"
          value={profile.weight}
          onChange={(value) => handleUpdate('weight', value)}
          placeholder="70"
          icon={Weight}
          error={errors.weight || ''}
          isValid={validFields.weight}
          type="number"
        />
      </div>

      <div className="space-y-6">
        <ModernFormField
          label="شرایط پزشکی خاص"
          value={profile.medicalConditions}
          onChange={(value) => handleUpdate('medicalConditions', value)}
          placeholder="در صورت وجود شرایط پزشکی خاص، لطفاً توضیح دهید"
          icon={Heart}
          error={errors.medicalConditions || ''}
          isValid={validFields.medicalConditions}
          type="textarea"
        />

        <ModernFormField
          label="آلرژی‌ها"
          value={profile.allergies}
          onChange={(value) => handleUpdate('allergies', value)}
          placeholder="در صورت وجود آلرژی به غذا، دارو یا سایر موارد، لطفاً ذکر کنید"
          icon={AlertTriangle}
          error={errors.allergies || ''}
          isValid={validFields.allergies}
          type="textarea"
        />
      </div>
    </motion.div>
  );
};
