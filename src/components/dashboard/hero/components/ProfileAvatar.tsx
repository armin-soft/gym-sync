
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Activity } from "lucide-react";

interface ProfileAvatarProps {
  profileImage: string;
  profileName: string;
  getInitials: (name: string) => string;
}

export const ProfileAvatar = ({ profileImage, profileName, getInitials }: ProfileAvatarProps) => {
  return (
    <div className="relative">
      <motion.div 
        className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 opacity-60 blur-xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <Avatar className="h-24 w-24 border-4 border-white/20 relative shadow-2xl ring-4 ring-violet-500/30">
        <AvatarImage 
          src={profileImage} 
          alt="تصویر پروفایل"
          className="object-cover"
        />
        <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-700 text-white font-bold text-xl">
          {getInitials(profileName)}
        </AvatarFallback>
      </Avatar>
      
      {/* Crown badge */}
      <motion.div 
        className="absolute -top-3 -left-3 p-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Crown className="h-5 w-5 text-white" fill="currentColor" />
      </motion.div>
      
      {/* Active badge */}
      <motion.div 
        className="absolute -bottom-2 -left-2 p-1.5 rounded-full bg-emerald-500 shadow-lg border-2 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
      >
        <Activity className="h-4 w-4 text-white" />
      </motion.div>
    </div>
  );
};
