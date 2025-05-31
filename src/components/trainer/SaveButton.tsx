
import { motion } from "framer-motion";
import { Save, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

export const SaveButton = ({ onSave, isLoading }: SaveButtonProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Sparkles className="h-4 w-4 text-violet-500" />
        <span>آماده برای ذخیره تغییرات</span>
      </div>

      {/* Save Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onSave}
          disabled={isLoading}
          className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 hover:from-violet-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] text-base"
        >
          {/* Background Shine Effect */}
          <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          {/* Button Content */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-5 w-5" />
                </motion.div>
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Save className="h-5 w-5" />
                </motion.div>
                <span>ذخیره تغییرات</span>
              </>
            )}
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 blur-xl" />
        </Button>
      </motion.div>

      {/* Success Message */}
      <motion.div
        className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Check className="h-4 w-4" />
        <span>تغییرات به‌طور خودکار ذخیره می‌شود</span>
      </motion.div>
    </motion.div>
  );
};
