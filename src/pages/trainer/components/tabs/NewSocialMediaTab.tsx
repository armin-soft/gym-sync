
import { motion } from "framer-motion";
import { Share2, Instagram, MessageCircle, Globe, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewSocialMediaTabProps {
  profileData: any;
}

export const NewSocialMediaTab = ({ profileData }: NewSocialMediaTabProps) => {
  const socialMedia = profileData.profileData.socialMedia;

  const socialFields = [
    { id: "instagram", label: "اینستاگرام", icon: Instagram, value: socialMedia.instagram, prefix: "@" },
    { id: "telegram", label: "تلگرام", icon: MessageCircle, value: socialMedia.telegram, prefix: "@" },
    { id: "whatsapp", label: "واتساپ", icon: MessageCircle, value: socialMedia.whatsapp, prefix: "" },
    { id: "website", label: "وب‌سایت شخصی", icon: Globe, value: socialMedia.website, prefix: "https://" },
    { id: "youtube", label: "یوتیوب", icon: Youtube, value: socialMedia.youtube, prefix: "" },
    { id: "linkedin", label: "لینکدین", icon: Linkedin, value: socialMedia.linkedin, prefix: "" }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          شبکه‌های اجتماعی
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          حضور آنلاین خود را مدیریت کنید
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <field.icon className="w-4 h-4 text-purple-600" />
              {field.label}
            </Label>
            
            <div className="relative">
              {field.prefix && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  {field.prefix}
                </span>
              )}
              <Input
                value={field.value}
                className={`bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 ${
                  field.prefix ? 'pr-12' : ''
                }`}
                placeholder={`${field.label} خود را وارد کنید`}
                dir={field.id === 'website' ? 'ltr' : 'rtl'}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
