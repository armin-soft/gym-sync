
import { motion } from "framer-motion";
import { Dumbbell, Trophy, Target, GraduationCap } from "lucide-react";

const floatingIcons = [
  { icon: Dumbbell, delay: 0, x: "10%", y: "20%" },
  { icon: Trophy, delay: 0.5, x: "85%", y: "15%" },
  { icon: Target, delay: 1, x: "15%", y: "75%" },
  { icon: GraduationCap, delay: 1.5, x: "80%", y: "80%" },
];

export const StudentLoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-violet-950 dark:via-indigo-950 dark:to-purple-950"></div>
      
      {/* Animated Blob Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <item.icon className="h-6 w-6 text-violet-600/60" />
          </div>
        </motion.div>
      ))}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23e0e7ff' stroke-width='1' opacity='0.3'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')] opacity-20"></div>
    </div>
  );
};
