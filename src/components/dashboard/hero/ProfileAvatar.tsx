
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, CheckCircle } from "lucide-react";

interface ProfileAvatarProps {
  image: string;
  name: string;
}

export const ProfileAvatar = ({ image, name }: ProfileAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Avatar className="h-20 w-20 ring-4 ring-white/30 shadow-2xl">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Crown Badge */}
        <motion.div 
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-4 w-4 text-white" fill="currentColor" />
        </motion.div>
        
        {/* Verification Badge */}
        <motion.div 
          className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <CheckCircle className="h-3 w-3 text-white" fill="currentColor" />
        </motion.div>
      </div>
    </motion.div>
  );
};
