import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface AnimatedCounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'pink';
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  icon,
  color,
  suffix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  // Color configurations based on the color prop
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800/50',
      text: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800/30',
      glow: 'from-blue-400/20 to-blue-500/5'
    },
    green: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-800/30',
      glow: 'from-emerald-400/20 to-emerald-500/5'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800/50',
      text: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-800/30',
      glow: 'from-purple-400/20 to-purple-500/5'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800/50',
      text: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-800/30',
      glow: 'from-amber-400/20 to-amber-500/5'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      border: 'border-pink-200 dark:border-pink-800/50',
      text: 'text-pink-600 dark:text-pink-400',
      iconBg: 'bg-pink-100 dark:bg-pink-800/30',
      glow: 'from-pink-400/20 to-pink-500/5'
    }
  };

  useEffect(() => {
    // If this is the initial render or value didn't change, set the value directly
    if (prevValueRef.current === 0 || prevValueRef.current === value) {
      setDisplayValue(value);
      prevValueRef.current = value;
      return;
    }

    // Otherwise animate the value change
    const startValue = prevValueRef.current;
    const endValue = value;
    const duration = 1000; // 1 second animation
    const startTime = Date.now();
    
    const animateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      // Calculate current value
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
      
      // Update displayed value
      setDisplayValue(currentValue);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        // Save the final value for future comparisons
        prevValueRef.current = endValue;
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value]);

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-lg ${colorStyles[color].bg} border ${colorStyles[color].border} p-3 sm:p-4 group hover:shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ translateY: -2 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${colorStyles[color].glow} blur-xl -z-10`} />
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className={`p-1 rounded-full ${colorStyles[color].iconBg}`}>
          <div className={`${colorStyles[color].text}`}>
            {icon}
          </div>
        </div>
      </div>
      
      <div className={`text-xl font-bold ${colorStyles[color].text}`}>
        {toPersianNumbers(displayValue)}{suffix}
      </div>
    </motion.div>
  );
};
