
import React from "react";
import { motion } from "framer-motion";
import { StudentProfileImage } from "@/components/trainer/StudentProfileImage";
import { StudentProfile } from "../../types/studentProfile";
import { Badge } from "@/components/ui/badge";

interface ProfileImageSectionProps {
  profile: StudentProfile;
  onImageChange: (image: string) => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  profile,
  onImageChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center space-y-6"
    >
      <StudentProfileImage 
        image={profile.image}
        onImageChange={onImageChange}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          {profile.name}
        </h3>
        <div className="flex flex-col gap-2">
          <Badge 
            className={`${
              profile.paymentStatus === 'paid' 
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                : profile.paymentStatus === 'pending'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            }`}
            variant="secondary"
          >
            وضعیت پرداخت: {
              profile.paymentStatus === 'paid' ? 'پرداخت شده' :
              profile.paymentStatus === 'pending' ? 'در انتظار' : 'معوقه'
            }
          </Badge>
        </div>
      </motion.div>
    </motion.div>
  );
};
