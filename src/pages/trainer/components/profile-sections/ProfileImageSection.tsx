
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, User, Edit3 } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProfileImageSectionProps {
  profile: TrainerProfile;
  onImageChange: (image: string) => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ 
  profile, 
  onImageChange 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center space-y-6">
      {/* تصویر پروفایل */}
      <motion.div 
        className="relative mx-auto w-40 h-40"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
          {profile.image && profile.image !== "/Assets/Image/Place-Holder.svg" ? (
            <img 
              src={profile.image} 
              alt="پروفایل مربی" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
              <User className="w-16 h-16 text-emerald-500 dark:text-emerald-400" />
            </div>
          )}
          
          {/* Overlay برای ویرایش */}
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-white text-center">
              <Camera className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">تغییر تصویر</span>
            </div>
          </motion.div>
        </div>

        {/* دکمه ویرایش */}
        <motion.label
          htmlFor="image-upload"
          className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-full flex items-center justify-center cursor-pointer shadow-xl border-4 border-white dark:border-slate-900"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit3 className="w-5 h-5 text-white" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </motion.label>
      </motion.div>

      {/* اطلاعات کلی */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {profile.name || "نام مربی"}
          </h3>
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {profile.gymName || "نام باشگاه"}
          </p>
        </motion.div>

        {/* وضعیت آنلاین */}
        <motion.div 
          className="inline-flex items-center gap-3 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-500/30 rounded-full animate-ping"></div>
          </div>
          <span className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">
            آنلاین - عضو از {toPersianNumbers("۱۴۰۲")}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
