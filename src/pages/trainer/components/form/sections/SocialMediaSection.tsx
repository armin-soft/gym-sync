
import { motion } from "framer-motion";
import { ModernFormField } from "../ModernFormField";
import { Instagram, MessageCircle, Phone, Globe, Youtube } from "lucide-react";

interface SocialMediaSectionProps {
  profileData: any;
  deviceInfo: any;
}

export const SocialMediaSection = ({ profileData, deviceInfo }: SocialMediaSectionProps) => {
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
          id="instagram"
          label="اینستاگرام"
          value={profile?.socialMedia?.instagram || ""}
          onChange={(value) => updateProfile('socialMedia', 'instagram', value)}
          placeholder="username"
          icon={<Instagram className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-600/70" />}
          dir="ltr"
        />
        
        <ModernFormField
          id="telegram"
          label="تلگرام"
          value={profile?.socialMedia?.telegram || ""}
          onChange={(value) => updateProfile('socialMedia', 'telegram', value)}
          placeholder="@username"
          icon={<MessageCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600/70" />}
          dir="ltr"
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernFormField
          id="whatsapp"
          label="واتساپ"
          value={profile?.socialMedia?.whatsapp || ""}
          onChange={(value) => updateProfile('socialMedia', 'whatsapp', value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          icon={<Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600/70" />}
          dir="ltr"
        />
        
        <ModernFormField
          id="website"
          label="وب‌سایت شخصی"
          value={profile?.socialMedia?.website || ""}
          onChange={(value) => updateProfile('socialMedia', 'website', value)}
          placeholder="https://your-website.com"
          icon={<Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-600/70" />}
          dir="ltr"
        />
      </motion.div>

      <motion.div variants={item}>
        <ModernFormField
          id="youtube"
          label="یوتیوب"
          value={profile?.socialMedia?.youtube || ""}
          onChange={(value) => updateProfile('socialMedia', 'youtube', value)}
          placeholder="نام کانال یوتیوب"
          icon={<Youtube className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-600/70" />}
        />
      </motion.div>
    </motion.div>
  );
};
