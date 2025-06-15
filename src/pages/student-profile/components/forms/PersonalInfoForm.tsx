
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface PersonalInfoFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, string>>>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, boolean>>>>;
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
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اطلاعات شخصی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات اساسی و شخصی خود را وارد کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          label="نام و نام خانوادگی"
          value={profile.name}
          onChange={(value) => handleUpdate('name', value)}
          placeholder="نام کامل خود را وارد کنید"
          icon={User}
          error={errors.name}
          isValid={validFields.name}
          required
        />

        <ModernFormField
          label="شماره تلفن"
          value={profile.phone}
          onChange={(value) => handleUpdate('phone', value)}
          placeholder="شماره موبایل خود را وارد کنید"
          icon={Phone}
          error={errors.phone}
          isValid={validFields.phone}
          type="tel"
          required
        />

        <ModernFormField
          label="آدرس ایمیل"
          value={profile.email}
          onChange={(value) => handleUpdate('email', value)}
          placeholder="ایمیل خود را وارد کنید"
          icon={Mail}
          error={errors.email}
          isValid={validFields.email}
          type="email"
        />

        <ModernFormField
          label="تاریخ تولد"
          value={profile.birthDate}
          onChange={(value) => handleUpdate('birthDate', value)}
          placeholder="1370/01/01"
          icon={User}
          error={errors.birthDate}
          isValid={validFields.birthDate}
        />
      </div>

      <ModernFormField
        label="آدرس منزل"
        value={profile.address}
        onChange={(value) => handleUpdate('address', value)}
        placeholder="آدرس کامل محل سکونت خود را وارد کنید"
        icon={MapPin}
        error={errors.address}
        isValid={validFields.address}
        textarea
        rows={3}
      />
    </motion.div>
  );
};
