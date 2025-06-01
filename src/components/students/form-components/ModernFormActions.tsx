
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, X, UserPlus, UserCheck } from "lucide-react";

interface ModernFormActionsProps {
  isEdit: boolean;
  onCancel: () => void;
}

export const ModernFormActions: React.FC<ModernFormActionsProps> = ({ 
  isEdit, 
  onCancel 
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-700/50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end items-center gap-4"
        dir="rtl"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-12 px-6 gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200"
          >
            <X className="h-5 w-5" />
            <span className="font-medium">انصراف</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="submit"
            className="h-12 px-8 gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200"
          >
            {isEdit ? (
              <>
                <UserCheck className="h-5 w-5" />
                <span className="font-medium">ذخیره تغییرات</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">افزودن شاگرد</span>
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
