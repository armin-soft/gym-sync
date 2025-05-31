
import { motion } from "framer-motion";
import { Crown, Shield, Sparkles, Users, Settings, Database } from "lucide-react";

const floatingIcons = [
  { icon: Crown, delay: 0, x: "15%", y: "20%", color: "text-yellow-400" },
  { icon: Shield, delay: 1, x: "85%", y: "25%", color: "text-green-400" },
  { icon: Sparkles, delay: 0.5, x: "10%", y: "70%", color: "text-violet-400" },
  { icon: Users, delay: 1.5, x: "90%", y: "75%", color: "text-blue-400" },
  { icon: Settings, delay: 2, x: "20%", y: "50%", color: "text-purple-400" },
  { icon: Database, delay: 2.5, x: "80%", y: "50%", color: "text-indigo-400" },
];

export const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
            <item.icon className={`h-6 w-6 ${item.color}`} />
          </div>
        </motion.div>
      ))}
      
      {/* Geometric Patterns */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-white/10 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-violet-400/20 rounded-lg"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />
      
      {/* Gradient Spots */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-600/10 to-blue-600/5 rounded-full blur-3xl" />
    </div>
  );
};
