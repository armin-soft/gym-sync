
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { ProfileAvatar } from "./ProfileAvatar";
import { WelcomeMessage } from "./WelcomeMessage";
import { StatsDisplay } from "./StatsDisplay";
import { DateTimeSection } from "./DateTimeSection";

interface ProfessionalHeroSectionProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const ProfessionalHeroSection = ({ 
  stats, 
  currentTime, 
  trainerProfile 
}: ProfessionalHeroSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl min-h-[280px]"
      style={{
        background: 'linear-gradient(135deg, rgb(99 102 241 / 0.95) 0%, rgb(139 92 246 / 0.95) 30%, rgb(168 85 247 / 0.95) 70%, rgb(236 72 153 / 0.95) 100%)'
      }}
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30" />
        
        {/* Animated background shapes */}
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <ProfileAvatar 
              image={trainerProfile.image} 
              name={trainerProfile.name} 
            />
            <div className="space-y-4">
              <WelcomeMessage name={trainerProfile.name} />
              <div className="hidden md:block">
                <StatsDisplay stats={stats} />
              </div>
            </div>
          </div>
          
          {/* Date Time Section */}
          <div className="w-full lg:w-auto">
            <DateTimeSection currentTime={currentTime} />
          </div>
        </div>
        
        {/* Mobile Stats Display */}
        <div className="md:hidden mt-6 pt-6 border-t border-white/20">
          <StatsDisplay stats={stats} />
        </div>
      </div>
    </motion.div>
  );
};
