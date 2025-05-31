
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

interface ModernPasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const ModernPasswordField = ({ 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword 
}: ModernPasswordFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="password" className="text-sm font-medium text-white/90 flex items-center gap-2">
        <Lock className="h-4 w-4 text-indigo-400" />
        رمز عبور
      </Label>
      
      <div className="relative group">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
        
        {/* Input field */}
        <Input 
          id="password" 
          type={showPassword ? "text" : "password"}
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور خود را وارد کنید" 
          className="relative z-10 h-12 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none px-4 pl-12" 
          required 
          autoComplete="current-password"
        />
        
        {/* Left icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <Lock className="h-4 w-4 text-white/40 group-hover:text-indigo-400 transition-colors" />
        </div>
        
        {/* Show/Hide button */}
        <motion.button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-1 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-white/60 hover:text-white/80" />
          ) : (
            <Eye className="h-4 w-4 text-white/60 hover:text-white/80" />
          )}
        </motion.button>
        
        {/* Focus indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: password ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
