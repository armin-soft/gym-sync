
import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/10 to-indigo-600/20" />
      
      {/* Floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, -60, -10],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient circles */}
      <motion.div 
        className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-violet-500/30 to-purple-600/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          rotate: [360, 0]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};
