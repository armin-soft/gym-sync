
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserRound, Phone, Info, Check, AlertCircle } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface PersonalInfoFormProps {
  profile: TrainerProfile;
  updateProfile: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  profile,
  updateProfile,
  errors,
  setErrors
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateField = (key: keyof TrainerProfile, value: string) => {
    let error = '';
    
    switch (key) {
      case 'name':
        if (!value.trim()) {
          error = 'نام و نام خانوادگی الزامی است';
        } else if (value.trim().length < 2) {
          error = 'نام باید حداقل ۲ کاراکتر باشد';
        }
        break;
      case 'phone':
        const phoneRegex = /^(09|۰۹)[0-9۰-۹]{9}$/;
        if (!value.trim()) {
          error = 'شماره موبایل الزامی است';
        } else if (!phoneRegex.test(value)) {
          error = 'شماره موبایل معتبر نیست';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleChange = (key: keyof TrainerProfile, value: string) => {
    // فیلتر کردن ورودی برای فیلد نام - فقط حروف فارسی
    if (key === 'name') {
      const persianOnly = value.replace(/[^[\u0600-\u06FF\s]]/g, '');
      updateProfile(key, persianOnly);
      validateField(key, persianOnly);
      return;
    }

    // فیلتر کردن ورودی برای شماره تلفن - فقط اعداد
    if (key === 'phone') {
      let numbersOnly = value.replace(/[^0-9۰-۹]/g, '');
      if (!numbersOnly.startsWith('09') && !numbersOnly.startsWith('۰۹')) {
        numbersOnly = '09' + numbersOnly.slice(2);
      }
      updateProfile(key, numbersOnly);
      validateField(key, numbersOnly);
      return;
    }

    updateProfile(key, value);
    validateField(key, value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const FormField = ({ 
    id, 
    label, 
    icon, 
    required = false, 
    children, 
    error 
  }: { 
    id: string; 
    label: string; 
    icon: React.ReactNode; 
    required?: boolean; 
    children: React.ReactNode;
    error?: string;
  }) => (
    <motion.div variants={item} className="space-y-3">
      <Label 
        htmlFor={id}
        className={cn(
          "text-base font-bold transition-colors flex items-center gap-2",
          focusedField === id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
        )}
      >
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        {children}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 text-red-500"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
        {!error && focusedField === id && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 text-green-500"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm">صحیح است</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <FormField
        id="name"
        label="نام و نام خانوادگی"
        icon={<UserRound className="h-5 w-5 text-indigo-600" />}
        required
        error={errors.name}
      >
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          placeholder="نام کامل خود را به فارسی وارد کنید"
          className={cn(
            "h-14 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300",
            focusedField === 'name' 
              ? "border-indigo-500 ring-4 ring-indigo-500/20" 
              : errors.name 
                ? "border-red-500" 
                : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>

      <FormField
        id="bio"
        label="درباره من"
        icon={<Info className="h-5 w-5 text-indigo-600" />}
        error={errors.bio}
      >
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          onFocus={() => setFocusedField('bio')}
          onBlur={() => setFocusedField(null)}
          placeholder="بیوگرافی کوتاهی از خود و تجربیات‌تان بنویسید"
          className={cn(
            "h-32 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300 resize-none",
            focusedField === 'bio' 
              ? "border-indigo-500 ring-4 ring-indigo-500/20" 
              : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>

      <FormField
        id="phone"
        label="شماره موبایل"
        icon={<Phone className="h-5 w-5 text-indigo-600" />}
        required
        error={errors.phone}
      >
        <Input
          id="phone"
          value={toPersianNumbers(profile.phone)}
          onChange={(e) => handleChange('phone', e.target.value)}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          dir="ltr"
          className={cn(
            "h-14 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300",
            focusedField === 'phone' 
              ? "border-indigo-500 ring-4 ring-indigo-500/20" 
              : errors.phone 
                ? "border-red-500" 
                : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>
    </motion.div>
  );
};
