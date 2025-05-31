
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-0">
      {/* بلورهای متحرک با افکت گرادیان */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-orange-500/5 to-gold-500/10"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(40px)',
          }}
          initial={{ scale: 0.5, opacity: 0.2 }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [0.5, Math.random() * 0.5 + 0.8, 0.5],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* خطوط متحرک زیبا */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(249, 115, 22)', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(245, 158, 11)', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => {
          const y = 100 + i * 50;
          return (
            <motion.path
              key={i}
              d={`M0 ${y} Q 400 ${y + (i % 2 ? -50 : 50)}, 800 ${y} T 1600 ${y}`}
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.3,
                pathOffset: [0, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
