
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ModernRememberMeProps {
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
}

export const ModernRememberMe = ({ rememberMe, setRememberMe }: ModernRememberMeProps) => {
  return (
    <motion.div 
      className="flex items-center justify-between"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox 
          id="rememberMe" 
          checked={rememberMe} 
          onCheckedChange={(checked) => setRememberMe(checked === true)}
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 border-white/30 h-4 w-4"
        />
        <Label 
          htmlFor="rememberMe" 
          className="text-sm text-white/70 cursor-pointer select-none hover:text-white/90 transition-colors"
        >
          مرا به خاطر بسپار
        </Label>
      </div>
      
      <div className="text-xs text-white/50">
        (۳۰ روز)
      </div>
    </motion.div>
  );
};
