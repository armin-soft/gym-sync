
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/utils/basePath';

interface WelcomeMessageProps {
  trainerName: string;
  onClose: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ trainerName, onClose }) => {
  const patternUrl = getAssetPath("Assets/Image/Pattern.svg");
  const displayName = trainerName || 'مربی گرامی';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative max-w-md w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('${patternUrl}')] opacity-10" />
        
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-pink-500/30 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-indigo-500/30 blur-2xl" />
        
        {/* Content */}
        <div className="relative z-10 p-6 text-white">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Welcome header */}
          <div className="mb-6 flex items-center justify-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1
              }}
              className="mr-3"
            >
              <Trophy className="h-8 w-8 text-amber-300" fill="#fcd34d" />
            </motion.div>
            <h2 className="text-2xl font-bold text-center">خوش آمدید {displayName}!</h2>
            <motion.div
              initial={{ rotate: 10 }}
              animate={{ rotate: -10 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1,
                delay: 0.5
              }}
              className="ml-3"
            >
              <Sparkles className="h-8 w-8 text-amber-300" />
            </motion.div>
          </div>
          
          {/* Welcome message */}
          <div className="text-center space-y-4 mb-6">
            <p className="text-white/90">
              به پنل مدیریت برنامه‌های ورزشی خوش آمدید. از این پنل میتوانید تمامی
              برنامه‌های تمرینی و تغذیه‌ای شاگردان خود را مدیریت کنید.
            </p>
            <p className="text-white/90">
              برای شروع میتوانید از منوی اصلی استفاده کنید یا شاگرد جدیدی اضافه کنید.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col xs:flex-row justify-center gap-3">
            <Button 
              className="bg-white text-indigo-700 hover:bg-white/90 font-medium"
              onClick={onClose}
            >
              شروع استفاده از برنامه
            </Button>
          </div>
          
          {/* Small sparkles decoration */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Sparkles className="w-2 h-2 text-white/70" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
