
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
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormField
        id="instagram"
        label="اینستاگرام"
        value={profile.instagram}
        onChange={(value) => onChange('instagram', value)}
        placeholder="username"
        icon={<Instagram className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.instagram}
        isValid={validFields.instagram}
        required={false}
        dir="ltr"
      />

      <FormField
        id="website"
        label="وب‌سایت"
        value={profile.website}
        onChange={(value) => onChange('website', value)}
        placeholder="https://example.com"
        icon={<Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.website}
        isValid={validFields.website}
        required={false}
        dir="ltr"
      />
    </motion.div>
  );
};
