
import { motion } from "framer-motion";
import { ModernFormField } from "../ModernFormField";
import { ModernFormTextArea } from "../ModernFormTextArea";
import { User, Phone, Mail, Calendar, IdCard } from "lucide-react";

interface PersonalInfoSectionProps {
  profileData: any;
  deviceInfo: any;
}

export const PersonalInfoSection = ({ profileData, deviceInfo }: PersonalInfoSectionProps) => {
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
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          id="fullName"
          label="نام و نام خانوادگی"
          value={profile?.personalInfo?.fullName || ""}
          onChange={(value) => updateProfile('personalInfo', 'fullName', value)}
          placeholder="نام کامل خود را وارد کنید"
          icon={<User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          required
        />
        
        <ModernFormField
          id="displayName"
          label="نام نمایشی"
          value={profile?.personalInfo?.displayName || ""}
          onChange={(value) => updateProfile('personalInfo', 'displayName', value)}
          placeholder="مثال: استاد احمد"
          icon={<User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          required
        />
      </motion.div>

      <motion.div variants={item}>
        <ModernFormTextArea
          id="bio"
          label="بیوگرافی"
          value={profile?.personalInfo?.bio || ""}
          onChange={(value) => updateProfile('personalInfo', 'bio', value)}
          placeholder="درباره خود، تخصص‌ها و تجربیات خود بنویسید"
          icon={<User className="absolute right-3 top-3 h-5 w-5 text-blue-600/70" />}
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          id="phone"
          label="شماره موبایل"
          value={profile?.personalInfo?.phone || ""}
          onChange={(value) => updateProfile('personalInfo', 'phone', value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          icon={<Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          dir="ltr"
          required
        />
        
        <ModernFormField
          id="email"
          label="ایمیل"
          value={profile?.personalInfo?.email || ""}
          onChange={(value) => updateProfile('personalInfo', 'email', value)}
          placeholder="example@gmail.com"
          icon={<Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          dir="ltr"
          type="email"
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          id="birthDate"
          label="تاریخ تولد"
          value={profile?.personalInfo?.birthDate || ""}
          onChange={(value) => updateProfile('personalInfo', 'birthDate', value)}
          placeholder="۱۳۶۵/۰۳/۱۵"
          icon={<Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
        />
        
        <ModernFormField
          id="nationalId"
          label="کد ملی"
          value={profile?.personalInfo?.nationalId || ""}
          onChange={(value) => updateProfile('personalInfo', 'nationalId', value)}
          placeholder="۱۲۳۴۵۶۷۸۹۰"
          icon={<IdCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          dir="ltr"
        />
      </motion.div>
    </motion.div>
  );
};
