
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const LoadingState: React.FC = () => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 flex-1"
    >
      <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-purple-500 mb-4" />
      <p className="text-sm sm:text-base text-muted-foreground">در حال بارگذاری...</p>
    </motion.div>
  );
};
