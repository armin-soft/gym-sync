
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Info, Sparkles, Trophy, Dumbbell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TipsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Training tips data
  const trainingTips = [
    {
      title: "برنامه‌ریزی تمرینی",
      content: "هر برنامه تمرینی برای حداقل 4 هفته باید اجرا شود تا نتایج قابل مشاهده حاصل شود.",
      icon: Dumbbell,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "نکته تغذیه‌ای",
      content: "مصرف پروتئین کافی (حدود 1.6 تا 2 گرم به ازای هر کیلوگرم وزن بدن) برای بازسازی عضلات ضروری است.",
      icon: Trophy,
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "توصیه پیشرفت",
      content: "برای پیشرفت مداوم، در هر جلسه تمرینی سعی کنید یک تکرار یا وزنه بیشتر نسبت به جلسه قبل استفاده کنید.",
      icon: Star,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "نکته ریکاوری",
      content: "خواب کافی (7-9 ساعت) نقش مهمی در ریکاوری و رشد عضلات دارد.",
      icon: Info,
      color: "from-purple-500 to-violet-600"
    },
    {
      title: "توصیه انگیزشی",
      content: "هدف‌گذاری کوتاه‌مدت و قابل اندازه‌گیری به حفظ انگیزه و پیگیری پیشرفت کمک می‌کند.",
      icon: Sparkles,
      color: "from-pink-500 to-rose-600"
    },
  ];

  // Handle auto-rotation of carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % trainingTips.length);
      }, 7000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, trainingTips.length]);

  const handlePrevious = () => {
    setIsPaused(true);
    setActiveIndex((current) => (current - 1 + trainingTips.length) % trainingTips.length);
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setActiveIndex((current) => (current + 1) % trainingTips.length);
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="px-2 sm:px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">نکات آموزشی</h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handlePrevious}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleNext}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden border-slate-200/50 dark:border-slate-800/50">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-md bg-gradient-to-br ${trainingTips[activeIndex].color} text-white`}>
                      <trainingTips[activeIndex].icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium">{trainingTips[activeIndex].title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">{trainingTips[activeIndex].content}</p>
                </div>
              </CardContent>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {trainingTips.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-5 bg-primary" : "w-2 bg-primary/30"
                }`}
                animate={{
                  width: index === activeIndex ? 20 : 8,
                }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
