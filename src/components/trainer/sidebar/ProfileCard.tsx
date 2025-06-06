
import { motion } from "framer-motion";
import { CheckCircle, Crown } from "lucide-react";
import { ProfileImage } from "../ProfileImage";

interface ProfileCardProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  isMobile?: boolean;
}

export const ProfileCard = ({ profile, onImageChange, isMobile = false }: ProfileCardProps) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`p-6 text-center space-y-${isMobile ? '4' : '6'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ProfileImage 
            image={profile.image}
            onImageChange={onImageChange}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {!isMobile && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            {profile.name || "نام مربی"}
          </h3>
          {profile.phone && (
            <p className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'mt-1' : 'mb-2'}`} dir="ltr">{profile.phone}</p>
          )}
          <div className="flex items-center justify-center gap-2 mt-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">پروفایل فعال</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
