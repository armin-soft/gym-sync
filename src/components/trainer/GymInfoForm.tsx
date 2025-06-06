
import { TrainerProfile } from "@/types/trainer";
import { FormField } from "./FormField";
import { FormTextArea } from "./FormTextArea";
import { Building, MapPin, Info } from "lucide-react";
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
          id="gymName"
          label="نام باشگاه"
          value={profile.gymName}
          onChange={(value) => onChange('gymName', value)}
          placeholder="نام باشگاه را وارد کنید"
          icon={<Building className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          error={errors.gymName}
          isValid={validFields.gymName}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormTextArea
          id="gymDescription"
          label="توضیحات باشگاه"
          value={profile.gymDescription}
          onChange={(value) => onChange('gymDescription', value)}
          placeholder="توضیحات باشگاه را وارد کنید"
          icon={<Info className="absolute right-3 top-3 h-5 w-5 text-emerald-600/70" />}
          error={errors.gymDescription}
          isValid={validFields.gymDescription}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          id="gymAddress"
          label="آدرس باشگاه"
          value={profile.gymAddress}
          onChange={(value) => onChange('gymAddress', value)}
          placeholder="آدرس باشگاه را وارد کنید"
          icon={<MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          error={errors.gymAddress}
          isValid={validFields.gymAddress}
        />
      </motion.div>
    </motion.div>
  );
};
