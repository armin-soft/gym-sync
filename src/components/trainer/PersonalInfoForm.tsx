
import { TrainerProfile } from "@/types/trainer";
import { FormField } from "./FormField";
import { FormTextArea } from "./FormTextArea";
import { UserRound, Phone, Info } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoFormProps {
  profile: TrainerProfile;
  onChange: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
}

export const PersonalInfoForm = ({
  profile,
  onChange,
  errors,
  validFields,
}: PersonalInfoFormProps) => {
  // Animation for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <FormField
          id="name"
          label="نام و نام خانوادگی"
          value={profile.name}
          onChange={(value) => onChange('name', value)}
          placeholder="نام خود را به فارسی وارد کنید"
          icon={<UserRound className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-600/70" />}
          error={errors.name}
          isValid={validFields.name}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormTextArea
          id="bio"
          label="بیوگرافی"
          value={profile.bio}
          onChange={(value) => onChange('bio', value)}
          placeholder="درباره خود بنویسید"
          icon={<Info className="absolute right-3 top-3 h-5 w-5 text-indigo-600/70" />}
          error={errors.bio}
          isValid={validFields.bio}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          id="phone"
          label="شماره موبایل"
          value={toPersianNumbers(profile.phone)}
          onChange={(value) => onChange('phone', value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          icon={<Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-600/70" />}
          error={errors.phone}
          isValid={validFields.phone}
          dir="ltr"
        />
      </motion.div>
    </motion.div>
  );
};
