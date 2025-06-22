
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Ruler, Weight } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

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
          لطفاً اطلاعات شخصی خود را با دقت وارد کنید
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

        <ModernFormField
          label="شماره موبایل"
          value={profile.phone}
          onChange={(value) => handleUpdate('phone', value)}
          placeholder="09123456789"
          icon={Phone}
          error={errors.phone || ''}
          isValid={validFields.phone}
        />

        <ModernFormField
          label="سن"
          value={profile.age}
          onChange={(value) => handleUpdate('age', value)}
          placeholder="25"
          icon={Calendar}
          error={errors.age || ''}
          isValid={validFields.age}
          type="number"
        />

        <ModernFormField
          label="جنسیت"
          value={profile.gender === 'male' ? 'مرد' : 'زن'}
          onChange={(value) => handleUpdate('gender', value === 'مرد' ? 'male' : 'female')}
          placeholder="انتخاب کنید"
          icon={User}
          error={errors.gender || ''}
          isValid={validFields.gender}
          type="select"
          options={[
            { value: 'male', label: 'مرد' },
            { value: 'female', label: 'زن' }
          ]}
        />

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
    </motion.div>
  );
};
