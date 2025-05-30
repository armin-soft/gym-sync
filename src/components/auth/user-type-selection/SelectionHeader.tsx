
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const SelectionHeader = () => {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-6"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-20 h-20 border-2 border-dashed border-purple-300 rounded-2xl"
        />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
        انتخاب نوع ورود
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        لطفا نوع کاربری خود را انتخاب کنید تا به بهترین تجربه دسترسی پیدا کنید
      </p>
    </motion.div>
  );
};
