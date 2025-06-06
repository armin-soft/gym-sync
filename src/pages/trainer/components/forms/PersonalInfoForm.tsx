
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainerProfile } from "@/types/trainer";
import { User, Phone, FileText } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const PersonalInfoForm = ({ profile, onUpdate }: PersonalInfoFormProps) => {
  const fields = [
    {
      key: "name" as keyof TrainerProfile,
      label: "نام و نام خانوادگی",
      placeholder: "نام کامل خود را وارد کنید",
      icon: User,
      required: true
    },
    {
      key: "phone" as keyof TrainerProfile,
      label: "شماره موبایل",
      placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
      icon: Phone,
      required: true,
      dir: "ltr" as const
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          اطلاعات شخصی
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          اطلاعات شخصی خود را با دقت تکمیل کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="space-y-2"
          >
            <Label htmlFor={field.key} className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </Label>
            <div className="relative">
              <field.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id={field.key}
                value={field.key === "phone" ? toPersianNumbers(profile[field.key]) : profile[field.key]}
                onChange={(e) => onUpdate(field.key, e.target.value)}
                placeholder={field.placeholder}
                dir={field.dir}
                className="pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-400 transition-colors"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-2"
      >
        <Label htmlFor="bio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          بیوگرافی
        </Label>
        <div className="relative">
          <FileText className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => onUpdate("bio", e.target.value)}
            placeholder="درباره خود و تجربیات ورزشی‌تان بنویسید..."
            className="pr-10 min-h-[120px] border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-400 transition-colors resize-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
