
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrainerProfile } from "@/types/trainer";
import { Instagram, Globe } from "lucide-react";

interface SocialMediaFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const SocialMediaForm = ({ profile, onUpdate }: SocialMediaFormProps) => {
  const fields = [
    {
      key: "instagram" as keyof TrainerProfile,
      label: "آیدی اینستاگرام",
      placeholder: "username",
      icon: Instagram,
      dir: "ltr" as const
    },
    {
      key: "website" as keyof TrainerProfile,
      label: "وب‌سایت",
      placeholder: "https://example.com",
      icon: Globe,
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
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          شبکه‌های اجتماعی
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          اطلاعات تماس و شبکه‌های اجتماعی خود را وارد کنید
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
            </Label>
            <div className="relative">
              <field.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id={field.key}
                value={profile[field.key]}
                onChange={(e) => onUpdate(field.key, e.target.value)}
                placeholder={field.placeholder}
                dir={field.dir}
                className="pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
