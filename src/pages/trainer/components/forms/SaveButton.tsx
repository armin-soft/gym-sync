
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface SaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

export const SaveButton = ({ onSave, isLoading }: SaveButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        <Button
          onClick={onSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 hover:from-violet-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[200px] text-lg relative overflow-hidden"
        >
          {/* Background shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                <span>ذخیره تغییرات</span>
              </>
            )}
          </div>
        </Button>
      </motion.div>

      {/* Success indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-green-600 dark:text-green-400"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">تغییرات به‌طور خودکار ذخیره می‌شود</span>
      </motion.div>
    </div>
  );
};
