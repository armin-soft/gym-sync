
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Loader2, CheckCircle, Sparkles } from "lucide-react";

interface SaveButtonProps {
  onSave: () => Promise<void>;
  isLoading: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isLoading }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* اطلاعات پیشرفت */}
      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
        <Sparkles className="h-5 w-5 text-indigo-500" />
        <span className="text-lg font-medium">آماده برای ذخیره‌سازی تغییرات</span>
      </div>

      {/* دکمه ذخیره */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onSave}
          disabled={isLoading}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white font-black py-6 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 text-xl min-w-[280px]"
        >
          {/* افکت درخشش */}
          <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
          
          {/* محتوای دکمه */}
          <div className="relative z-10 flex items-center justify-center gap-4">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-6 w-6" />
                </motion.div>
                <span>در حال ذخیره‌سازی...</span>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Save className="h-6 w-6" />
                </motion.div>
                <span>ذخیره تغییرات</span>
              </>
            )}
          </div>
          
          {/* حلقه درخشان */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 blur-2xl" />
        </Button>
      </motion.div>

      {/* پیام موفقیت */}
      <motion.div
        className="flex items-center gap-3 text-green-600 dark:text-green-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <CheckCircle className="h-5 w-5" />
        <span className="text-base font-medium">تغییرات به‌طور خودکار ذخیره می‌شوند</span>
      </motion.div>
    </motion.div>
  );
};
