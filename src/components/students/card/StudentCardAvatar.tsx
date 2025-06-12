
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface StudentCardAvatarProps {
  image?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export const StudentCardAvatar: React.FC<StudentCardAvatarProps> = ({ 
  image, 
  name, 
  size = "md" 
}) => {
  const getSize = () => {
    switch (size) {
      case "sm": return "h-8 w-8";
      case "lg": return "h-14 w-14";
      default: return "h-11 w-11";
    }
  };

  const firstLetter = name[0];
  
  // Define gradient colors for avatar fallback
  const bgGradients = [
    "from-indigo-500 to-violet-600",
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-teal-600",
    "from-amber-500 to-orange-600"
  ];
  
  // Use first letter to consistently choose a gradient
  const charCode = firstLetter ? firstLetter.charCodeAt(0) : 0;
  const gradientIndex = charCode % bgGradients.length;
  const gradient = bgGradients[gradientIndex];
  
  return (
    <div className="relative group">
      {/* Decorative glow background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 0.95 }}
        whileHover={{ opacity: 0.5, scale: 1.1 }}
        className={`absolute -inset-1 rounded-full bg-indigo-400 dark:bg-indigo-600 blur-md opacity-30 
                 group-hover:opacity-40 transition-all duration-300 ${getSize()}`}
      />
      
      <Avatar className={`${getSize()} border-2 border-white dark:border-slate-800 shadow-lg 
                       ring-2 ring-indigo-100 dark:ring-indigo-900/20 
                       group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800/30 
                       transition-all duration-300`}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className={`bg-gradient-to-br ${gradient} text-white font-semibold`}>
          {!firstLetter ? <User className="h-4 w-4" /> : firstLetter}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
