
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, AlertTriangle, Key, LogIn, EyeOff, Eye, UserCircle2 } from "lucide-react";

interface LoginFormViewProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  loading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => void;
  gymName: string;
}

export const LoginFormView = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  loading,
  error,
  handleLogin,
  gymName
}: LoginFormViewProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      backgroundColor: "#4361ee",
      boxShadow: "0 10px 15px -3px rgba(67, 97, 238, 0.2), 0 4px 6px -2px rgba(67, 97, 238, 0.1)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    },
    tap: { scale: 0.97 }
  };

  const loginIconVariants = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="relative z-10 flex flex-col space-y-1.5 p-6">
        <motion.div 
          className="mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/40 p-3 w-20 h-20 flex items-center justify-center shadow-lg shadow-primary/20"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 25px -5px rgba(67, 97, 238, 0.25), 0 10px 10px -5px rgba(67, 97, 238, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <UserCircle2 className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-primary via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {gymName ? (
              <>ورود به سیستم مدیریت {gymName}</>
            ) : (
              <>ورود به سیستم مدیریت</>
            )}
          </h3>
          <motion.p 
            className="text-center text-muted-foreground text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.5 }
            }}
          >
            مربی عزیز، لطفا با ایمیل و رمز عبور خود وارد شوید
          </motion.p>
        </motion.div>
      </div>
      
      <div className="relative z-10 p-6 pt-6">
        <motion.form 
          onSubmit={handleLogin} 
          className="space-y-6"
          variants={containerVariants}
        >
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-primary" />
              ایمیل
            </Label>
            <div className="relative group">
              <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-all duration-300">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید" 
                className="pl-3 pr-12 h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary" 
                required 
                dir="ltr"
              />
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/40 to-violet-500/40 w-0 group-hover:w-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: email ? "100%" : "0%" }}
              />
            </div>
          </motion.div>
          
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-primary" />
              رمز عبور
            </Label>
            <div className="relative group">
              <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-all duration-300">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید" 
                className="pl-12 pr-12 h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary" 
                required 
              />
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/40 to-violet-500/40 w-0 group-hover:w-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: password ? "100%" : "0%" }}
              />
              <button
                type="button"
                className="absolute left-3 top-3 rounded-full p-1.5 hover:bg-primary/10 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 space-x-reverse"
            variants={itemVariants}
          >
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/30"
            />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
            >
              مرا به خاطر بسپار (به مدت ۳۰ روز)
            </Label>
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="p-3 rounded-md bg-red-600/15 border-2 border-red-600/30 text-red-700 text-sm font-medium shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div variants={itemVariants}>
            <motion.button 
              type="submit" 
              className="w-full h-12 text-base font-medium transition-all relative overflow-hidden rounded-md bg-gradient-to-r from-primary to-indigo-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              disabled={loading}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ورود...
                </div>
              ) : (
                <>
                  <span className="relative z-10">ورود به سیستم</span>
                  <motion.div
                    variants={loginIconVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <LogIn className="h-5 w-5" />
                  </motion.div>
                  
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-primary to-indigo-600 bg-[length:200%_100%]"
                      animate={{ 
                        backgroundPosition: ["0% center", "100% center", "0% center"],
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    />
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      background: [
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)"
                      ],
                      backgroundPosition: ["-200% 0", "200% 0"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </>
  );
};
