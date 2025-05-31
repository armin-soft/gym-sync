
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const SelectionHeader = () => {
  const { getGradientClass } = useBrandTheme();
  
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <div className={`inline-flex items-center justify-center w-16 h-16 ${getGradientClass('primary')} rounded-xl shadow-lg mb-4`}>
        <Star className="w-8 h-8 text-white" />
      </div>
      
      <h1 className={`text-4xl md:text-5xl font-bold ${getGradientClass('primary')} bg-clip-text text-transparent`}>
        انتخاب نوع ورود
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg mx-auto">
        لطفا نوع کاربری خود را انتخاب کنید
      </p>
    </motion.div>
  );
};
