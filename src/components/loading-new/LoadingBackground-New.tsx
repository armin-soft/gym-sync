
import React from "react";
import { motion } from "framer-motion";

export const LoadingBackgroundNew = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* گرادیان اصلی با رنگ‌های داشبورد */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg-gradient-primary)' }}
      />
      
      {/* المان‌های انیمیشنی */}
      <div className="absolute inset-0">
        {/* دایره‌های شناور */}
        <motion.div
          animate={{ 
            scale: [۱, ۱.۲, ۱],
            rotate: [۰, ۳۶۰],
            opacity: [۰.۱, ۰.۳, ۰.۱]
          }}
          transition={{ 
            duration: ۸, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)' }}
        />
        
        <motion.div
          animate={{ 
            scale: [۱.۲, ۱, ۱.۲],
            rotate: [۳۶۰, ۰],
            opacity: [۰.۲, ۰.۱, ۰.۲]
          }}
          transition={{ 
            duration: ۱۰, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)' }}
        />
        
        <motion.div
          animate={{ 
            scale: [۱, ۱.۵, ۱],
            rotate: [۰, -۳۶۰],
            opacity: [۰.۱, ۰.۲, ۰.۱]
          }}
          transition={{ 
            duration: ۱۲, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)' }}
        />
      </div>
      
      {/* الگوی نقطه‌ای */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* خطوط شعاعی */}
      <div className="absolute inset-0">
        {[...Array(۱۲)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: ۰ }}
            animate={{ 
              opacity: [۰, ۰.۱, ۰],
              scaleY: [۱, ۱.۲, ۱]
            }}
            transition={{
              duration: ۴,
              repeat: Infinity,
              delay: i * ۰.۳,
              ease: "easeInOut"
            }}
            className="absolute w-px bg-white/10 origin-bottom"
            style={{
              height: '50%',
              left: '50%',
              bottom: '50%',
              transform: `rotate(${i * ۳۰}deg) translateX(-50%)`
            }}
          />
        ))}
      </div>
    </div>
  );
};
