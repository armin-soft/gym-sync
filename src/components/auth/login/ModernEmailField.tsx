
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface ModernEmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
}

export const ModernEmailField = ({ email, setEmail }: ModernEmailFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="email" className="text-sm font-medium text-white/90 flex items-center gap-2">
        <Mail className="h-4 w-4 text-indigo-400" />
        ایمیل
      </Label>
      
      <div className="relative group">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
        
        {/* Input field */}
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل خود را وارد کنید" 
          className="relative z-10 h-12 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none px-4" 
          required 
          dir="ltr"
        />
        
        {/* Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <Mail className="h-4 w-4 text-white/40 group-hover:text-indigo-400 transition-colors" />
        </div>
        
        {/* Focus indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: email ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
