
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Calendar, Clock, TrendingUp, Users, Sparkles } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface UltraModernHeroProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const UltraModernHero = ({ 
  stats, 
  currentTime, 
  trainerProfile 
}: UltraModernHeroProps) => {
  const deviceInfo = useDeviceInfo();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
      className="relative overflow-hidden rounded-3xl min-h-[400px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-pink-600/90" />
        
        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div 
          className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 text-white">
        <div className={`flex ${deviceInfo.isMobile ? 'flex-col space-y-6' : 'flex-row items-center justify-between'}`}>
          
          {/* Profile Section */}
          <motion.div 
            className="flex items-center space-x-6 space-x-reverse"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {trainerProfile.image ? (
                  <img 
                    src={trainerProfile.image} 
                    alt={trainerProfile.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Users className="w-8 h-8 text-white" />
                )}
              </motion.div>
              
              <motion.div 
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <motion.h1 
                className="text-2xl lg:text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                سلام، {trainerProfile.name || 'مربی عزیز'}! 👋
              </motion.h1>
              
              <motion.p 
                className="text-white/80 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                آماده برای یک روز پرانرژی هستید؟
              </motion.p>

              {/* Quick Stats */}
              <motion.div 
                className="flex items-center space-x-4 space-x-reverse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-lg rounded-lg px-3 py-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">{stats.totalStudents} شاگرد</span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-lg rounded-lg px-3 py-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{stats.studentsProgress}% پیشرفت</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Time & Date Section */}
          <motion.div 
            className="text-center lg:text-right space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <motion.div 
                className="flex items-center justify-center lg:justify-end space-x-3 space-x-reverse mb-3"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Clock className="w-6 h-6 text-white" />
                <span className="text-3xl font-bold">{formatTime(currentTime)}</span>
              </motion.div>
              
              <div className="flex items-center justify-center lg:justify-end space-x-2 space-x-reverse text-white/80">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(currentTime)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
