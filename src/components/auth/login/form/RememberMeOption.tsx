
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeOptionProps {
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
}

export const RememberMeOption = ({ rememberMe, setRememberMe }: RememberMeOptionProps) => {
  return (
    <motion.div 
      className="flex items-center space-x-2 space-x-reverse"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Checkbox 
        id="rememberMe" 
        checked={rememberMe} 
        onCheckedChange={(checked) => setRememberMe(checked === true)}
        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/30 h-4 w-4"
      />
      <Label 
        htmlFor="rememberMe" 
        className="text-xs sm:text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
      >
        مرا به خاطر بسپار (به مدت ۳۰ روز)
      </Label>
    </motion.div>
  );
};
