
import { motion } from "framer-motion";
import { ModernFormField } from "../ModernFormField";
import { ModernFormTextArea } from "../ModernFormTextArea";
import { Building, MapPin, Phone, Globe, Clock } from "lucide-react";

interface GymInfoSectionProps {
  profileData: any;
  deviceInfo: any;
}

export const GymInfoSection = ({ profileData, deviceInfo }: GymInfoSectionProps) => {
  const { profile, updateProfile } = profileData;
  
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
        <ModernFormField
          id="gymName"
          label="نام باشگاه"
          value={profile?.gymInfo?.gymName || ""}
          onChange={(value) => updateProfile('gymInfo', 'gymName', value)}
          placeholder="نام باشگاه خود را وارد کنید"
          icon={<Building className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          required
        />
      </motion.div>

      <motion.div variants={item}>
        <ModernFormTextArea
          id="gymDescription"
          label="توضیحات باشگاه"
          value={profile?.gymInfo?.gymDescription || ""}
          onChange={(value) => updateProfile('gymInfo', 'gymDescription', value)}
          placeholder="توضیح کاملی از باشگاه، امکانات و خدمات ارائه شده"
          icon={<Building className="absolute right-3 top-3 h-5 w-5 text-emerald-600/70" />}
        />
      </motion.div>

      <motion.div variants={item}>
        <ModernFormField
          id="gymAddress"
          label="آدرس باشگاه"
          value={profile?.gymInfo?.gymAddress || ""}
          onChange={(value) => updateProfile('gymInfo', 'gymAddress', value)}
          placeholder="آدرس کامل باشگاه را وارد کنید"
          icon={<MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          required
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          id="gymPhone"
          label="تلفن باشگاه"
          value={profile?.gymInfo?.gymPhone || ""}
          onChange={(value) => updateProfile('gymInfo', 'gymPhone', value)}
          placeholder="۰۲۱-۸۸۷۷۶۶۵۵"
          icon={<Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          dir="ltr"
        />
        
        <ModernFormField
          id="gymWebsite"
          label="وب‌سایت باشگاه"
          value={profile?.gymInfo?.gymWebsite || ""}
          onChange={(value) => updateProfile('gymInfo', 'gymWebsite', value)}
          placeholder="https://gym-website.com"
          icon={<Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
          dir="ltr"
        />
      </motion.div>

      <motion.div variants={item}>
        <ModernFormField
          id="workingHours"
          label="ساعات کاری"
          value={profile?.gymInfo?.workingHours || ""}
          onChange={(value) => updateProfile('gymInfo', 'workingHours', value)}
          placeholder="شنبه تا پنج‌شنبه: ۶:۰۰ تا ۲۳:۰۰"
          icon={<Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/70" />}
        />
      </motion.div>
    </motion.div>
  );
};
