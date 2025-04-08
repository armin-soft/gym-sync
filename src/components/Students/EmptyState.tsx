
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState = ({ onAdd }: EmptyStateProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
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
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full min-h-[80vh] flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-muted bg-muted/30"
    >
      <motion.div 
        variants={itemVariants}
        className="relative mb-4"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
          <Users className="h-10 w-10 text-primary" />
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground mb-2">
        هنوز هیچ شاگردی اضافه نکرده‌اید
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-6">
        برای شروع مدیریت شاگردان باشگاه، اولین شاگرد خود را اضافه کنید.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Button 
          onClick={onAdd}
          size="lg"
          className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-primary/20 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <UserPlus className="h-5 w-5 relative z-10" />
          <span className="relative z-10">افزودن شاگرد جدید</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
