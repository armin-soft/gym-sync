
import { TrainerProfile } from "@/types/trainer";
import { FormField } from "./FormField";
import { FormTextArea } from "./FormTextArea";
import { Building, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface GymInfoFormProps {
  profile: TrainerProfile;
  onChange: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
}

export const GymInfoForm = ({
  profile,
  onChange,
  errors,
  validFields,
}: GymInfoFormProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormField
        id="gymName"
        label="نام باشگاه"
        value={profile.gymName}
        onChange={(value) => onChange('gymName', value)}
        placeholder="باشگاه بدنسازی فیکس"
        icon={<Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.gymName}
        isValid={validFields.gymName}
      />

      <FormTextArea
        id="gymDescription"
        label="توضیحات باشگاه"
        value={profile.gymDescription}
        onChange={(value) => onChange('gymDescription', value)}
        placeholder="توضیحات باشگاه را وارد کنید"
        error={errors.gymDescription}
        isValid={validFields.gymDescription}
      />

      <FormField
        id="gymAddress"
        label="آدرس باشگاه"
        value={profile.gymAddress}
        onChange={(value) => onChange('gymAddress', value)}
        placeholder="تهران، خیابان ولیعصر، پلاک ۱۲۸"
        icon={<MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.gymAddress}
        isValid={validFields.gymAddress}
      />
    </motion.div>
  );
};
