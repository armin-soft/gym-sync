
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, MapPin, Info, Check, AlertCircle } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";

interface GymInfoFormProps {
  profile: TrainerProfile;
  updateProfile: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
}

export const GymInfoForm: React.FC<GymInfoFormProps> = ({
  profile,
  updateProfile,
  errors,
  setErrors
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateField = (key: keyof TrainerProfile, value: string) => {
    let error = '';
    
    switch (key) {
      case 'gymName':
        if (!value.trim()) {
          error = 'نام باشگاه الزامی است';
        }
        break;
      case 'gymAddress':
        if (!value.trim()) {
          error = 'آدرس باشگاه الزامی است';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleChange = (key: keyof TrainerProfile, value: string) => {
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
          focusedField === id ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
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
        id="gymName"
        label="نام باشگاه"
        icon={<Building className="h-5 w-5 text-blue-600" />}
        required
        error={errors.gymName}
      >
        <Input
          id="gymName"
          value={profile.gymName}
          onChange={(e) => handleChange('gymName', e.target.value)}
          onFocus={() => setFocusedField('gymName')}
          onBlur={() => setFocusedField(null)}
          placeholder="نام باشگاه یا مجموعه ورزشی"
          className={cn(
            "h-14 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300",
            focusedField === 'gymName' 
              ? "border-blue-500 ring-4 ring-blue-500/20" 
              : errors.gymName 
                ? "border-red-500" 
                : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>

      <FormField
        id="gymDescription"
        label="توضیحات باشگاه"
        icon={<Info className="h-5 w-5 text-blue-600" />}
        error={errors.gymDescription}
      >
        <Textarea
          id="gymDescription"
          value={profile.gymDescription}
          onChange={(e) => handleChange('gymDescription', e.target.value)}
          onFocus={() => setFocusedField('gymDescription')}
          onBlur={() => setFocusedField(null)}
          placeholder="توضیحات کاملی از امکانات و ویژگی‌های باشگاه"
          className={cn(
            "h-32 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300 resize-none",
            focusedField === 'gymDescription' 
              ? "border-blue-500 ring-4 ring-blue-500/20" 
              : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>

      <FormField
        id="gymAddress"
        label="آدرس باشگاه"
        icon={<MapPin className="h-5 w-5 text-blue-600" />}
        required
        error={errors.gymAddress}
      >
        <Textarea
          id="gymAddress"
          value={profile.gymAddress}
          onChange={(e) => handleChange('gymAddress', e.target.value)}
          onFocus={() => setFocusedField('gymAddress')}
          onBlur={() => setFocusedField(null)}
          placeholder="آدرس کامل باشگاه شامل شهر، خیابان و پلاک"
          className={cn(
            "h-24 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300 resize-none",
            focusedField === 'gymAddress' 
              ? "border-blue-500 ring-4 ring-blue-500/20" 
              : errors.gymAddress 
                ? "border-red-500" 
                : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>
    </motion.div>
  );
};
