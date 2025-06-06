
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Crown, Star } from "lucide-react";
import { ModernProfileImage } from "../image/ModernProfileImage";

interface ModernProfileCardProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  isMobile?: boolean;
}

export const ModernProfileCard = ({ profile, onImageChange, isMobile = false }: ModernProfileCardProps) => {
  return (
    <motion.div 
      className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100/50 dark:border-emerald-800/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`p-8 text-center space-y-${isMobile ? '6' : '8'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ModernProfileImage 
            image={profile.image}
            onImageChange={onImageChange}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          {/* نشان مربی */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-l from-emerald-600 to-sky-600 shadow-xl">
              <Crown className="h-6 w-6 text-white" />
            </div>
          </div>

          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent`}>
            {profile.name || "نام مربی"}
          </h3>

          {profile.phone && (
            <p className="text-slate-600 dark:text-slate-400 font-medium" dir="ltr">
              {profile.phone}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 mt-4">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">پروفایل فعال</span>
          </div>

          {/* ستاره‌های امتیاز */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
