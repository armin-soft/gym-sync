
import { TrainerProfile } from "@/types/trainer";
import { FormField } from "./FormField";
import { FormTextArea } from "./FormTextArea";
import { UserRound, Phone, Mail, Lock } from "lucide-react";
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
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormField
        id="name"
        label="نام و نام خانوادگی"
        value={profile.name}
        onChange={(value) => onChange('name', value)}
        placeholder="نام خود را به فارسی وارد کنید"
        icon={<UserRound className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.name}
        isValid={validFields.name}
      />

      <FormTextArea
        id="bio"
        label="بیوگرافی"
        value={profile.bio}
        onChange={(value) => onChange('bio', value)}
        placeholder="درباره خود بنویسید"
        error={errors.bio}
        isValid={validFields.bio}
      />

      <FormField
        id="phone"
        label="شماره موبایل"
        value={toPersianNumbers(profile.phone)}
        onChange={(value) => onChange('phone', value)}
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
        icon={<Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.phone}
        isValid={validFields.phone}
        dir="ltr"
      />

      <FormField
        id="email"
        label="ایمیل"
        value={profile.email}
        onChange={(value) => onChange('email', value)}
        placeholder="example@domain.com"
        icon={<Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.email}
        isValid={validFields.email}
        dir="ltr"
      />

      <FormField
        id="password"
        label="گذرواژه"
        value={profile.password}
        onChange={(value) => onChange('password', value)}
        placeholder="حداقل ۸ کاراکتر شامل حروف انگلیسی و اعداد"
        icon={<Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />}
        error={errors.password}
        isValid={validFields.password}
        type="password"
      />
    </motion.div>
  );
};
