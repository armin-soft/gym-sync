
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { 
  Users, 
  Crown, 
  Sparkles, 
  ArrowLeft, 
  User, 
  Dumbbell, 
  Target, 
  Trophy,
  Heart,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";

const Index = () => {
  const navigate = useNavigate();
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");

  // دریافت نسخه از فایل Manifest.json
  useEffect(() => {
    const fetchVersionFromManifest = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        
        if (manifest && manifest.version) {
          setAppVersion(manifest.version);
          localStorage.setItem('app_version', manifest.version);
          console.log('Version loaded from Manifest.json:', manifest.version);
        } else {
          const cachedVersion = localStorage.getItem('app_version');
          setAppVersion(cachedVersion || "نامشخص");
        }
      } catch (error) {
        console.error('Error loading version from Manifest.json:', error);
        const cachedVersion = localStorage.getItem('app_version');
        setAppVersion(cachedVersion || "خطا در بارگذاری");
      }
    };
    
    fetchVersionFromManifest();
  }, []);

  const handleStudentLogin = () => {
    navigate("/Students");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  const floatingElements = [
    { icon: Users, delay: 0, x: "15%", y: "20%", color: "from-blue-500 to-cyan-500" },
    { icon: Dumbbell, delay: 1, x: "85%", y: "25%", color: "from-purple-500 to-violet-500" },
    { icon: Target, delay: 2, x: "10%", y: "70%", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, delay: 3, x: "90%", y: "75%", color: "from-yellow-500 to-orange-500" },
    { icon: Heart, delay: 4, x: "20%", y: "50%", color: "from-red-500 to-pink-500" },
    { icon: Zap, delay: 5, x: "80%", y: "50%", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <PageContainer fullScreen fullHeight withBackground scrollable>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/50 dark:via-purple-950/50 dark:to-indigo-950/50"></div>
        
        {/* Animated blob shapes */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating geometric elements */}
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-3xl backdrop-blur-sm shadow-xl flex items-center justify-center border border-white/20`}>
              <item.icon className="h-8 w-8 text-white/80" />
            </div>
          </motion.div>
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23e0e7ff' stroke-width='1' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')] opacity-30 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 min-h-screen overflow-y-auto">
        <div className="w-full max-w-7xl py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-16"
            dir="rtl"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Logo and Icon Section */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <motion.div
                  className="relative w-24 h-24 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Crown className="w-12 h-12 text-white" />
                  
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-purple-500/40 rounded-3xl blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Main Title */}
              <div className="text-center space-y-4">
                <motion.h1 
                  className="text-5xl md:text-6xl font-black bg-gradient-to-l from-violet-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  سیستم مدیریت باشگاه
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  پنل شاگردان - دسترسی به برنامه تمرینی و تغذیه شخصی
                </motion.p>
                
                {/* Subtitle with stats */}
                <motion.div
                  className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>آنلاین</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <span>نسخه {toPersianNumbers(appVersion)}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <span>امن و قابل اعتماد</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative line */}
              <motion.div
                className="mx-auto mt-8 h-px w-64 bg-gradient-to-l from-transparent via-violet-400/60 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 256 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              />
            </motion.div>

            {/* Student Login Card */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                className="relative group cursor-pointer"
                onClick={handleStudentLogin}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                />
                
                {/* Main card */}
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:border-violet-300 dark:hover:border-violet-600">
                  
                  {/* Badge */}
                  <motion.div
                    className="absolute -top-3 right-6 px-4 py-1 bg-gradient-to-l from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    شاگرد
                  </motion.div>
                  
                  {/* Header section */}
                  <div className="text-center space-y-6 mb-8">
                    {/* Icon container */}
                    <motion.div
                      className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Users className="w-10 h-10 text-white" />
                      
                      {/* Floating sparkle */}
                      <motion.div
                        className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360] 
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Star className="w-2 h-2 text-white fill-current" />
                      </motion.div>
                    </motion.div>

                    {/* Title and subtitle */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        پنل شاگرد
                      </h2>
                      <p className="text-base text-indigo-600 dark:text-indigo-400 font-semibold">
                        دسترسی شخصی
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
                        مشاهده برنامه شخصی، پیشرفت و اطلاعات تمرینی
                      </p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    {[
                      "مشاهده برنامه تمرین",
                      "برنامه تغذیه شخصی", 
                      "پیگیری پیشرفت",
                      "لیست مکمل‌ها"
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-3"
                      >
                        <span className="font-medium">{feature}</span>
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-green-500 ml-1" />
                          <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                            {toPersianNumbers("100")}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action button */}
                  <Button
                    className="w-full h-14 bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={handleStudentLogin}
                  >
                    <div className="flex items-center gap-3">
                      <span>ورود به پنل</span>
                      <ArrowLeft className="h-5 w-5" />
                    </div>
                  </Button>
                  
                  {/* Footer info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 text-center"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      دسترسی امن و رمزگذاری شده
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Features */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { title: "برنامه تمرینی", icon: Dumbbell, color: "from-orange-400 to-red-500" },
                { title: "تغذیه", icon: Heart, color: "from-green-400 to-emerald-500" },
                { title: "پیشرفت", icon: Target, color: "from-blue-400 to-indigo-500" },
                { title: "اهداف", icon: Trophy, color: "from-purple-400 to-violet-500" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
