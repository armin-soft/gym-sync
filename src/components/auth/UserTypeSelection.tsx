
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Users, UserCog, ArrowRight, Sparkles, Shield, Target, Zap, ChevronRight } from "lucide-react";

export const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [hoveredType, setHoveredType] = useState<'management' | 'student' | null>(null);
  const [selectedType, setSelectedType] = useState<'management' | 'student' | null>(null);

  const handleUserTypeSelection = (type: 'management' | 'student') => {
    setSelectedType(type);
    
    setTimeout(() => {
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", type);
      
      if (type === 'management') {
        navigate("/Management");
      } else {
        navigate("/Students");
      }
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const cardVariants = {
    idle: { 
      scale: 1, 
      rotateY: 0,
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      }
    },
    selected: {
      scale: 1.02,
      boxShadow: "0 25px 80px rgba(124, 58, 237, 0.4)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    idle: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const userTypes = [
    {
      id: 'management',
      title: 'پنل مدیریت مربی',
      subtitle: 'مدیریت شاگردان و برنامه‌ها',
      description: 'دسترسی کامل به ابزارهای مدیریتی، ایجاد برنامه تمرینی، مدیریت شاگردان و تحلیل پیشرفت',
      icon: UserCog,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
      darkBgGradient: 'from-indigo-950 via-purple-950 to-pink-950',
      features: ['مدیریت شاگردان', 'ایجاد برنامه تمرین', 'تحلیل پیشرفت', 'مدیریت رژیم غذایی'],
      badge: 'حرفه‌ای'
    },
    {
      id: 'student',
      title: 'پنل شاگردان',
      subtitle: 'مشاهده برنامه شخصی',
      description: 'دسترسی به برنامه تمرینی شخصی، رژیم غذایی، پیگیری پیشرفت و ارتباط با مربی',
      icon: Users,
      gradient: 'from-violet-500 via-blue-500 to-cyan-500',
      bgGradient: 'from-violet-50 via-blue-50 to-cyan-50',
      darkBgGradient: 'from-violet-950 via-blue-950 to-cyan-950',
      features: ['برنامه تمرینی', 'رژیم غذایی', 'پیگیری پیشرفت', 'ارتباط با مربی'],
      badge: 'شخصی'
    }
  ];

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-12"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-6"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-20 h-20 border-2 border-dashed border-purple-300 rounded-2xl"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                انتخاب نوع ورود
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                لطفا نوع کاربری خود را انتخاب کنید تا به بهترین تجربه دسترسی پیدا کنید
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isHovered = hoveredType === type.id;
                const isSelected = selectedType === type.id;
                
                return (
                  <motion.div
                    key={type.id}
                    variants={cardVariants}
                    initial="idle"
                    animate={isSelected ? "selected" : isHovered ? "hover" : "idle"}
                    onHoverStart={() => setHoveredType(type.id as 'management' | 'student')}
                    onHoverEnd={() => setHoveredType(null)}
                    className="relative group cursor-pointer"
                    onClick={() => handleUserTypeSelection(type.id as 'management' | 'student')}
                  >
                    <motion.div
                      variants={glowVariants}
                      className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-20 blur-xl rounded-3xl`}
                    />
                    
                    <div className={`relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 rounded-3xl p-8 overflow-hidden transition-all duration-500`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} dark:${type.darkBgGradient} opacity-50`} />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
                      
                      <div className="absolute top-6 left-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${type.gradient} text-white shadow-lg`}>
                          <Shield className="w-3 h-3 ml-1" />
                          {type.badge}
                        </span>
                      </div>

                      <div className="relative z-10 text-center space-y-6">
                        <motion.div
                          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-2xl`}
                        >
                          <Icon className="w-12 h-12 text-white" />
                        </motion.div>

                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {type.title}
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                            {type.subtitle}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {type.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          {type.features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                            >
                              <Target className="w-4 h-4 ml-2 text-green-500" />
                              {feature}
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          animate={isHovered ? { y: -5 } : { y: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Button
                            className={`w-full h-14 bg-gradient-to-r ${type.gradient} hover:shadow-2xl text-white font-medium text-lg rounded-xl transition-all duration-300 group`}
                            disabled={isSelected}
                          >
                            {isSelected ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2"
                              >
                                <Zap className="w-5 h-5" />
                                در حال ورود...
                              </motion.div>
                            ) : (
                              <div className="flex items-center gap-2">
                                ورود به پنل
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                          >
                            <div className="text-center space-y-4">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className={`w-12 h-12 border-4 border-transparent border-t-current bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent rounded-full`}
                              />
                              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                در حال راه‌اندازی...
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                می‌توانید در هر زمان بین پنل‌ها جابجا شوید. تجربه کاربری بهینه‌ای را انتظار داشته باشید.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
