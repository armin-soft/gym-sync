
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailField = ({ email, setEmail }: EmailFieldProps) => {
  return (
    <motion.div className="space-y-2 sm:space-y-3">
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
          className="pl-3 pr-12 h-10 sm:h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary shadow-sm" 
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
  );
};
