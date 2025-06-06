
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainerProfile } from "@/types/trainer";
import { Building, MapPin, FileText } from "lucide-react";

interface GymInfoFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const GymInfoForm = ({ profile, onUpdate }: GymInfoFormProps) => {
  const fields = [
    {
      key: "gymName" as keyof TrainerProfile,
      label: "نام باشگاه",
      placeholder: "نام باشگاه خود را وارد کنید",
      icon: Building
    },
    {
      key: "gymAddress" as keyof TrainerProfile,
      label: "آدرس باشگاه",
      placeholder: "آدرس کامل باشگاه را وارد کنید",
      icon: MapPin
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
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          اطلاعات باشگاه
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          اطلاعات باشگاه و محل فعالیت خود را وارد کنید
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
                className="pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-2"
      >
        <Label htmlFor="gymDescription" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          توضیحات باشگاه
        </Label>
        <div className="relative">
          <FileText className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          <Textarea
            id="gymDescription"
            value={profile.gymDescription}
            onChange={(e) => onUpdate("gymDescription", e.target.value)}
            placeholder="درباره باشگاه، امکانات و خدمات آن بنویسید..."
            className="pr-10 min-h-[120px] border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors resize-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
