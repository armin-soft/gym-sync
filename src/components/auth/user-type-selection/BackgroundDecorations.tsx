
import { motion } from "framer-motion";
import { Users, Settings, Dumbbell, Trophy, Target, Heart } from "lucide-react";

const floatingElements = [
  { icon: Users, delay: 0, x: "15%", y: "20%", color: "from-blue-500 to-cyan-500" },
  { icon: Settings, delay: 1, x: "85%", y: "25%", color: "from-purple-500 to-violet-500" },
  { icon: Dumbbell, delay: 2, x: "10%", y: "70%", color: "from-green-500 to-emerald-500" },
  { icon: Trophy, delay: 3, x: "90%", y: "75%", color: "from-yellow-500 to-orange-500" },
  { icon: Target, delay: 4, x: "20%", y: "50%", color: "from-red-500 to-pink-500" },
  { icon: Heart, delay: 5, x: "80%", y: "50%", color: "from-pink-500 to-rose-500" },
];

export const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/50 dark:via-purple-950/50 dark:to-indigo-950/50"></div>
      
      {/* Animated blob shapes */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-500/5 rounded-full blur-2xl"
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
      
      {/* Floating geometric elements */}
      {floatingElements.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-3xl backdrop-blur-sm shadow-xl flex items-center justify-center border border-white/20`}>
            <item.icon className="h-8 w-8 text-white/80" />
          </div>
        </motion.div>
      ))}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23e0e7ff' stroke-width='1' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')] opacity-30 dark:opacity-10"></div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-black/5 dark:to-black/10"></div>
    </div>
  );
};
