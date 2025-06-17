
import React from "react";
import { motion } from "framer-motion";
import { Target, Activity, Clock } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface GoalsFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
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
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اهداف و تنظیمات
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اهداف تمرینی و تنظیمات شخصی خود را مشخص کنید
        </p>
      </div>

      <div className="space-y-6">
        <ModernFormField
          label="هدف تمرینی"
          value={profile.goal}
          onChange={(value) => handleUpdate('goal', value)}
          placeholder="مثال: کاهش وزن، افزایش عضله، تناسب اندام"
          icon={Target}
          error={errors.goal || ''}
          isValid={validFields.goal}
          type="textarea"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernFormField
            label="سطح آمادگی جسمانی"
            value={
              profile.fitnessLevel === 'beginner' ? 'مبتدی' :
              profile.fitnessLevel === 'intermediate' ? 'متوسط' : 'پیشرفته'
            }
            onChange={(value) => handleUpdate('fitnessLevel', 
              value === 'مبتدی' ? 'beginner' :
              value === 'متوسط' ? 'intermediate' : 'advanced'
            )}
            placeholder="انتخاب کنید"
            icon={Activity}
            error={errors.fitnessLevel || ''}
            isValid={validFields.fitnessLevel}
            type="select"
            options={[
              { value: 'beginner', label: 'مبتدی' },
              { value: 'intermediate', label: 'متوسط' },
              { value: 'advanced', label: 'پیشرفته' }
            ]}
          />

          <ModernFormField
            label="زمان مطلوب تمرین"
            value={profile.preferredWorkoutTime}
            onChange={(value) => handleUpdate('preferredWorkoutTime', value)}
            placeholder="مثال: صبح، عصر، شب"
            icon={Clock}
            error={errors.preferredWorkoutTime || ''}
            isValid={validFields.preferredWorkoutTime}
          />
        </div>
      </div>
    </motion.div>
  );
};
