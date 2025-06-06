
import { motion } from "framer-motion";

export const ModernTrainerBackground = () => {
  return (
    <>
      {/* پس‌زمینه اصلی با گرادیان زیبا */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-gray-900/30 dark:to-zinc-900/40" />
      
      {/* الگوی نقطه‌ای */}
      <div 
        className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #6366f1 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* اشکال هندسی انیمیشن‌دار */}
      <motion.div 
        className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="fixed bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* خطوط انیمیشن‌دار */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,300 Q400,200 800,300 T1600,300"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,500 Q600,400 1200,500 T2400,500"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.05 }}
            transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </>
  );
};
