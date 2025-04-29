
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Key, EyeOff, Eye } from "lucide-react";

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const PasswordField = ({ 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword 
}: PasswordFieldProps) => {
  return (
    <motion.div className="space-y-2 sm:space-y-3">
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
          className="pl-12 pr-12 h-10 sm:h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary" 
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
  );
};
