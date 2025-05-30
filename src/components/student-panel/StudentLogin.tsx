
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from "@/components/ui/page-container";
import { Phone, Lock, LogIn, Eye, EyeOff, GraduationCap, Dumbbell, Trophy, Target } from "lucide-react";
import { useStudents } from "@/hooks/students";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { students } = useStudents();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find student by phone and password
      const student = students.find(s => s.phone === phone && s.password === password);
      
      if (student) {
        // Store student login info
        localStorage.setItem("studentLoggedIn", "true");
        localStorage.setItem("loggedInStudentId", student.id.toString());
        
        toast({
          title: "ورود موفق",
          description: `${student.name} عزیز، خوش آمدید`,
        });
        
        // Navigate to student dashboard
        navigate(`/panel/dashboard/${student.id}`);
      } else {
        toast({
          title: "خطا در ورود",
          description: "شماره موبایل یا رمز عبور اشتباه است",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ورود پیش آمده است",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const floatingIcons = [
    { icon: Dumbbell, delay: 0, x: "10%", y: "20%" },
    { icon: Trophy, delay: 0.5, x: "85%", y: "15%" },
    { icon: Target, delay: 1, x: "15%", y: "75%" },
    { icon: GraduationCap, delay: 1.5, x: "80%", y: "80%" },
  ];

  return (
    <PageContainer fullScreen fullHeight withBackground>
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-violet-950 dark:via-indigo-950 dark:to-purple-950"></div>
        
        {/* Animated Blob Shapes */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        
        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <item.icon className="h-6 w-6 text-violet-600/60" />
            </div>
          </motion.div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3e%3cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="%23e0e7ff" stroke-width="1" opacity="0.3"/%3e%3c/pattern%3e%3c/defs%3e%3crect width="100%25" height="100%25" fill="url(%23grid)"/%3e%3c/svg%3e')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md"
        >
          {/* Logo and Title Section */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="relative inline-block">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="h-10 w-10 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent mb-2">
              پنل شخصی شاگرد
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              به پورتال تمرینات و برنامه شخصی خود خوش آمدید
            </p>
          </motion.div>

          {/* Login Form Card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleLogin} className="space-y-6" dir="rtl">
                {/* Phone Number Field */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                      <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    شماره موبایل
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={toPersianNumbers("09123456789")}
                      className="h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl pr-4 text-right"
                      dir="ltr"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Password Field */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    رمز عبور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="رمز عبور خود را وارد کنید"
                      className="h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl pr-4 pl-12"
                      dir="ltr"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </motion.div>
                
                {/* Login Button */}
                <motion.div
                  variants={itemVariants}
                  className="pt-4"
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        در حال ورود...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="h-5 w-5" />
                        ورود به پنل
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  برای ورود از اطلاعات ثبت شده توسط مربی استفاده کنید
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { label: "شاگردان فعال", value: toPersianNumbers("1250"), icon: GraduationCap },
              { label: "تمرینات موثر", value: toPersianNumbers("850"), icon: Dumbbell },
              { label: "موفقیت", value: toPersianNumbers("95") + "%", icon: Trophy },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
              >
                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
};
