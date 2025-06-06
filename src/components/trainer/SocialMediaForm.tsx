
import { TrainerProfile } from "@/types/trainer";
import { FormField } from "./FormField";
import { Instagram, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface SocialMediaFormProps {
  profile: TrainerProfile;
  onChange: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
}

export const SocialMediaForm = ({
  profile,
  onChange,
  errors,
  validFields,
}: SocialMediaFormProps) => {
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
          id="instagram"
          label="اینستاگرام"
          value={profile.instagram}
          onChange={(value) => onChange('instagram', value)}
          placeholder="username"
          icon={<Instagram className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-600/70" />}
          error={errors.instagram}
          isValid={validFields.instagram}
          required={false}
          dir="ltr"
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          id="website"
          label="وب‌سایت"
          value={profile.website}
          onChange={(value) => onChange('website', value)}
          placeholder="https://example.com"
          icon={<Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600/70" />}
          error={errors.website}
          isValid={validFields.website}
          required={false}
          dir="ltr"
        />
      </motion.div>
    </motion.div>
  );
};
