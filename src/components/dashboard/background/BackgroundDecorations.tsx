
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const BackgroundDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Top right decoration */}
    <motion.div 
      className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Bottom left decoration */}
    <motion.div 
      className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-teal-500/5 blur-3xl rounded-full"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        delay: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Animated sparkles that appear in random positions */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.4
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.8, 1, 0.8]
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 5
        }}
      >
        <Sparkles className="w-3 h-3 text-indigo-400/30" />
      </motion.div>
    ))}
  </div>
);

export default BackgroundDecorations;
