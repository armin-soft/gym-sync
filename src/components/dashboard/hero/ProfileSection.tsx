
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "@/types/dashboard";

interface ProfileSectionProps {
  trainerProfile: {
    name: string;
    image?: string;
  };
  stats?: DashboardStats;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ trainerProfile }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center gap-4"
    >
      <Avatar className="h-14 w-14 border-3 border-orange-200/50 dark:border-orange-700/50 shadow-brand-orange">
        <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
        <AvatarFallback className="brand-bg-secondary brand-text-dark text-lg font-bold">
          {trainerProfile.name ? trainerProfile.name.substring(0, 2) : <User className="h-6 w-6" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <h2 className="text-xl font-bold brand-text-dark dark:text-white">
          {trainerProfile.name || "مربی عزیز"}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">خوش آمدید</p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="hover-brand-orange rounded-full"
        onClick={() => navigate('/profile')}
      >
        <Settings className="h-5 w-5 brand-text-primary" />
      </Button>
    </motion.div>
  );
};
