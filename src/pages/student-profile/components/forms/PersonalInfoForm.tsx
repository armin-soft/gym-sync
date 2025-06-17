
import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Users, GraduationCap } from "lucide-react";
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
          label="ایمیل"
          value={profile.email}
          onChange={(value) => handleUpdate('email', value)}
          placeholder="example@email.com"
          icon={Mail}
          error={errors.email || ''}
          isValid={validFields.email}
          type="email"
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
          label="تاریخ تولد"
          value={profile.birthDate}
          onChange={(value) => handleUpdate('birthDate', value)}
          placeholder="1378/05/15"
          icon={Calendar}
          error={errors.birthDate || ''}
          isValid={validFields.birthDate}
        />

        <ModernFormField
          label="گروه تمرینی"
          value={profile.group}
          onChange={(value) => handleUpdate('group', value)}
          placeholder="گروه صبح"
          icon={Users}
          error={errors.group || ''}
          isValid={validFields.group}
        />

        <ModernFormField
          label="سطح تمرینی"
          value={profile.grade}
          onChange={(value) => handleUpdate('grade', value)}
          placeholder="مبتدی"
          icon={GraduationCap}
          error={errors.grade || ''}
          isValid={validFields.grade}
        />
      </div>

      <div className="space-y-6">
        <ModernFormField
          label="آدرس"
          value={profile.address}
          onChange={(value) => handleUpdate('address', value)}
          placeholder="آدرس کامل خود را وارد کنید"
          icon={MapPin}
          error={errors.address || ''}
          isValid={validFields.address}
          type="textarea"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          اطلاعات تماس اضطراری
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernFormField
            label="نام فرد تماس اضطراری"
            value={profile.emergencyContactName}
            onChange={(value) => handleUpdate('emergencyContactName', value)}
            placeholder="نام کامل"
            icon={User}
            error={errors.emergencyContactName || ''}
            isValid={validFields.emergencyContactName}
          />

          <ModernFormField
            label="شماره تماس اضطراری"
            value={profile.emergencyContactPhone}
            onChange={(value) => handleUpdate('emergencyContactPhone', value)}
            placeholder="09123456789"
            icon={Phone}
            error={errors.emergencyContactPhone || ''}
            isValid={validFields.emergencyContactPhone}
          />
        </div>
      </div>
    </motion.div>
  );
};
