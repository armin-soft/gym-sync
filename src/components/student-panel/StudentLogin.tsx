
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from "@/components/ui/page-container";
import { Phone, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useStudents } from "@/hooks/students";

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

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="px-4 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden border-none bg-white/90 backdrop-blur-xl shadow-2xl rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-violet-500/10 z-0 rounded-lg"></div>
              
              <div className="relative z-10 flex flex-col space-y-1.5 p-6">
                <motion.div 
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <LogIn className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      پنل شاگرد
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      برای ورود شماره موبایل و رمز عبور خود را وارد کنید
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="relative z-10 p-6 pt-2">
                <form onSubmit={handleLogin} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-indigo-500" />
                      شماره موبایل
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      className="bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
                      dir="ltr"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-indigo-500" />
                      رمز عبور
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="رمز عبور"
                        className="bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400 pr-10"
                        dir="ltr"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                      disabled={loading}
                    >
                      {loading ? "در حال ورود..." : "ورود"}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
