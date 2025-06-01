
import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/10 to-indigo-600/20" />
      
      {/* Simple floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Simple gradient circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-full blur-3xl" />
    </div>
  );
};
