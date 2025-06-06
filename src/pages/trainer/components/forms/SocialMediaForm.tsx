
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Globe, Check, AlertCircle } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";

interface SocialMediaFormProps {
  profile: TrainerProfile;
  updateProfile: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
}

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  profile,
  updateProfile,
  errors,
  setErrors
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateField = (key: keyof TrainerProfile, value: string) => {
    let error = '';
    
    switch (key) {
      case 'instagram':
        if (value && !value.match(/^[a-zA-Z0-9._]+$/)) {
          error = 'نام کاربری اینستاگرام معتبر نیست';
        }
        break;
      case 'website':
        if (value && !value.match(/^https?:\/\/.+/)) {
          error = 'آدرس وب‌سایت باید با http:// یا https:// شروع شود';
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
    children, 
    error 
  }: { 
    id: string; 
    label: string; 
    icon: React.ReactNode; 
    children: React.ReactNode;
    error?: string;
  }) => (
    <motion.div variants={item} className="space-y-3">
      <Label 
        htmlFor={id}
        className={cn(
          "text-base font-bold transition-colors flex items-center gap-2",
          focusedField === id ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300"
        )}
      >
        {icon}
        {label}
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
        {!error && focusedField === id && profile[id as keyof TrainerProfile] && (
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
        id="instagram"
        label="اینستاگرام"
        icon={<Instagram className="h-5 w-5 text-emerald-600" />}
        error={errors.instagram}
      >
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">@</div>
          <Input
            id="instagram"
            value={profile.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            onFocus={() => setFocusedField('instagram')}
            onBlur={() => setFocusedField(null)}
            placeholder="username"
            dir="ltr"
            className={cn(
              "h-14 text-lg pr-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300",
              focusedField === 'instagram' 
                ? "border-emerald-500 ring-4 ring-emerald-500/20" 
                : errors.instagram 
                  ? "border-red-500" 
                  : "border-gray-200 dark:border-gray-700"
            )}
          />
        </div>
      </FormField>

      <FormField
        id="website"
        label="وب‌سایت"
        icon={<Globe className="h-5 w-5 text-emerald-600" />}
        error={errors.website}
      >
        <Input
          id="website"
          value={profile.website}
          onChange={(e) => handleChange('website', e.target.value)}
          onFocus={() => setFocusedField('website')}
          onBlur={() => setFocusedField(null)}
          placeholder="https://example.com"
          dir="ltr"
          className={cn(
            "h-14 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 transition-all duration-300",
            focusedField === 'website' 
              ? "border-emerald-500 ring-4 ring-emerald-500/20" 
              : errors.website 
                ? "border-red-500" 
                : "border-gray-200 dark:border-gray-700"
          )}
        />
      </FormField>
    </motion.div>
  );
};
