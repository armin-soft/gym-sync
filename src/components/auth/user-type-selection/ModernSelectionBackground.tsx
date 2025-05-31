
import { motion } from "framer-motion";
import { Shield, Users, GraduationCap, Dumbbell, Target, Trophy } from "lucide-react";

const floatingIcons = [
  { icon: Shield, delay: 0, x: "8%", y: "15%" },
  { icon: Users, delay: 0.5, x: "85%", y: "20%" },
  { icon: GraduationCap, delay: 1, x: "12%", y: "75%" },
  { icon: Dumbbell, delay: 1.5, x: "88%", y: "70%" },
  { icon: Target, delay: 2, x: "20%", y: "45%" },
  { icon: Trophy, delay: 2.5, x: "80%", y: "50%" },
];

export const ModernSelectionBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Advanced Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Dynamic Animated Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
      
      {/* Floating Professional Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            rotate: [0, 360, 720],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <item.icon className="h-7 w-7 text-white/70" />
          </div>
        </motion.div>
      ))}
      
      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')] opacity-20"></div>
      
      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40"></div>
    </div>
  );
};
